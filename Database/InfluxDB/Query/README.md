# 시계열 group by
## measurement의 value 값을 합치고 싶을 때
`SELECT sum("mean_value") AS "value" FROM (SELECT mean("value") AS "mean_value" FROM "Default"."autogen"."ipmi_sensor" WHERE time > :dashboardTime: AND time < :upperDashboardTime: AND "server"='172.16.11.163' AND ("name"='pwr_consumption' OR "name"='total_power' OR "name"='pwr_system' OR "name"='psu1_pwr_in' OR "name"='psu2_pwr_in') GROUP BY time(5m), "name" FILL(null)) GROUP BY time(5m) FILL(null)`

# Continuous Query
* Join이 없는 InfluxDB에서 하나의 Table에 서로 다른 Measurement를 조회하기 위함

## 하나의 Measurements에 저장용 
* CPU Usage, Disk I/O를 30분 단위로 40분 전 데이터를 조회해 Default DB의 10m RP에 resource_utilized Measurements에 저장하도록 CONTINUOUS QUERIES를 설정함

```
# CPU Usage CONTINUOUS QUERIES

CREATE CONTINUOUS QUERY cpu_usage_10m ON "Default" RESAMPLE EVERY 30m FOR 40m BEGIN SELECT 100 - mean(usage_idle) AS cpu_usage_mean INTO "Default"."10m".resource_utilized FROM "Default".autogen.cpu

# Disk I/O CONTINUOUS QUERIES

CREATE CONTINUOUS QUERY disk_io_10m ON "Default" RESAMPLE EVERY 30m FOR 40m BEGIN SELECT non_negative_derivative(mean(write_bytes), 1s) AS disk_write_bytes_rate, non_negative_derivative(mean(read_bytes), 1s) AS disk_read_bytes_rate INTO "Default"."10m".resource_utilized FROM "Default".autogen.diskioEND
```