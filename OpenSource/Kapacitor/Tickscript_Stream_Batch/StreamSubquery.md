# InfluxDB의 서브쿼리(Subquery)
* 본질적으로 Batch 모드에서 동작하도록 설계되어 있으며, Stream 모드에서는 서브쿼리를 직접적으로 지원하지 않는다. 
* 이는 Stream 모드가 실시간 데이터 스트림을 처리하는 데 중점을 두고 있어, 서브쿼리처럼 데이터를 그룹화하거나 요약하는 작업을 수행하기 어렵기 때문이다.
* 그러나 Stream 모드에서 서브쿼리와 유사한 기능을 수행하고자 한다면, 여러 단계를 거쳐 데이터를 처리할 수 있다. 
* 예를 들어, 평균값이나 합계와 같은 집계 연산을 수행하고, 이를 기반으로 추가 처리를 할 수 있다.
* 아래는 Stream 모드에서 서브쿼리와 유사한 기능을 구현하는 방법의 예시입니다. 이 예시는 이전에 제공된 두 번째 Stream 모드 예제를 약간 확장한 것이다.

# Stream 모드에서 서브쿼리와 유사한 작업을 수행하는 예시
## 변환 전 Query
```sql
SELECT mean("mean_value") FROM 
    (SELECT mean("value") AS "mean_value" 
    FROM "Default"."autogen"."ipmi_sensor" 
    WHERE time > now() - 1h 
    AND time < now() 
    AND ("line"='A' OR "line"='B' OR "line"='C' OR "line"='D') 
    AND ("name"='inlet_temp' OR "name"='temp_mb_inlet' OR "name"='mb_cpu_in_temp') 
    GROUP BY line) 
GROUP BY time(5m) 
FILL(null)
```

### Tickscript (Stream 모드)
```tick
stream
    |from()
        .measurement('ipmi_sensor')
        .where(lambda: "line" == 'A' or "line" == 'B' or "line" == 'C' or "line" == 'D')
        .where(lambda: "name" == 'inlet_temp' or "name" == 'temp_mb_inlet' or "name" == 'mb_cpu_in_temp')
    |window()
        .period(5m)
        .every(1m)
    |mean('value')
        .as('mean_value')
    |groupBy('line')
    |mean('mean_value')
        .as('line_mean')
    |alert()
        .crit(lambda: "line_mean" > 75)
        .log('/tmp/temperature_stream_alert.log')
```

* 이 예제에서, 우리는 두 단계를 사용하여 평균을 계산하고 있다. 
* 첫 번째로, 5분 동안의 데이터를 평균화(mean_value)하고, 두 번째로 이 평균값을 다시 라인별로 그룹화하여 최종 평균값(line_mean)을 계산한다. 
* 이를 통해 서브쿼리의 역할을 어느 정도 대체할 수 있다.

## 변환 전 Query
```sql
SELECT sum(last_value) FROM 
  (SELECT last("value") AS "last_value" 
  FROM "Default"."autogen"."ipmi_sensor" 
  WHERE time > now() - 10m 
  AND "name"=~ /total_power|pwr_consumption|pw_consumption|pwr_system|sys_power/ 
  AND ("line"='A' OR "line"='B' OR "line"='C' OR "line"='D') 
GROUP BY line, server, "name")
```

### Tickscript (Stream 모드)
```tick
stream
    |from()
        .measurement('ipmi_sensor')
        .where(lambda: "name" =~ /total_power|pwr_consumption|pw_consumption|pwr_system|sys_power/)
        .where(lambda: "line" == 'A' or "line" == 'B' or "line" == 'C' or "line" == 'D')
    |window()
        .period(10m)
        .every(1m)
    |last('value')
        .as('last_value')
    |sum('last_value')
        .as('total_power')
    |alert()
        .crit(lambda: "total_power" > 1000)
        .log('/tmp/power_consumption_stream_alert.log')
```