# Telegraf
* 데이터 수집 에이전트
* 플러그인을 기반으로 데이터 수집 가능

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

