# Too Many Connections
MariaDB에 접속하려 할 때 "Too Many Connections" 오류가 발생하는 경우가 있습니다.   
이는 동시에 많은 연결이 시도되어 데이터베이스의 최대 접속 수를 초과했음을 의미합니다.

## 문제 진단 및 현황 확인
* 현재 설정 확인: show variables like 'max_connect%'; 명령어를 사용하여 최대 연결 수를 확인합니다.
* 연결 상태 확인: show status like '%CONNECT%'; 명령어로 현재 연결 상태를 확인합니다.
    * Aborted_connects: 접속 시도 중 실패한 횟수
    * Max_used_connections: 동시에 사용된 최대 접속 수
    * Threads_connected: 현재 연결되어 있는 세션 수
* 예를 들어, 최대 접속 수가 151이고 현재 연결 수가 150일 경우, 거의 연결 한도에 도달한 것입니다.

## 문제 해결 방안
### 1. 임시 조치
* SET 명령어를 사용하여 최대 접속 수를 증가시킬 수 있습니다.
    * 예: set global max_connections=1000;
    * 주의: SET 명령어는 임시적이며, MariaDB를 재시작하면 기본값으로 초기화됩니다.

## 2. 영구적 조정
* 영구적으로 최대 접속 수를 조정하려면 설정 파일을 수정해야 합니다.

* Windows: MariaDB 버전\Data\my.ini 파일 수정
* Linux: my.cnf 또는 50-server.cnf 파일 수정
* 설정 예:

```ini
[mysqld]
max_connections = 500
```

## 3. MariaDB 서비스 재시작
* 설정을 수정한 후에는 MariaDB 서비스를 재시작하여 변경 사항을 적용합니다.

## 4. 세션 타임아웃 조정
* 불필요한 세션을 정리하기 위해 타임아웃 값을 조정할 수 있습니다.

* interactive_timeout: 대화식 연결의 최대 대기 시간
* wait_timeout: 비대화식 연결의 최대 대기 시간
    * 너무 긴 기본값(예: 28800초, 즉 8시간)을 적절한 값(예: 180초)으로 조정합니다.
* 설정 예

```ini
[mysqld]
wait_timeout = 180
interactive_timeout = 180
```

* 위 조치들을 통해 "Too Many Connections" 문제를 해결하고 데이터베이스의 안정성과 가용성을 높일 수 있습니다. 연결 수가 지나치게 많은 경우, 소프트웨어에서 데이터베이스 접근 후 접속을 종료하지 않고 계속 유지하는지도 검토해야 합니다.