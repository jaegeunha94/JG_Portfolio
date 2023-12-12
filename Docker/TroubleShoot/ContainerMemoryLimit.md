# 컨테이너 최대 Memory 제한 
## 이전 명령어
```
docker run -d -p <port>:<port> \
-e TZ=Asia/Seoul \
--name nlu_v220_p \
<image name>
```

## 이후 명령어
```
docker run -d -p <port>:<port> \
--memory=14g \
--memory-swap=-1 \
-e TZ=Asia/Seoul \
--name nlu_v220_p \
<image name>
```

* Docker에서 --memory 옵션은 컨테이너가 사용할 수 있는 최대 메모리 양을 제한하는 데 사용됩니다. 이 옵션은 컨테이너의 메모리 사용을 관리하고, 시스템의 다른 프로세스와 메모리를 공유하는 환경에서 자원을 효율적으로 배분하기 위해 중요합니다.
* --memory=14g는 이 Docker 컨테이너가 사용할 수 있는 최대 메모리를 14기가바이트로 제한합니다. 이 말은 해당 컨테이너가 14GB 이상의 물리적 메모리를 소비할 수 없다는 것을 의미합니다. 메모리 사용이 이 제한을 초과하면, Docker는 컨테이너 내에서 메모리를 더 요청하는 프로세스를 종료시킬 수 있습니다.
* --memory-swap=-1 옵션은 컨테이너의 스왑 공간(swap space) 사용을 관리합니다. 스왑 공간은 물리적 메모리가 부족할 때 사용하는 디스크 공간으로, 메모리 오버플로우를 막는 역할을 합니다.
    * --memory-swap=-1 설정은 스왑 공간의 사용을 비활성화하지 않고, 컨테이너가 사용할 수 있는 스왑 공간의 크기를 물리적 메모리 크기(--memory로 설정된 값)에 제한하지 않음을 의미합니다. 다시 말해, 이 설정은 컨테이너가 필요한 만큼 스왑 공간을 사용할 수 있도록 허용합니다.