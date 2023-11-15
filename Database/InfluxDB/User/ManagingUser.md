# 인증 활성화

## 1 단계 : 인증 활성화

* InfluxDB 구성 파일에서 인증을 활성화하십시오. 설정 파일은 대부분 Linux의 구성 파일 경로에 있습니다./etc/influxdb/influxdb.conf.

[http]InfluxDB 구성 파일 influxdb.conf의 주석 auth-enabled옵션의 설정 true
```
[http]
  # Determines whether HTTP endpoint is enabled.
  # enabled = true

  # The bind address used by the HTTP service.
  # bind-address = ":8086"

  # Determines whether HTTP authentication is enabled.
  auth-enabled = true 
```

## 2 단계 : InfluxDB 서비스 재시작

구성 변경 사항을 적용하려면 InfluxDB 서비스를 재시작합니다.

`~# sudo systemctl restart influxdb`

## 3 단계 : 관리자 생성
* 인증이 사용 가능하므로 데이터베이스에서 다른 작업을 수행하기 전에 관리자를 작성해야 합니다. 아래 curl 명령을 실행하여 관리자를 작성하고 대체합니다.

* localhost InfluxDB OSS 인스턴스의 IP 또는 호스트 이름
* chronothan 자신의 사용자 이름
* supersecret 자신의 비밀번호 사용 (비밀번호에는 작은 따옴표가 필요함)

`curl -X POST "http://localhost:8086/query" --data-urlencode "q=CREATE USER 'chronothan' WITH PASSWORD supersecret WITH ALL PRIVILEGES"`

성공적인 CREATE USER쿼리는 빈 결과를 반환합니다.

`{"results":[{"statement_id":0}]}`

## 4 단계 : 추가한 관리자의 권한 부여

아래 curl명령을 실행하여 관리자에게 권한을 부여합니다.

`curl -X POST "http://localhost:8086/query?u=chronothan&p=supersecret" --data-urlencode "q=GRANT ALL ON telegraf TO chronothan"`


# InfluxDB 사용자 관리
## READ 권한 부여
`curl -X POST "http://<InfluxDB-IP>:8086/query?u=<username>&p=<password>" --data-urlencode "q=GRANT READ ON <database-name> TO <non-admin-username>"`

## WRITE 권한 부여
`curl -X POST "http://<InfluxDB-IP>:8086/query?u=<username>&p=<password>" --data-urlencode "q=GRANT WRITE ON <database-name> TO <non-admin-username>"`

## ALL 권한 부여
`curl -X POST "http://<InfluxDB-IP>:8086/query?u=<username>&p=<password>" --data-urlencode "q=GRANT ALL ON <database-name> TO <non-admin-username>"`

모든 curl 의 성공 Response는 아래와 같습니다.

`{"results":[{"statement_id":0}]}`