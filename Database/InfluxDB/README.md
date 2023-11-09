# InfluxDB User
> 최초 생성한 User는 Admin user이다.
> InfluxDB User는 두 가지로 형태로 나뉜다.

## 1. Admin users
Admin User는 모든 데이터베이스에 대한 읽기, 쓰기 권한을 가지고 있다.

또한, 아래와 같은 쿼리를 실행할 수 있다.

### Database management
* CREATE DATABASE

* DROP DATABASE

* DROP SERIES

* DROP MEASUREMENT

* CREATE RETENTION POLICY

* ALTER RETENTION POLICY

* DROP RETENTION POLICY

* CREATE CONTINUOUS QUERY

* DROP CONTINUOUS QUERY

* User management

### Admin user management
* CREATE USER

* GRANT ALL PRIVILEGES

* REVOKE ALL PRIVILEGES

* SHOW USERS

### Non-admin user management:
* CREATE USER

* GRANT [READ,WRITE,ALL]

* REVOKE [READ,WRITE,ALL]

### General user management:
* SET PASSWORD
* DROP USER



## 2. Non-admin users
1. 모든 권한은 데이터베이스 별로 관리된다.
2. 새로운 Non-admin 사용자는 admin user에게 권한을 받기 전까지 어떤 데이터 베이스에도 접근할 수 없다.
3. Non-admin 유저는 Read/Write 권한이 있는 데이터베이스에만 Show Database를 할 수 있다.

* READ
* WRITE
* ALL (both READ and WRITE access)


# InfluxDB Curl Command
```
# 유저 생성(http)
curl  -X POST "http://<InfluxDB-IP>/query" --data-urlencode "q=CREATE USER <username> WITH PASSWORD '<password>' WITH ALL PRIVILEGES"

# 유저 생성(https)
curl -k --insecure -X POST "https://<InfluxDB-IP>:8086/query" --data-urlencode "q=CREATE USER <username> WITH PASSWORD '<password>' WITH ALL PRIVILEGES"

# 유저 삭제(http)
curl  -X POST "http://<InfluxDB-IP>/query" --data-urlencode "q=DROP USER <username>"

# Database에 ‘All’ Role 부여(http)
curl -X POST "http://<InfluxDB-IP>:8086/query?u=<admin-user-name>&p=<admin-user-password>" --data-urlencode "q=GRANT ALL ON <database-name> TO <username>""

# Database에 ‘All’ Role 부여(https)
curl -k --insecure -X POST "https://<InfluxDB-IP>:8086/query?u=<admin-user-name>&p=<admin-user-password>" --data-urlencode "q=GRANT ALL ON <database-name> TO <username>"

# Database에 ‘Read’ Role 부여(http)
curl -X POST "http://<InfluxDB-IP>:8086/query?u=<admin-user-name>&p=<admin-user-password>" --data-urlencode "q=GRANT READ ON <database-name> TO <username>""

# Database에 ‘Read’ Role 부여(https)
curl -k --insecure -X POST "https://<InfluxDB-IP>:8086/query?u=<admin-user-name>&p=<admin-user-password>" --data-urlencode "q=GRANT READ ON <database-name> TO <username>"

# Database에 ‘Write’ Role 부여(http)
curl -X POST "http://<InfluxDB-IP>:8086/query?u=<admin-user-name>&p=<admin-user-password>" --data-urlencode "q=GRANT WRITE ON <database-name> TO <username>""

# Database에 ‘Write’ Role 부여(https)
curl -k --insecure -X POST "https://<InfluxDB-IP>:8086/query?u=<admin-user-name>&p=<admin-user-password>" --data-urlencode "q=GRANT WRITE ON <database-name> TO <username>"

# 유저 삭제(http)
curl -X POST "http://<InfluxDB-IP>:8086/query" --data-urlencode "q=DROP USER <username>"

# 유저 삭제(https)
curl -k --insecure -X POST "https://<InfluxDB-IP>:8086/query" --data-urlencode "q=DROP USER <username>"
```

# 참고 자료
[influxdata administration manage](https://docs.influxdata.com/enterprise_influxdb/v1.10/administration/manage/users-and-permissions/introduction-to-auth/)

[influxdata administration/managing-influxdb-users](https://docs.influxdata.com/chronograf/v1.10/administration/managing-influxdb-users/)
