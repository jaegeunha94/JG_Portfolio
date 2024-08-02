# InfluxDB 시간대 설정 문제 해결
InfluxDB에서 집계 함수를 사용할 때 시간대(TimeZone)를 제대로 설정하지 않으면 잘못된 기준으로 집계될 수 있다.  
이는 Date Picker와는 별개로, 쿼리 내에서 직접 설정해야 한다.

## 1. `now`를 사용할 때

### UTC 00시 기준으로 집계
```sql
SELECT count("value") AS "count_value" 
FROM "Default"."autogen"."cloudhub_alerts" 
WHERE time > now() - 30d AND time < now()  
GROUP BY time(1d) 
FILL(null)
```

### 한국 시간 기준으로 집계
```sql
SELECT count("value") AS "count_value" 
FROM "Default"."autogen"."cloudhub_alerts" 
WHERE time > now() - 30d AND time < now()  
GROUP BY time(1d) 
FILL(null) 
tz('Asia/Seoul')
```

## 2. 특정 날짜 범위를 지정하여 사용할 때
### UTC 기준으로 집계 (Where 절은 UTC Timezone)
```sql
SELECT count("value") AS "count_value" 
FROM "Default"."autogen"."cloudhub_alerts" 
WHERE time >= '2024-07-02T15:00:00.000Z' AND time <= '2024-08-02T15:00:00.000Z' 
GROUP BY time(1d) 
FILL(null)
```

### UTC 기준으로 집계 (WHERE 절은 9시간 더한 시간 설정)
```sql
SELECT count("value") AS "count_value" 
FROM "Default"."autogen"."cloudhub_alerts" 
WHERE time >= '2024-07-03T00:00:00+09:00' AND time <= '2024-08-03T00:00:00+09:00' 
GROUP BY time(1d) 
FILL(null)
```

### 한국 시간 기준으로 집계
```sql
SELECT count("value") AS "count_value" 
FROM "Default"."autogen"."cloudhub_alerts" 
WHERE time >= '2024-07-03T00:00:00+09:00' AND time <= '2024-08-03T00:00:00+09:00' 
GROUP BY time(1d) 
FILL(null) 
tz('Asia/Seoul')
```

* 위의 예제들에서 알 수 있듯이, tz('Asia/Seoul')와 같이 시간대를 명시적으로 설정해주는 것이 중요하다.
* 이를 통해 올바른 시간대 기준으로 데이터를 집계할 수 있다.
