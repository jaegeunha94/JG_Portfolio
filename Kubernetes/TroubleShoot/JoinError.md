# OS 환경
* CentOS 8

# join 시 에러
## connect: no such file or directory는 /var/run/containerd/containerd.sock
Swap disabled.

* 일시적: swapoff -a
* 영구적: /etc/fstab 파일의 swap mount 부분 제거.
* 오류 메시지에 나와 있는 내용인 connect: no such file or directory는 /var/run/containerd/containerd.sock 파일에 연결할 수 없다는 의미다. 이는 일반적으로 containerd의 소켓 파일이 존재하지 않거나 containerd가 제대로 실행되지 않았을 때 발생한다.
