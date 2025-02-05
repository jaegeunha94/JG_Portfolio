# SELinux가 logrotate 접근을 차단할 때 해결 방법

## 1. 문제 상황
- `logrotate` 서비스가 SELinux(Security-Enhanced Linux) 정책에 의해 특정 파일 및 디렉토리에 접근이 거부되었음
- `logrotate`가 `/var/lib/docker/containers/` 경로의 로그 파일을 관리하려 했으나 SELinux가 이를 차단함.

## 2. 문제 원인
1. **SELinux 컨텍스트 불일치**
   - `logrotate`는 `logrotate_t` 컨텍스트에서 실행됨.
   - 접근 대상인 `/var/lib/docker/containers/` 디렉토리는 `container_var_lib_t` 컨텍스트를 가짐.
   - SELinux는 기본적으로 이러한 접근을 허용하지 않음.

2. **SELinux 감사 로그 분석**
   - `/var/log/audit/audit.log`에서 아래와 같은 에러가 발생함:
   ```bash
   denied { read } for pid=6028 comm="logrotate" name="containers" ...
   ```

## 3. 해결 방법
SELinux 정책을 수정하여 `logrotate`가 해당 디렉토리에 접근할 수 있도록 허용함.

### 1) SELinux 정책 허용 추가 (권장 방법)
1. SELinux 감사 로그에서 `logrotate` 관련 거부 로그를 분석하고 새로운 정책을 생성:
   ```bash
   ausearch -c 'logrotate' --raw | audit2allow -M logrotate_policy
   ```

2. 생성된 정책을 활성화:
   ```bash
   semodule -i logrotate_policy.pp
   ```

> 이 과정을 통해 `logrotate`가 `/var/lib/docker/containers/`에 필요한 접근 권한을 영구적으로 추가함.

### 2) SELinux 컨텍스트 변경 (테스트 환경 추천)
1. `logrotate`가 필요한 파일과 디렉토리의 SELinux 컨텍스트를 변경:
   ```bash
   semanage fcontext -a -t logrotate_var_lib_t "/var/lib/docker/containers(/.*)?"
   restorecon -Rv /var/lib/docker/containers/
   ```

2. **명령어 분석**
   - `semanage fcontext`: SELinux에서 특정 파일이나 디렉토리의 **보안 컨텍스트(Security Context)** 를 관리하는 명령어
   - `-a`: 새로운 파일 컨텍스트 규칙을 추가
   - `-t logrotate_var_lib_t`: 해당 디렉토리의 SELinux 유형을 `logrotate_var_lib_t`로 변경
   - `restorecon -Rv`: 새로운 SELinux 컨텍스트를 해당 디렉토리와 하위 파일에 적용

## 4. 실행 후 확인 방법
변경된 보안 컨텍스트를 확인하려면 다음 명령어를 실행:
```bash
ls -Z /var/lib/docker/containers/
```

### 🔹 예전 상태 (SELinux 변경 전)
```
-rw-r--r--. root root system_u:object_r:container_var_lib_t:s0 file.log
```

### 🔹 변경 후 (SELinux 적용 후)
```
-rw-r--r--. root root system_u:object_r:logrotate_var_lib_t:s0 file.log
```
이제 `logrotate`가 해당 로그 파일을 정상적으로 관리할 수 있음.

## 5. 추가 디버깅
문제가 지속될 경우, 다음 명령어로 SELinux 로그를 추가 분석:
```bash
ausearch -m avc -c logrotate
audit2why
```

## 6. 결론
- SELinux 정책을 수정하여 `logrotate`가 `/var/lib/docker/containers/`에 접근할 수 있도록 조치함.
- 보안을 유지하면서 문제를 해결하기 위해 **SELinux 정책 허용 추가(1번 방법)**을 적용함.
- 개발/테스트 환경에서는 **SELinux 컨텍스트 변경(2번 방법)**도 유효한 해결책이 될 수 있음.
- SELinux 감사 로그를 분석하여 추가적인 문제 발생 시 디버깅 가능.


