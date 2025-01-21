# 문제 상황
- `logrotate` 서비스가 SELinux(Security-Enhanced Linux) 정책에 의해 특정 파일 및 디렉토리에 접근이 거부되었다. 
이 문제는 `logrotate`가 `containers` 디렉토리 파일에 읽기 및 쓰기 권한을 요청했지만 SELinux가 이를 차단하면서 발생하였다.

## 문제 원인
1. SELinux 컨텍스트 불일치:
   - `logrotate`는 `logrotate_t` 컨텍스트로 실행된다.
   - 접근 대상인 `containers`는 `container_var_lib_t` 컨텍스트를 가진다.
   - SELinux는 기본적으로 이러한 접근을 허용하지 않는다.

2. 시스템 로그 분석:
   SELinux 감사 로그(`/var/log/audit/audit.log`)에서 아래와 같은 에러가 기록되었음
   ```
   denied { read } for  pid=6028 comm="logrotate" name="containers" ...
   ```

## 해결 방법

### 1. SELinux 정책 허용 추가
`logrotate`가 필요한 접근을 허용하도록 SELinux 정책을 수정

1. SELinux 감사 로그에서 `logrotate`와 관련된 거부 로그를 분석하고, 새로운 정책을 생성
   ```bash
   ausearch -c 'logrotate' --raw | audit2allow -M logrotate_policy
   ```

2. 생성된 정책을 활성화
   ```bash
   semodule -i logrotate_policy.pp
   ```

이 과정을 통해 `logrotate`에 필요한 접근 권한이 영구적으로 추가된다.

### 2. 파일 및 디렉토리 보안 컨텍스트 변경
`logrotate`가 필요한 파일과 디렉토리의 SELinux 컨텍스트를 변경

1. `containers` 디렉토리의 컨텍스트를 수정
   ```bash
   semanage fcontext -a -t var_log_t "/path/to/containers(/.*)?"
   restorecon -Rv /path/to/containers
   ```

2. `minion` 파일의 컨텍스트를 수정
   ```bash
   semanage fcontext -a -t var_log_t "/path/to/minion"
   restorecon -v /path/to/minion
   ```

### 참고
- 두 가지 방법 중 하나만 적용해도 문제를 해결할 수 있었다.
- SELinux를 유지하고 보안을 강화하고 싶다면 **정책 허용 추가(1번)**를 권장
- 개발/테스트 환경에서는 **컨텍스트 변경(2번)**을 권장

### 추가 디버깅
문제가 지속될 경우, 다음 명령어로 SELinux 로그를 추가 분석
```bash
ausearch -m avc -c logrotate
audit2why
```

## 내가 적용한 방법
- 정책 허용 추가(1번)을 반영하여 해결