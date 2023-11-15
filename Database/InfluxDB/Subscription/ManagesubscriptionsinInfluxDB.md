
# Managing Subscription
InfluxDB subscriptions는 InfluxDB에 기록된 모든 데이터가 Local 또는 Remote endpoint로 복사됩니다. 
Subscriptions는 주로 Kapacitor와 함께 사용되지만, InfluxDB에 “SUBSCRIPTION”를 생성하여  
UDP, HTTP 또는 HTTPS 연결을 할 수 있는 모든 Endpoint에 기록된 데이터를 전송할 수 있습니다.

# How subscriptions work
데이터가 InfluxDB에 Write 될 때, HTTP, HTTPS 또는  
UDP Line protocol(https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial)을 통해 Subscriber endpoint에 복제됩니다. 
InfluxDB subscriber service는 여러 개의 “writers" goroutines(https://golangbot.com/goroutines)를 생성하여  
Subscription endpoints에 Write 데이터를 전송합니다.

Writer goroutines의 개수는 influxdb.conf의 write-concurrency 설정으로 정의됩니다.

InfluxDB에 Writes가 발생할 때, 각각의 Subscription writer는 지정된 Subscription endpoints로 Write 된 데이터를 전송합니다.   
write-concurrency(multiple writers)와 전송하려는 데이터양의 상대적 차이로 인해 Writer processes와  
Transport layer의 Nanosecond의 시차가 발생할 수 있으며, 이에 따라 데이터가 차례로 전송되지 않을 수 있습니다.

## Important information about high write loads
* write-concurrency를 1보다 크게 설정하게 되면 Writer processes가 증가하게 되지만 전송하려는 데이터에 부하가 발생하여 비 순차 쓰기가 발생할 수 있습니다. 
* 반대로 write-concurrency를 1로 설정하면 Subscription endpoints에 차례대로 전송되지만, Writer processes에 병목 현상이 발생할 수 있습니다.
* write-concurrency는 작업량에 따라 달라지며 Subscription endpoint에 순서대로 전송되게 설정해야 합니다.

# InfluxQL subscription statements
아래의 InfluxQL 문을 사용하여 Subscriptions를 관리합니다.

* CREATE SUBSCRIPTION
* SHOW SUBSCRIPTIONS
* DROP SUBSCRIPTION

# Create subscriptions
* InfluxQL문 CREATE SUBSCRIPTION을 사용하여 Subscriptions를 생성합니다. 
* CREATE SUBSCRIPTION은 Subscription name, Database name, Retention policy, InfluxDB에 Write 된 데이터를 복사해야 하는 Host의 URL이 필요하며 구문은 아래 예시를 참고합니다.

```
-- Pattern:
CREATE SUBSCRIPTION "<subscription_name>" ON "<db_name>"."<retention_policy>" DESTINATIONS <ALL|ANY> "<subscription_endpoint_host>"

-- Examples:
-- Create a SUBSCRIPTION on database 'telegraf' and retention policy 'autogen' that sends data to 'example.com:9090' via HTTP.
CREATE SUBSCRIPTION "cloudhub_sub" ON "telegraf"."autogen" DESTINATIONS ALL 'http://example.com:9090'

-- Create a SUBSCRIPTION on database 'telegraf' and retention policy 'autogen' that round-robins the data to 'h1.example.com:9090' and 'h2.example.com:9090' via UDP.
CREATE SUBSCRIPTION "cloudhub_sub" ON "telegraf"."autogen" DESTINATIONS ANY 'udp://h1.example.com:9090', 'udp://h2.example.com:9090'
```

수신할 Host에서 사용자 인증을 사용할 경우 자격 증명을 아래 예시와 같이 포함하도록 URL을 입력하십시오.
```
-- Create a SUBSCRIPTION on database 'telegraf' and retention policy 'autogen' that sends data to another InfluxDB on 'example.com:8086' via HTTP. Authentication is enabled on the subscription host (user: subscriber, pass: secret).
CREATE SUBSCRIPTION "cloudhub_sub" ON "telegraf"."autogen" DESTINATIONS ALL 'http://subscriber:secret@example.com:8086'
```

* SHOW SUBSCRIPTIONS문은 CREATE SUBSCRIPTION으로 생성한 인증계정과 URL을 모두 출력합니다.


# 여러 Host로 Subscription data 전송
CREATE SUBSCRIPTION문을 사용하여 여러 Hosts의 Endpoints를 DESTINATIONS 절에 쉼표로 구분하여 지정할 수 있습니다.  
또한 DESTINATIONS 절 뒤에 ALL 또는 ANY로 구분하여 Endpoint에 쓰는 방법을 결정합니다.

* ALL : 지정된 모든 Host에 기록합니다.
* ANY : Round robin 방식으로 지정된 Host에 기록합니다.

