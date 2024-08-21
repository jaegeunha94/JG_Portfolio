# OS 환경
* CentOS 7.9

# Nginx: 포트 바인딩 오류 해결
* Nginx를 실행할 때 "bind() to 0.0.0.0:8000 failed (13: Permission denied)"라는 오류가 발생할 수 있다. 
* 이는 특정 포트(여기서는 8000)에 바인딩하기 위한 권한이 없을 때 발생한다. SELinux 환경에서는 semanage 명령어를 사용하여 필요한 HTTP 포트를 추가하거나 관리하여 이 문제를 해결할 수 있다.

# 문제 진단 및 해결 방법
## 1. 기존 HTTP 포트 확인
* 시스템에 설정된 HTTP 포트 목록을 확인한다. 사용하려는 포트(여기서는 8000)가 이미 목록에 있는지 확인한다.

```bash
# semanage port -l | grep http_port_t
```

## 2. HTTP 포트 추가
* 만약 8000포트가 목록에 없다면, 다음 명령어를 사용하여 8000포트를 http_port_t 유형으로 추가한다.

```bash
# semanage port -a -t http_port_t -p tcp 8000
```

# 주의사항 및 오류 처리
## ValueError
* 포트 tcp/8000가 이미 지정되어 있다: 이 오류 메시지는 8000포트가 이미 다른 타입으로 설정되어 있을 때 나타난다. 이 경우, 기존 포트 설정을 수정해야 한다.
```bash
# semanage port -m -t http_port_t -p tcp 8000
```

* 위 단계를 통해 Nginx의 포트 바인딩 권한 문제를 해결하고 안정적으로 서비스를 실행할 수 있다. SELinux의 보안 정책과 관련된 이 설정은 시스템의 보안을 유지하면서 필요한 서비스를 운영할 수 있게 도와준다.
