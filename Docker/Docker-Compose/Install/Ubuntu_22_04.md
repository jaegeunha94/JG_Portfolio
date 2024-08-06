# 환경
* 운영체제: Ubuntu 22.04.4
* Online 환경
* 특정 버전 설치
    * Docker Compose: 2.24.6

# Docker Compose 설치
## 1-1. docker-compose-plugin 설치
`sudo apt-get update sudo apt-get install docker-compose-plugin`

## 1-2. 독립 실행 파일로 Docker Compose 설치:
`sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`

## 2. 실행 권한 추가
`sudo chmod +x /usr/local/bin/docker-compose`

## 3. 설치된 Docker Compose 버전 확인
`docker-compose --version`