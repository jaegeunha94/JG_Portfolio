# Docker Compose v2는 Docker Engine에 통합
* Docker Compose의 버전 2는 Docker CLI에 통합되어 있으며, Docker의 공식 패키지를 설치하면 함께 설치된다. 
* 반면, Docker Compose 버전 1은 Docker와는 별도로 설치해야 했다.

## Docker Compose v1
* Docker Compose v1은 독립적인 Python 기반 도구로, docker-compose라는 별도의 패키지로 설치되었다.
* 사용자가 직접 Docker Compose를 설치해야 했으며, 설치된 경로는 보통 /usr/local/bin/docker-compose였습니다.

## Docker Compose v2
* Docker Compose v2부터는 Docker의 핵심 도구 중 하나로 통합되었다. 
* 이제 docker 명령어와 함께 제공되며, 독립적인 패키지로 설치할 필요가 없다.
* docker compose 명령어로 사용할 수 있으며, Docker CLI의 플러그인 형태로 /usr/bin/docker 경로에서 제공된다.
* Docker Compose v2는 기본적으로 docker-compose라는 명령어를 지원하기 위해 별도의 바이너리를 사용할 필요가 없다. 
* 대신 docker compose라는 방식으로 사용한다.
