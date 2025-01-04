# 참고
- [Cisco](https://www.cisco.com/c/ko_kr/support/docs/interfaces-modules/catalyst-3850-fan-module/221136-snmp-polling-delay.pdf)

### SNMP 폴링 지연 문제 해결 및 권장사항

ICSeverity: 5 - 알림  
영향: MIB 응답 지연 발생  

#### SNMP 폴링 지연이란?
- SNMP 폴링 지연은 네트워크 관리 프로토콜인 SNMP(Simple Network Management Protocol)를 통해 데이터를 요청(polling)할 때, 네트워크 장치가 응답을 지연하거나 응답 시간이 길어지는 상황을 말한다.
- SNMP(Simple Network Management Protocol)는 네트워크 장치 모니터링 및 관리에 사용되며, 네트워크 우선순위가 낮은 프로토콜로 간주된다.
- 본 메시지는 SNMP 응답 시간이 기본 임계값을 초과했을 때 발생하며, 주로 다음과 같은 상황에서 나타날 수 있다.
  1. 복잡하거나 시간 소모적인 OID 폴링  
  2. 다수의 OID를 동시에 폴링  

#### 문제 원인 분석
다음은 일반적으로 발생하는 로그 메시지 예제

- `SNMP-3-RESPONSE_DELAYED: cefcFRUowerStatusEntry.1 (# msecs) 처리 지연`  
- `SNMP-3-RESPONSE_DELAYED: ciscoFlashFileEntry.1 (# msecs) 처리 지연`  

이러한 로그는 디바이스 성능에 영향을 주지 않으며 정보 제공 목적의 로그입니다. 따라서 무시하거나 로그 생성을 비활성화할 수 있다.  
그러나 비즈니스 목적으로 폴링이 필요할 경우, 다음 조치를 고려해야 한다.  

1. 쿼리 가능한 호스트 제한  
2. 폴링 OID 수 제한  

#### 권장 사항
아래 단계를 통해 문제를 해결하거나 완화할 수 있다.

1. CPU 사용률 확인  
   - 명령어: `show proc cpu sorted`  
     CPU 사용률이 지나치게 높으면 디바이스가 최적의 상태로 작동하지 않을 가능성이 있다.
   - 명령어: `show proc cpu | i SNMP Engine`  
     SNMP 요청을 처리하는 SNMP 엔진의 CPU 점유율을 확인한다.  
     - 지속적인 CPU 증가: 폴링이 지나치게 공격적일 가능성이 있음.  
     - 일시적 CPU 스파이크: 정상적인 동작일 수 있음.

2. SNMP 폴링 통계 분석  
   - 명령어: `show snmp stats oid`  
     폴링 중인 상위 OID를 확인하여 문제를 일으키는 OID를 파악한다.

3. SNMP 응답 임계값 조정  
   - 명령어: `snmp monitor response threshold-limit <값>`  
     임계값은 1000~5000ms 사이로 설정 가능하며 기본값은 2000ms입니다. 임계값을 늘리면 지연 로그 빈도를 줄일 수 있다.

4. SNMP 응답 비교 메커니즘 비활성화  
   - 명령어: `no snmp monitor response`  
     이 설정은 SNMP 지연 syslog 메시지를 비활성화하지만 지연 자체는 완전히 제거되지 않을 수 있다.

5. 문제 OID 차단  
   특정 OID가 지속적으로 문제를 일으키는 경우 SNMP 보기(View)를 통해 차단 가능하다.  
   - 예제:
     ```bash
     snmp-server view <VIEW_NAME> iso included
     snmp-server view <VIEW_NAME> 1.3.6.1.4.1.9.9.91.1.1.1 excluded
     snmp-server community <COMMUNITY_NAME> view <VIEW_NAME> RO
     ```

#### 관련 장치
본 문제는 다음 장치군에서 주로 발생한다:
- Cisco Catalyst 시리즈: 2960-X, 3650, 3750-X, 3850, 9200, 9300, 9400, 9500, 9600, 6800
- 라우터 시리즈: Cisco 4000 ISR, ASR 1000

#### 결론
SNMP 폴링 지연은 네트워크 관리에 영향을 주지 않는 경우가 대부분이다. 하지만 이 현상이 반복적으로 발생하거나 비즈니스에 지장을 초래한다면, 위의 권장 사항을 따라 폴링 활동을 최적화하는 것이 중요하다.  
이를 통해 SNMP 폴링의 효율성을 높이고 네트워크 성능을 최적 상태로 유지할 수 있다.