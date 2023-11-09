# Dangling
```
REPOSITORY    TAG       IMAGE ID       CREATED              SIZE
<none>        <none>    dec7a6f82cd7   12 seconds ago       645MB
<none>        <none>    83ac5b135a68   About a minute ago   105MB
gitea/gitea   latest    203b931e8dab   6 weeks ago          148MB
ubuntu        20.04     ba6acccedd29   2 months ago         72.8MB
mariadb       10.4.11   bc20d5f8d0fe   23 months ago        355MB
```

* 빌드 할 때, 이미 존재하는 레포지토리:태그명과 중복된 상태로 빌드를 해서 발생하기도 함  
* 또한 이미지 빌드중에 에러가 발생하여 온전하게 빌드 되지 못하였을 때 해당 증상이 나타나기도 함  
* 이런 현상이 나타난 이미지를 Dangling Image라고 표현을 한다.

 

## Solution 1. docker system prune
```
$ docker system prune [OPTIONS]

# [OPTIONS]
# --a, -a	: dangling된 것 뿐만 아니라, 모든 사용하지않는 컨테이너 종료 및 이미지 삭제
```

## Solution 2. docker image prune
```
$ docker image prune 

# dangling된 이미지 삭제
```

## Solution 3. dangling images 전부 삭제
```
$ docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
$ docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
gitea/gitea   latest    203b931e8dab   6 weeks ago     148MB
ubuntu        20.04     ba6acccedd29   2 months ago    72.8MB
mariadb       10.4.11   bc20d5f8d0fe   23 months ago   355MB
``` 

## Solution 4. dangling image에 Repository Name 과 Tag를 정한 후 삭제
```
$ docker tag 83ac flaskapi:v0.1
$ docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
flaskapi      v0.1      83ac5b135a68   2 hours ago     105MB
gitea/gitea   latest    203b931e8dab   6 weeks ago     148MB
ubuntu        20.04     ba6acccedd29   2 months ago    72.8MB
mariadb       10.4.11   bc20d5f8d0fe   23 months ago   355MB
$ docker rmi flaskapi:v0.1
```

## Solution 5. Repo와 Tag가 <none>인 이미지들 전부 삭제
`$ docker rmi $(docker images -a|grep "<none>"|awk '$1=="<none>" {print $3}')`
