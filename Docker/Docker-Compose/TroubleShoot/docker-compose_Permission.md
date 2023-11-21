# docker-compose 실행 명령어를 담은 서비스 파일
```
[Unit]
Description=Snet Sandbox Service
After=network-online.target

[Service]
User=root
Group=root
WorkingDirectory=/root/sandbox/
ExecStart=/usr/local/bin/docker-compose up -d

KillMode=control-group
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

* 서비스 파일을 다음과 같이 생성하였습니다.
* docker-compose를 다운로드하는 과정에서 필요한 실행 권한을 부여하지 않았습니다. 이로 인해 권한 문제가 발생하여 서비스 파일이 실행되지 않았습니다. 
* 실행 권한을 부여하기 위해서는 다음 명령어를 사용해야 합니다:
    * `$ sudo chmod +x /usr/local/bin/docker-compose`




