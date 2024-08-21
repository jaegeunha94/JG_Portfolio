# 잘못된 정규 표현식 사용 문제
```sql
SELECT last("value") AS "inlet_temp" 
FROM "Default"."autogen"."ipmi_sensor" 
WHERE time > :dashboardTime: AND time < :upperDashboardTime: AND ("name"=~ /inlet_temp|mb_cpu_in_temp|temp_mb_inlet/) AND "line"='B' AND "rack"='07' 
GROUP BY time(:interval:), "server", "hostname", "name" 
FILL(null)
```

* 위 쿼리에서 name 필드에 정규 표현식을 사용했으나, 이로 인해 psu0_inlet_temp, gpu_inlet_temp 등의 원하지 않는 값들도 매칭되는 문제가 발생

# 수정된 쿼리
```sql
SELECT last("value") AS "inlet_temp" 
FROM "Default"."autogen"."ipmi_sensor" 
WHERE time > :dashboardTime: AND time < :upperDashboardTime: AND ("name"='inlet_temp' OR "name"='mb_cpu_in_temp' OR "name"='temp_mb_inlet') AND "line"='B' AND "rack"='07' 
GROUP BY time(:interval:), "server", "hostname" 
FILL(null)
```

* 정규 표현식을 사용하는 대신 OR 조건을 활용하여 원하는 값들만 정확하게 필터링하도록 수정