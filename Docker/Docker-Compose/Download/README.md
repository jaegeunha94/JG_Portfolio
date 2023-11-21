# docker-compose 설치 (docker-py, CPython 모듈이 추가된 버전)

```
$ curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s) -$(uname -m)" -o docker-compose
% Total % Received % Xferd Average Speed Time Time Time Current
 Dload Upload Total Spent Left Speed
100 12.1M 100 12.1M 0 0 1091k 0 0:00:11 0:00:11 --:--:-- 1152k

$ ls -tl
total 37040
-rw-rw-r-- 1 chatbot chatbot 12737304 Jul 20 09:36 docker-compose

$ chmod +x docker-compose

$ ls -tl
total 37040
-rwxrwxr-x 1 chatbot chatbot 12737304 Jul 20 09:36 docker-compose

$ ./docker-compose version
docker-compose version 1.29.2, build 5becea4c
docker-py version: 5.0.0
CPython version: 3.7.10
OpenSSL version: OpenSSL 1.1.0l 10 Sep 2019

$ sudo mv docker-compose /usr/local/bin

$ sudo chown root:root /usr/local/bin/docker-compose 

$ whereis docker-compose
docker-compose: /usr/local/bin/docker-compose

$ docker-compose version
docker-compose version 1.29.2, build 5becea4c
docker-py version: 5.0.0
CPython version: 3.7.10
OpenSSL version: OpenSSL 1.1.0l 10 Sep 201
```

