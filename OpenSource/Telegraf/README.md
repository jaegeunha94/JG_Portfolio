# Telegraf
* 데이터 수집 에이전트
* 플러그인을 기반으로 메트릭 데이터 수집 가능

## Metric Data
* 메트릭 데이터(metric data)는 시스템, 네트워크, 애플리케이션 등의 성능, 건강 상태, 사용량과 같은 다양한 측정 가능한 양을 나타내는 수치입니다. 메트릭은 일반적으로 수집, 모니터링, 분석되어 시스템의 상태를 이해하고, 성능을 최적화하며, 문제를 예방하거나 해결하는 데 사용됩니다.
* 메트릭 데이터는 다양한 소스로부터 수집될 수 있으며, 이에 따라 다양한 형태로 존재할 수 있습니다. 예를 들어, 하드웨어 성능 메트릭, 소프트웨어 애플리케이션 메트릭, 사용자 행동 메트릭 등이 있습니다. 이러한 메트릭을 효과적으로 수집하고 관리하는 것은 IT 인프라 관리, 성능 최적화, 문제 해결과 같은 많은 분야에서 중요한 역할을 합니다.

## Metric 데이터특징
### 1. 시간에 따른 데이터
* 메트릭은 시간의 흐름에 따라 계속해서 수집되며, 각 데이터 포인트는 특정 시간에 해당하는 값을 가집니다. 이를 통해 시간에 따른 추세나 패턴을 분석할 수 있습니다.

### 2. 수치적 표현
* 메트릭은 보통 숫자로 표현되며, 이를 통해 CPU 사용률, 메모리 사용량, 응답 시간, 네트워크 트래픽, 오류 발생 횟수 등 다양한 시스템 성능 지표를 정량적으로 파악할 수 있습니다.

### 3. 모니터링 및 알람
* 메트릭 데이터는 시스템이나 서비스의 상태를 모니터링하는 데 사용됩니다. 정해진 임계값을 기준으로 알람을 설정하면, 특정 메트릭이 이 임계값을 초과하거나 미달할 때 알림을 받을 수 있습니다.

### 4. 분석 및 보고
* 메트릭 데이터는 분석 도구를 통해 처리되어 시스템의 성능, 가용성, 안정성 등에 대한 인사이트를 제공합니다. 이를 바탕으로 기술적인 결정을 내리거나 비즈니스 전략을 수립할 수 있습니다.

## Telegraf 플러그인 종류
### Input Plugin
* collect metrics from the system, services, or 3rd party APIs

### Processor Plugins 
* transform, decorate, and/or filter metrics


### Aggregator Plugins 
* create aggregate metrics (e.g. mean, min, max, quantiles, etc.)


### Output Plugins write metrics to various destinations
* write metrics to various destinations

# CLI
## Test
* `telegraf --test --<config 경로> --input-filter <Input Plugin>`

