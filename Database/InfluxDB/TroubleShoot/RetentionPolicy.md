# InfluxDB Retention Policy 생성 후 데이터 수집 및 데이터 조회 오류
* 기존에 존재하는 Database에 Retention Policy 생성 후 데이터 수집 및 데이터 조회 오류가 발생하는 경우

해결책은 아래와 같이 두 가지 방식이 있으나 첫 번째 Retention Policy 확인 및 변경을 통해 해결하는 방법을 추천함.

Retention Policy 확인 및 변경

1, 생성한 Retention Policy 확인

`SHOW RETENTION POLICIES on "db_name"`

2. 해당 Database에 생성한 RETENTION POLICIES 의 Default 확인

3. 생성한 RETENTION POLICIES 가 Default로 생성된 경우 아래 명령어를 통해 변경

`ALTER RETENTION POLICY "rp_name" ON "db_name" DURATION INF REPLICATION 1 DEFAULT``

4. DB Connection & telegraf Agent Config 변경 

Default Retention Policy의 Retention Policy 이름을 입력

5. telegraf [[outputs.influxdb]] plugin의 retention_policy = "" 의 정확한 Retention Policy 입력

```
[[outputs.influxdb]]
urls = [ "http://localhost:8086" ]
database = "Default"
username = ""
password = ""
retention_policy = ""
write_consistency = "any"
timeout = "10s"
```