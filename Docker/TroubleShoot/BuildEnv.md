# docker 23 이상 빌드 환경 변수 수정

```
#.env 파일 수정
export DOCKER_BUILDKIT=0
export COMPOSE_DOCKER_CLI_BUILD=0
```

* docker 23.0  이상부터는 위의 두 가지 값이 default가 1이 되는데 그럴 경우에 proxy 설정시 이미지 다운로드가 안됨
* docker 23 이상부터는 token 인증 방식으로 변경
