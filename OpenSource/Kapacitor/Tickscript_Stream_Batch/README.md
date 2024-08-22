# Stream
## 특징
* stream은 실시간으로 데이터를 처리하는 방식이다.

## 데이터 흐름
* InfluxDB에 새로운 데이터가 입력될 때마다 해당 데이터가 실시간으로 처리된다.

## 사용 시나리오
* 실시간 경고나 실시간 데이터를 기반으로 하는 분석에 적합하다.

## 구조
```tick
stream
    |from()
        .measurement('cpu')
        .where(lambda: "host" == 'serverA')
    |window()
        .period(10s)
        .every(10s)
    |mean('usage_idle')
    |alert()
        .crit(lambda: "mean" < 10)
        .log('/tmp/alerts.log')
```

* 이 예시는 실시간으로 cpu 측정값을 받아서 serverA 호스트의 데이터를 처리하는 예이다. 
* window와 같은 연산을 통해 일정 시간 동안의 데이터를 모아 처리할 수 있다.

# Batch
## 특징
* batch는 일정 기간 동안의 데이터를 한꺼번에 처리하는 방식이다.

## 데이터 흐름
* 지정된 시간 간격에 따라 데이터가 배치로 수집되고, 그 배치 데이터가 처리된다.

## 사용 시나리오
* 과거 데이터를 기반으로 하는 분석이나 집계, 주기적인 보고서 생성 등에 적합하다.

## 구조
```tick
batch
    |query('''
        SELECT mean("usage_idle") 
        FROM "telegraf"."autogen"."cpu"
        WHERE "host"='serverA' AND time > now() - 1h
        ''')
        .period(1m)
        .every(1m)
    |alert()
        .crit(lambda: "mean" < 10)
        .log('/tmp/alerts.log')
```

* 이 예시는 지난 1시간 동안의 cpu 데이터를 1분마다 수집하여 처리하는 예다. 
* 주기적으로 데이터를 수집하여 배치로 처리하는 것이 핵심이다.

# 차이점 요약
## 실시간 vs 배치
* stream은 실시간 데이터 스트림을 즉각적으로 처리하는 반면, batch는 일정 기간의 데이터를 모아서 한꺼번에 처리한다.

## 사용 목적
* stream은 실시간 경고나 모니터링에 적합하며, batch는 일정 시간 동안의 집계 또는 과거 데이터 분석에 적합하다.

## 데이터 수집
* stream은 지속적으로 입력된 데이터를 처리하고, batch는 특정 시간 간격으로 데이터를 수집하여 처리한다.