```
# 여러 Hosts의 Subscriptions 방법
-- Write all data to multiple hosts
CREATE SUBSCRIPTION "cloudhub_sub" ON "telegraf"."autogen" DESTINATIONS ALL 'http://host1.example.com:9090', 'http://host2.example.com:9090'

-- Round-robin writes between multiple hosts
CREATE SUBSCRIPTION "cloudhub_sub" ON "telegraf"."autogen" DESTINATIONS ANY 'http://host1.example.com:9090', 'http://host2.example.com:9090'
```

# Subscription protocols
Subscriptions은 HTTP, HTTPS, UDP 전송 프로토콜을 사용할 수 있습니다.   
Subscription endpoint는 수신될 Host의 프로토콜로 사용합니다.  
Kapacitor subscription으로 생성한다면   
kapacitor.conf의 [[influxdb]] section의 프로토콜을 사용합니다.

kapacitor.conf
```
[[influxdb]]
  # ...
  subscription-protocol = "http"
  # ...
```

InfluxDB와 Kapacitor 간의 HTTPS 연결 및 보안에 대한 자세한 내용은  
[Kapacitor security](https://docs.influxdata.com/kapacitor/v1.5/administration/security/#secure-influxdb-and-kapacitor)를 참조합니다.

# Show subscriptions
InfluxQL의 SHOW SUBSCRIPTIONS문은 등록된 모든 Subscriptions 목록을 조회합니다.
`SHOW SUBSCRIPTIONS`

Example output:
```
> SHOW SUBSCRIPTIONS
name: _internal
retention_policy name                                           mode destinations
---------------- ----                                           ---- ------------
monitor          kapacitor-ca6e15ee-db97-4818-ba2f-c79a0994953a ANY  [http://localhost:9092]
monitor          kapacitor-d054b3d1-aac4-4fb4-84ca-0aee38d48bf1 ANY  [http://90807848ad83:9092]
```

# Remove subscriptions
InfluxQL의 DROP SUBSCRIPTIONS문은 등록 된 Subscriptions를 삭제합니다.
```
-- Pattern:
DROP SUBSCRIPTION "<subscription_name>" ON "<db_name>"."<retention_policy>"

-- Example:
DROP SUBSCRIPTION "cloudhub_sub" ON "telegraf"."autogen" 
```

# 모든 Subscriptions 삭제
모든 Subscriptions를 제거해야 할 경우에는 아래 스크립트를 참고하여 실행합니다.
```
# Environment variable exports:
# Uncomment these if INFLUXUSER and INFLUXPASS are not already globally set.
# export INFLUXUSER=influxdb-username
# export INFLUXPASS=influxdb-password

IFS=$'\n'; for i in $(influx -format csv -username $INFLUXUSER -password $INFLUXPASS -database _internal -exe
```

# Configure InfluxDB subscriptions
InfluxDB subscription 설정은 influxdb.conf의 [subscriber] section에서 할 수 있습니다.  
Subcriptions를 사용하려면 [subscriber] section의 enabled 항목을 true로 설정해야 합니다.  
아래는 Subscriber 설정의 influxdb.conf의 예제 입니다.

```
[subscriber]
  enabled = true
  http-timeout = "30s"
  insecure-skip-verify = false
  ca-certs = ""
  write-concurrency = 40
  write-buffer-size = 1000
```

[subscriber]의 구성 옵션에 대한 설명은 [Configuring InfluxDB](https://docs.influxdata.com/influxdb/v1.8/administration/config#subscription-settings)를 참조합니다.

# Troubleshooting
## Subscription endpoints에 Access 할 수 없거나 해제됐을 경우
Endpoint host에 Access 할 수 없거나 연결이 해제됐을 경우, InfluxDB Subscription이 삭제되지 않고 계속해서 데이터를 전송한다고 하면 아래와 같은 오류가 표시됩니다.

```
Mar 31 17:59:24 localhost influxd: ts=2020-03-31T08:59:24.866296Z lvl=info msg="Post http://192.168.56.110:8088/write?consistency=&db=telegraf&precision=ns&rp=autogen: dial tcp 192.168.56.110:8088: connect: connection refused" log_id=0LsbAPaW000 service=subscriber
Mar 31 17:59:24 localhost influxd: [httpd] 192.168.56.102 - - [31/Mar/2020:17:59:24 +0900] "POST /write?consistency=any&db=telegraf HTTP/1.1" 204 0 "-" "Telegraf/1.12.4" eb6b6cc0-732d-11ea-9f4f-0800277e0592 7910
```

네트워크 오류와 같은 이유로 위와 같은 에러가 발행할 수 있습니다.  
하지만 대부분 경우는 Subscription Endpoint가 존재하지 않고 InfluxDB Subscription이 삭제되지 않았을 경우 발생합니다.

InfluxDB는 Endpoint의 상태를 알 수 없기 때문에, Endpoint에 Access 할 수 없는 경우 Subscription이 자동으로 삭제되지 않습니다.  
따라서 Subscription endpoint가 제거되면 InfluxDB에서 Subscription을 수동으로 삭제해야 합니다.