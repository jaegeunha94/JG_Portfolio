# 환경
* 운영체제: Ubuntu 22.04.4
* Online 환경

# Docker 설치
## 1. 기존 Docker 제거 (필요한 경우):
`sudo apt-get remove docker docker-engine docker.io containerd runc`

## 2. 필요한 패키지 설치
`sudo apt-get update sudo apt-get install \ ca-certificates \ curl \ gnupg \ lsb-release`

## 3. Docker의 GPG 키 추가
`sudo mkdir -p /etc/apt/keyrings curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg`

## 4. Docker 저장소 추가
`echo \ "$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/nulldeb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \ $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`

## 5. Docker Engine 설치
```bash
sudo apt-get update 
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 6. 설치 확인:
`sudo docker run hello-world`
