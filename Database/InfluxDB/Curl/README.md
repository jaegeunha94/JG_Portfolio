# InfluxDB Curl 요청

## 유저 생성(http)
`curl  -X POST "http://<InfluxDB-IP>/query" --data-urlencode "q=CREATE USER <username> WITH PASSWORD '<password>' WITH ALL PRIVILEGES"`

## 유저 생성(https)

`curl -k --insecure -X POST "https://<InfluxDB-IP>:8086/query" --data-urlencode "q=CREATE USER <username> WITH PASSWORD '<password>' WITH ALL PRIVILEGES"`


## 유저 삭제(http)
`curl  -X POST "http://<InfluxDB-IP>/query" --data-urlencode "q=DROP USER <username>"`

## Database에 ‘All’ Role 부여(http)
`curl -X POST "http://<InfluxDB-IP>:8086/query?u=<admin-user-name>&p=<admin-user-password>" --data-urlencode "q=GRANT ALL ON <database-name> TO <username>""`

## Database에 ‘All’ Role 부여(https)
`curl -k --insecure -X POST "https://<InfluxDB-IP>:8086/query?u=<admin-user-name>&p=<admin-user-password>" --data-urlencode "q=GRANT ALL ON <database-name> TO <username>"`

## Database에 ‘Read’ Role 부여(http)
`curl -X POST "http://<InfluxDB-IP>:8086/query?u=<admin-user-name>&p=<admin-user-password>" --data-urlencode "q=GRANT READ ON <database-name> TO <username>""`

## Database에 ‘Read’ Role 부여(https)
`curl -k --insecure -X POST "https://<InfluxDB-IP>:8086/query?u=<admin-user-name>&p=<admin-user-password>" --data-urlencode "q=GRANT READ ON <database-name> TO <username>"`

## Database에 ‘Write’ Role 부여(http)
`curl -X POST "http://<InfluxDB-IP>:8086/query?u=<admin-user-name>&p=<admin-user-password>" --data-urlencode "q=GRANT WRITE ON <database-name> TO <username>""`

## Database에 ‘Write’ Role 부여(https)
`curl -k --insecure -X POST "https://<InfluxDB-IP>:8086/query?u=<admin-user-name>&p=<admin-user-password>" --data-urlencode "q=GRANT WRITE ON <database-name> TO <username>"`

## 유저 삭제(http)
`curl -X POST "http://<InfluxDB-IP>:8086/query" --data-urlencode "q=DROP USER <username>"`

## 유저 삭제(https)
`curl -k --insecure -X POST "https://<InfluxDB-IP>:8086/query" --data-urlencode "q=DROP USER <username>"`
