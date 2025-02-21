# Go 빌드 환경 변수 설정 문제 및 수정 내역

### 문제 개요
이전 빌드 명령어는 환경 변수 설정 위치 때문에 의도한 대로 동작하지 않았다.

**문제 된 Build Command**
```bash
CGO_ENABLED=0 cd backend && GOOS=linux GOARCH=amd64 GO111MODULE=on go build ...
```

- **문제점:**  
  - `CGO_ENABLED=0` 설정이 `cd backend` 명령어에만 적용되고, 이후 실행되는 `go build` 명령어에는 전달되지 않는다.
  - 쉘에서는 환경 변수 할당이 해당 명령어에만 영향을 미치므로 원하는 빌드 옵션이 적용되지 않는 상황

### 해결 방법
환경 변수는 `go build` 명령어와 함께 사용해야 올바르게 적용된다.  

```bash
cd backend && CGO_ENABLED=0 GOOS=linux GOARCH=amd64 GO111MODULE=on go build ...
```

이렇게 하면 `go build` 실행 시에 `CGO_ENABLED=0`이 올바르게 반영된다.


## 추가한 코드
```diff
+ if static:
+   build_command += "CGO_ENABLED=0 "
+ build_command += "GOOS={} GOARCH={} ".format(platform, arch)
```

## 변경한 코드 예시

위 문제를 고려하여 수정한 Python 기반 빌드 스크립트

```python
def build(version=None,
          platform=None,
          arch=None,
          nightly=False,
          race=False,
          clean=False,
          outdir=".",
          tags=[],
          static=False):
    """지정된 플랫폼과 아키텍처에 대해 각 타겟을 빌드합니다."""
    logging.info("빌드 시작: {}/{}...".format(platform, arch))
    logging.info("사용 중인 Go 버전: {}".format(get_go_version()))
    logging.info("현재 git 브랜치: {}".format(get_current_branch()))
    logging.info("현재 git 커밋: {}".format(get_current_commit()))
    
    if static:
        logging.info("정적 링크된 출력 사용")
    if race:
        logging.info("Race 옵션 활성화")
    if tags:
        logging.info("빌드 태그 사용: {}".format(','.join(tags)))

    logging.info("빌드 결과물이 저장될 경로: {}".format(outdir))
    if not os.path.exists(outdir):
        os.makedirs(outdir)
    elif clean and outdir not in ['/', '.']:
        logging.info("빌드 전에 '{}' 디렉토리 청소 중...".format(outdir))
        shutil.rmtree(outdir)
        os.makedirs(outdir)

    logging.info("빌드 버전: '{}'".format(version))

    for target, path in targets.items():
        logging.info("타겟 빌드: {}".format(target))
        build_command = ""
        build_command_last_options = ""

        # 정적 바이너리 출력 처리
        if static or "static_" in arch:
            if "static_" in arch:
                static = True
                arch = arch.replace("static_", "")
            build_command_last_options += "-a -installsuffix cgo "

        # 아키텍처 이름 조정
        fullarch = arch
        if arch in ["i386", "i686"]:
            arch = "386"
        elif arch in ["arm64", "aarch64"]:
            arch = "arm64"
        elif "arm" in arch:
            arch = "arm"

        # 빌드 명령어 구성
        build_command += "cd backend && "
        if static:
            build_command += "CGO_ENABLED=0 "
        build_command += "GOOS={} GOARCH={} ".format(platform, arch)

        # ARM 아키텍처 세부 설정
        if "arm" in fullarch:
            if fullarch == "armel":
                build_command += "GOARM=5 "
                build_command_last_options += "-installsuffix armv5 "
            elif fullarch in ["armhf", "arm"]:
                build_command += "GOARM=6 "
                build_command_last_options += "-installsuffix armv6 "
            elif fullarch == "arm64":
                pass  # arm64의 경우 GOARM 필요 없음
            else:
                logging.error("잘못된 ARM 아키텍처: {}".format(arch))
                logging.error("올바른 값: 'armel', 'armhf', 또는 'arm64'를 지정해 주세요.")
                return False

        if platform == 'windows':
            target = target + '.exe'

        build_command += "GO111MODULE=on go build -o {} ".format(os.path.join(outdir, target))
        if race:
            build_command += "-race "
        if tags:
            build_command += "-tags {} ".format(','.join(tags))
        build_command += "-ldflags=\"-X main.version={} -X main.commit={}\" ".format(
            version, get_current_commit())
        build_command += build_command_last_options
        build_command += path

        start_time = datetime.utcnow()
        logging.info("실행 명령어: {}".format(build_command))
        run(build_command, shell=True, print_output=True)
        end_time = datetime.utcnow()
        logging.info("소요 시간: {}초".format((end_time - start_time).total_seconds()))
    
    return True
```
