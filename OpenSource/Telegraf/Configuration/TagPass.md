# TagPass
Telegraf에서 tagpass는 데이터를 필터링하는 데 사용되는 옵션 중 하나다.   
이 옵션은 메트릭의 태그와 일치하는 경우에만 메트릭을 통과시키도록 설정할 수 있다.   
다시 말해, tagpass는 지정된 태그가 특정 값과 일치할 때만 해당 메트릭을 수집하도록 하는 필터다.

예를 들어, 특정 호스트 또는 특정 장치에서만 데이터를 수집하고 싶을 때 tagpass를 사용할 수 있다.

## 예시
Telegraf의 설정 파일에서 tagpass를 사용하는 예시를 아래와 같이 들 수 있다

```toml
[[inputs.cpu]]
  # ... 기타 설정 ...
  [inputs.cpu.tagpass]
    host = ["server01", "server02"]
```

이 예시에서는 CPU 입력 플러그인(inputs.cpu)을 사용하고 있다. tagpass는 host 태그가 "server01" 또는 "server02"인 경우에만  
메트릭을 수집하도록 설정되어 있다. 즉, 이 필터는 "server01"과 "server02" 이외의 호스트에서 오는 CPU 메트릭을 모두 무시한다.

이렇게 tagpass를 사용하면, 원하는 특정 조건에 따라 데이터를 선별적으로 수집할 수 있어 효율적인 모니터링이 가능해진다.
