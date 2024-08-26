# TICKscript
* Kapacitor는 'TICKscript'이라는 특정 도메인 언어를 통해 사용자가 다양한 알림 규칙을 설정할 수 있게 해준다. 

# data Syntax
## stream (데이터 스트림 정의)
```javascript
var data = stream
var data는 이후 연산에서 사용될 데이터 스트림을 담을 변수를 선언한다.

```
* stream은 실시간으로 데이터를 처리할 때 사용하는 데이터 소스 타입을 나타낸다.

## from (데이터 출처 선택)
```javascript
|from()
    .database('Default')
    .retentionPolicy('autogen')
    .measurement('mem')
    .groupBy(['smrc_project', 'host'])
    .where(lambda: isPresent("used_percent") AND ("svc_type" != 'ch-mgmt'))
```

* from()은 데이터를 가져올 데이터베이스와 측정값(measurement)을 지정한다.
* .database('Default')는 데이터베이스 이름을 'Default'로 지정한다.
* .retentionPolicy('autogen')은 데이터 보존 정책을 'autogen'으로 지정한다.
* .measurement('mem')은 측정 대상을 'mem'으로 지정한다.
* .groupBy(['smrc_project', 'host'])는 결과를 'smrc_project'와 'host'에 따라 그룹화한다.
* .where(lambda: isPresent("used_percent") AND ("svc_type" != 'ch-mgmt'))는 'used_percent' 필드가 존재하고, 'svc_type' 필드가 'ch-mgmt'가 아닌 데이터만 선택한다.

## window (데이터 윈도우 설정)
```javascript
|window()
    .period(2m)
    .every(30s)
    .align()
```

* window()는 데이터를 시간에 따라 분할하는 설정이다.
* .period(2m)은 2분 동안의 데이터를 하나의 윈도우로 설정한다.
* .every(30s)는 30초마다 윈도우를 생성한다.
* .align()은 윈도우의 시작 시간을 UTC 시간대와 정렬한다.

# Trigger Syntax
## alert와 deadman 차이
### deadman 함수
* "Dead Man's Switch" 기능을 제공한다. 
* 이는 특정 기간 동안 데이터 포인트가 특정 임계값 아래로 떨어지거나 수신되지 않을 경우 알림을 보내는 기능이다. 
* 주로 시스템이나 장치가 예상대로 작동하지 않을 때 사용되며, 가용성이나 성능 문제를 신속하게 감지할 수 있다.

### alert 함수
* 더 일반적이고 유연한 경고 생성 메커니즘을 제공한다. 
* 사용자는 .warn, .crit 같은 다양한 조건을 설정하여 데이터 값에 따른 경고 수준을 정의할 수 있다. 
* 이 함수는 데이터의 특정 조건에 기반하여 더 세밀한 경고 정책을 구현할 수 있게 해준다.

### alert와 deadman 차이 요약
* 간단히 말해, deadman 함수는 시스템이나 프로세스의 가용성에 중점을 두는 반면, alert 함수는 데이터의 특정 조건에 기반한 다양한 수준의 경고를 생성하는 데 사용된다. 
* alert 함수는 사용자가 정의한 조건에 따라 더 세밀하게 경고를 설정하고 관리할 수 있는 유연성을 제공한다.

## alert
```
var trigger = data
    |alert()
        // .info(lambda: "value" >= info)
        .warn(lambda: "value" >= warn)
        .crit(lambda: "value" >= crit)
        .stateChangesOnly()
        .message(message)
        .id(idVar)
        .idTag(idTag)
        .levelTag(levelTag)
        .messageField(messageField)
        .durationField(durationField)
        .details(details)
        .stateChangesOnly()
```

* alert()는 경고 조건을 정의하고, 조건이 충족될 때 알림을 보내도록 설정한다.

### .warn, .crit은 경고 수준을 정의한다. 
* 예를 들어, warn(lambda: "value" >= warn)은 "value" 필드가 warn 변수보다 크거나 같을 경우 경고 수준을 "경고"로 설정한다.

### .stateChangesOnly()
* 경고 상태가 변경될 때만 알림을 보내도록 한다. 
* 이 옵션이 두 번 사용된 것은 중복일 수 있으니 한 번만 사용하는 것이 일반적이다.

### .message, .id, .idTag, .levelTag, .messageField, .durationField, .details
* 경고 메시지의 형식과 내용을 정의한다.

## deadman
```
var trigger = data
    |deadman(threshold, period)
        .stateChangesOnly()
        .message(message)
        .id(idVar)
        .idTag(idTag)
        .levelTag(levelTag)
        .messageField(messageField)
        .durationField(durationField)
```

* "Dead Man's Switch"로, 특정 기간 동안 데이터 포인트가 임계값(threshold) 이하로 떨어지면 경고를 발생시킨다. 
* 이 함수는 시스템의 가용성이나 성능 저하를 감지하는 데 유용하다.

### stateChangesOnly()
* 경고 상태가 변경될 때만 메시지를 발생시키도록 한다.

### message, id, idTag, levelTag, messageField, durationField 등의 메서드
* 경고 메시지의 형식과 내용을 정의한다.

### slack()와 email()
* 경고를 전달할 통신 채널을 설정한다. 여기서는 Slack 채널과 이메일 주소가 지정되어 있다.

## eval 함수
```
trigger
    |eval(lambda: "emitted")
        .as('value')
        .keep('value', messageField, durationField)
    |eval(lambda: float("value"))
        .as('value')
        .keep()
    |influxDBOut()
        .create()
        .database(outputDB)
        .retentionPolicy(outputRP)
        .measurement(outputMeasurement)
        .tag('alertName', name)
        .tag('triggerType', triggerType)
```

* 식을 계산하여 새 필드나 태그를 생성한다. 
* 여기서는 "emitted" 값을 'value'로 변환하고 있다.

### influxDBOut
* 계산된 결과를 InfluxDB에 저장한다.
*  이 때, create()는 필요한 경우 새 데이터베이스나 측정값을 생성하도록 한다.
    * 데이터베이스(outputDB), 보존 정책(outputRP), 측정값(outputMeasurement), 태그(alertName, triggerType) 등을 설정하여 데이터를 저장한다.

### trigger |httpOut('output')
* httpOut는 결과를 HTTP 응답으로 출력하는데 사용된다. 
* 이를 통해 특정 경로로 HTTP 요청을 보낼 때 결과를 조회할 수 있다.