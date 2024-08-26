# Tiskcript Batch Type에 Sum 함수를 적용한 사례
```tick
var period = 10m

var every = 20s

var warn = 10

var crit = 99

var name = 'Power Consumption'

var idVar = name

var message = 'Detected: [{{.Level}}] [{{.ID}}] {{index .Fields "totalPowerConsumption" }} W'

var OKmessage = 'Power Consumption is now [{{.Level}}]'

var levelTag = 'level'

var totalPowerConsumption = batch
    |query('''
        SELECT last("value") as lastPower
        FROM "Default"."autogen"."ipmi_sensor"
        WHERE ("name"='total_power' OR "name"='pwr_consumption' OR "name"='pw_consumption' OR "name"='pwr_system' OR "name"='sys_power')
    ''')
        .period(period)
        .every(every)
        .align()
        .groupBy('name', 'server')
    |sum('lastPower')
        .as('totalPowerConsumption')
    |groupBy([])

var trigger = totalPowerConsumption
    |alert()
        .warn(lambda: "totalPowerConsumption" > warn)
        .crit(lambda: "totalPowerConsumption" > crit)
        .message('{{if eq .Level "OK"}}Power Consumption is now [{{.Level}}]{{else}}Detected: [{{.Level}}] [{{.ID}}] {{index .Fields "totalPowerConsumption" }} W{{end}}')
        .id(idVar)
        .levelTag(levelTag)
        .stateChangesOnly()
```

## batch 노드
```tick
var totalPowerConsumption = batch
    |query('''
        SELECT last("value") as lastPower
        FROM "Default"."autogen"."ipmi_sensor"
        WHERE ("name"='total_power' OR "name"='pwr_consumption' OR "name"='pw_consumption' OR "name"='pwr_system' OR "name"='sys_power')
    ''')
        .period(period)
        .every(every)
        .align()
        .groupBy('name', 'server')
```

* 이 부분은 배치 작업(batch task)을 정의한다.
* batch는 특정 주기마다 데이터를 수집하는 데 사용된다.

### query
* InfluxDB에서 데이터를 가져오는 쿼리를 정의합니다.
* 이 쿼리는 "ipmi_sensor"라는 measurement에서 "value" 필드의 마지막 값(last)을 가져오며, 그 결과를 lastPower로 별칭을 지정한다.

### WHERE 절
* "name" 필드의 조건을 정의하고 있다.

### **period**와 every
* 데이터 수집의 기간과 주기를 설정합니다. 이 값들은 외부에서 변수를 통해 설정된다.

### align
* 수집된 데이터의 기간을 일정하게 정렬한다.

### groupBy
* 데이터 그룹화를 위해 사용되며, 여기서는 name, server 필드로 그룹화한다.

## sum 노드
```tick
|sum('lastPower')
    .as('totalPowerConsumption')
|groupBy([])
```

### sum
* 그룹화된 각 데이터 그룹에 대해 lastPower 값의 합을 계산한다.

### groupBy([])
* 모든 그룹을 제거하여, 모든 데이터를 하나의 단일 그룹으로 결합한다. 
* 이 부분은 모든 라인과 이름, 서버에 대해 총 전력 소비를 하나의 값으로 계산하려는 목적이다.

## alert 노드
```tick
var trigger = totalPowerConsumption
    |alert()
        .warn(lambda: "totalPowerConsumption" > warn)
        .crit(lambda: "totalPowerConsumption" > crit)
        .message('{{if eq .Level "OK"}}Power Consumption is now [{{.Level}}]{{else}}Detected: [{{.Level}}] [{{.ID}}] {{index .Fields "totalPowerConsumption" }} W{{end}}')
        .id(idVar)
        .levelTag(levelTag)
        .stateChangesOnly()
```

### alert()
* 경고(alert) 노드를 정의한다.

### warn
* totalPowerConsumption가 warn 변수로 설정된 임계값을 초과할 때 경고 수준으로 설정한다.

### crit
* totalPowerConsumption가 crit 변수로 설정된 임계값을 초과할 때 심각(critical) 수준으로 설정한다.

### **message**와 details
* 경고 메시지와 세부사항을 정의한다. 
* 여기서 Kapacitor 템플릿 언어를 사용하여 메시지의 내용이 동적으로 변경되도록 한다.

### **id**와 levelTag
* 경고의 식별자와 레벨 태그를 설정한다.

### stateChangesOnly
* 상태 변화가 있을 때만 경고를 발생시키도록 설정한다.