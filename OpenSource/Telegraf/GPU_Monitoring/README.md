# nvidia_smi
* NVIDIA GPU의 성능 및 상태 정보를 실시간으로 모니터링하기 위한 Telegraf 입력 플러그인이다.
* `nvidia_smi` 입력 플러그인은 `nvidia-smi` 도구를 사용하여 성능 지표를 수집한다.
* 이 플러그인은 GPU 사용률, 메모리 사용량, GPU 온도 등 다양한 데이터를 수집한다.

## 예시
```conf
[[inputs.nvidia_smi]]
interval = "60s"
timeout = "50s"
```

* `interval = "60s"`: 이는 데이터 수집 주기를 60초로 설정하여, 매 60초마다 GPU의 상태를 체크하고 데이터를 수집하라는 의미이다.
* `timeout = "50s"`: 이는 데이터 수집을 위한 최대 대기 시간을 50초로 설정한 것이다. 즉, 50초 이내에 데이터 수집이 완료되어야 하며, 그렇지 않을 경우 타임아웃이 발생한다.

# InfluxDB Query
## GPU Utilization
```
SELECT mean("utilization_gpu") AS "mean_utilization_gpu" 
FROM "Default"."autogen"."nvidia_smi" 
WHERE time > :dashboardTime: AND time < :upperDashboardTime: 
GROUP BY time(:interval:), "index" FILL(null)
```

## Memory Utilization
```
SELECT mean("utilization_memory") AS "mean_utilization_memory" 
FROM "Default"."autogen"."nvidia_smi" 
WHERE time > :dashboardTime: AND time < :upperDashboardTime: 
GROUP BY time(:interval:), "index" FILL(null)
```

## GPU Temp
```
SELECT mean("temperature_gpu") AS "mean_temperature_gpu" 
FROM "Default"."autogen"."nvidia_smi" 
WHERE time > :dashboardTime: AND time < :upperDashboardTime: 
GROUP BY time(:interval:) FILL(null)
```