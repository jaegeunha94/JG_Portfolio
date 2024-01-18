# Windows 11 Update 이후 Host-Only Network Adapter 에러
## 증상
* Windows 10에서 Windows 11 업데이트 이후 Windows 10에서 생성했던 가상 머신을 시작하면 에러 나기 시작

## 에러 메세지
```
Failed to open/create the internal network 'HostInterfaceNetworking-VirtualBox Host-Only Ethernet Adapter' (VERR_INTNET_FLT_IF_NOT_FOUND).
Failed to attach the network LUN (VERR_INTNET_FLT_IF_NOT_FOUND).
```

## 해결 방법
1. 장치 관리자 열기
2. 네트워크 어댑터 - Virtual Box Host-only Ethernet Adapter 마우스 우측 클릭 - 드라이버 업데이트
3. 최신 드라이버라고 확인 된다면 디바이 사용안함 누르고 디바이스 사용 클릭