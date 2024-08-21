# Docker 이미지가 어떤 CPU 아키텍처를 지원하는지 확인하는 방법
## Docker Hub 또는 이미지 레지스트리 확인
* 이미지가 호스팅되는 Docker Hub나 다른 레지스트리 페이지에서 해당 이미지의 정보를 확인한다. 여기에는 종종 이미지가 지원하는 아키텍처에 대한 정보가 포함되어 있다.
* docker inspect 명령어 사용: 로컬 시스템에 이미지가 이미 다운로드된 경우, docker inspect 명령어를 사용하여 이미지의 상세 정보를 볼 수 있다. 이 명령어는 이미지의 메타데이터를 포함한 다양한 정보를 제공한다. 
    * `docker inspect [이미지 이름]`
* docker manifest inspect 명령어 사용: 이 명령어는 Docker 이미지의 매니페스트 정보를 확인하는 데 사용된다. 이를 통해 여러 플랫폼과 아키텍처에 대한 정보를 볼 수 있다. 
    * `docker manifest inspect [이미지 이름]`
