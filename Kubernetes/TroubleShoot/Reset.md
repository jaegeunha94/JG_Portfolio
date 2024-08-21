# OS 환경
* CentOS 8

# reset 하는 법
## worker node reset
```
sudo kubeadm reset

# 관련 파일 삭제
sudo rm -rf /etc/kubernetes/

# 네트워크 설정 삭제
sudo ifconfig cni0 down
sudo ifconfig flannel.1 down
sudo ip link delete cni0
sudo ip link delete flannel.1

sudo iptables -F && sudo iptables -t nat -F && sudo iptables -t mangle -F && sudo iptables -X
```

* sudo kubeadm reset: 이 명령어는 현재 호스트에서 실행 중인 Kubernetes 클러스터를 초기화한다. 클러스터 구성, 상태 및 설치된 컴포넌트를 제거하고 기본 상태로 되돌린다.
* sudo rm -rf /etc/kubernetes/: 이 명령어는 /etc/kubernetes/ 디렉토리를 재귀적으로 삭제한다. 이 디렉토리는 Kubernetes 관련 구성 파일이 포함되어 있으므로 클러스터를 완전히 제거하고자 할 때 사용될 수 있다.
* sudo ifconfig cni0 down: 이 명령어는 "cni0"라는 네트워크 인터페이스를 비활성화한다. 이 인터페이스는 일반적으로 Kubernetes CNI(Container Networking Interface) 플러그인에서 사용되는 가상 인터페이스다.
* sudo ifconfig flannel.1 down: 이 명령어는 "flannel.1"이라는 네트워크 인터페이스를 비활성화한다. 이 인터페이스는 Flannel 네트워크 플러그인에서 사용되는 가상 인터페이스다.
* sudo ip link delete cni0: 이 명령어는 "cni0"라는 네트워크 인터페이스를 삭제한다. 이 명령어는 인터페이스를 완전히 제거하고자 할 때 사용될 수 있다.
* sudo ip link delete flannel.1: 이 명령어는 "flannel.1"이라는 네트워크 인터페이스를 삭제한다. 마찬가지로, 인터페이스를 완전히 제거하고자 할 때 사용될 수 있다.
* sudo iptables -F && sudo iptables -t nat -F && sudo iptables -t mangle -F && sudo iptables -X: 이 명령어는 현재 시스템의 iptables 규칙을 초기화한다. -F 옵션은 모든 규칙을 제거하고 -t 옵션은 특정 테이블을 지정한다. -X 옵션은 사용자 정의 체인을 제거한다. 이 명령어는 클러스터에서 사용되던 iptables 규칙을 제거하고 새로운 클러스터를 배포하기 전에 초기 상태로 되돌리는 데 사용된다.
  * sudo iptables -t nat -F: NAT(Network Address Translation) 테이블의 모든 규칙을 삭제한다. NAT는 네트워크 패킷의 소스 IP 주소와 포트 번호, 혹은 대상 IP 주소와 포트 번호를 변환하는 데 사용된다.
  * sudo iptables -t mangle -F: Mangle 테이블의 모든 규칙을 삭제한다. Mangle 테이블은 패킷의 특정 필드를 수정하거나 표시하기 위해 사용된다.

## master node reset
```
$ kubectl delete node <각 node>

sudo kubeadm reset

# 관련 파일 삭제
sudo rm -rf /etc/kubernetes/

# 쿠버네티스 관련 파일 전체 삭제
sudo rm -rf /var/lib/cni
sudo rm -rf /var/lib/kubelet/*
sudo rm -rf /var/lib/etcd
sudo rm -rf /run/flannel
sudo rm -rf /etc/cni/
sudo rm -rf /etc/kubernetes
sudo rm -rf ~/.kube

# 네트워크 초기화
sudo ifconfig cni0 down
sudo ifconfig flannel.1 down
sudo ip link delete cni0
sudo ip link delete flannel.1

sudo iptables -F && sudo iptables -t nat -F && sudo iptables -t mangle -F && sudo iptables -X

# kubeadm 초기화
kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=<master ip>

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# root만 사용하길 원한다면
export KUBECONFIG=/etc/kubernetes/admin.conf  #환경 변수를 등록하면 된다.

# flannel로 세팅
kubectl create -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml

$ kubectl get ds -A -o wide
NAMESPACE      NAME              DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE     CONTAINERS     IMAGES                                SELECTOR
kube-flannel   kube-flannel-ds   1         1         1       1            1           <none>                   9m35s   kube-flannel   docker.io/flannel/flannel:v0.22.0     app=flannel,k8s-app=flannel
kube-system    kube-proxy        1         1         1       1            1           kubernetes.io/os=linux   57m     kube-proxy     registry.k8s.io/kube-proxy:v1.25.10   k8s-app=kube-proxy

# coredns pods가 READY에 정상 count로 바뀐다.
$ kubectl get po -A -o wide
NAMESPACE      NAME                                                         READY   STATUS    RESTARTS   AGE    IP            NODE                                   NOMINATED NODE   READINESS GATES
kube-flannel   kube-flannel-ds-9xn4n                                        1/1     Running   0          34m    10.20.2.231   k8s-master-centos8.snetsystems.com     <none>           <none>
kube-flannel   kube-flannel-ds-l5jn2                                        1/1     Running   0          34m    10.20.2.232   k8s-worker01-centos8.snetsystems.com   <none>           <none>
kube-flannel   kube-flannel-ds-wk2kw                                        1/1     Running   0          34m    10.20.2.233   k8s-worker02-centos8.snetsystems.com   <none>           <none>
kube-system    coredns-565d847f94-f8bcw                                     1/1     Running   2          5d5h   10.244.0.5    k8s-master-centos8.snetsystems.com     <none>           <none>
kube-system    coredns-565d847f94-x42xq                                     1/1     Running   2          5d5h   10.244.0.4    k8s-master-centos8.snetsystems.com     <none>           <none>
kube-system    etcd-k8s-master-centos8.snetsystems.com                      1/1     Running   2          5d5h   10.20.2.231   k8s-master-centos8.snetsystems.com     <none>           <none>
kube-system    kube-apiserver-k8s-master-centos8.snetsystems.com            1/1     Running   2          5d5h   10.20.2.231   k8s-master-centos8.snetsystems.com     <none>           <none>
kube-system    kube-controller-manager-k8s-master-centos8.snetsystems.com   1/1     Running   2          5d5h   10.20.2.231   k8s-master-centos8.snetsystems.com     <none>           <none>
kube-system    kube-proxy-hjs56                                             1/1     Running   2          5d4h   10.20.2.233   k8s-worker02-centos8.snetsystems.com   <none>           <none>
kube-system    kube-proxy-rmz2d                                             1/1     Running   2          5d4h   10.20.2.232   k8s-worker01-centos8.snetsystems.com   <none>           <none>
kube-system    kube-proxy-xszfg                                             1/1     Running   2          5d5h   10.20.2.231   k8s-master-centos8.snetsystems.com     <none>           <none>
kube-system    kube-scheduler-k8s-master-centos8.snetsystems.com            1/1     Running   2          5d5h   10.20.2.231   k8s-master-centos8.snetsystems.com     <none>           <none>
```

## worker node join
```
# init할 때 나왔던 명령어
$ sudo kubeadm join
```
