# Receive advertisement timeout
* 메시지는 현재 Keepalived 인스턴스가 다른 VRRP 피어로부터 광고 메시지를 기대한 시간 내에 받지 못했음을 의미합니다. 
* 이로 인해, 해당 인스턴스가 MASTER 상태로 전환됩니다. 
* 이는 네트워크 지연, 패킷 손실, 방화벽, 또는 다른 인스턴스의 실패 등 여러 네트워크 문제로 인해 발생할 수 있습니다.

## 1. 방화벽 문제
* 방화벽 내리면 동작
* Advertisement 요청이 무시된 것

### IP 프로토콜 번호로 추가하기
* Keepalived의 VRRP 광고(Advertisement) 패킷은 IP 프로토콜 112를 사용합니다. 
* 이는 TCP나 UDP 포트가 아닌 IP 프로토콜 번호를 기반으로 하기 때문에, 방화벽에서 이를 허용할 때는 프로토콜 번호를 직접 지정해야 합니다. 
* firewalld를 사용하는 경우, 특정 IP 프로토콜을 허용하는 방법은 다음과 같습니다:

```
firewall-cmd --zone=public --add-rich-rule='rule protocol value="vrrp" accept' --permanent

# 방화벽 재시작
firewall-cmd --reload

```

* 여기서 --zone=public은 적용할 방화벽 zone을 지정합니다. 시스템에 따라 public 대신 다른 zone을 사용할 수도 있습니다. 
* --permanent 플래그는 변경사항을 영구적으로 적용하기 위해 사용됩니다. 변경사항을 적용하려면 방화벽을 다시 로드해야 합니