# 개요
* Kapacitor는 CloudHub에서 시계열 데이터에 대한 알림(경고, 위험 등)을 설정하여 시스템의 상태를 실시간으로 모니터링할 때 사용하는 오픈 소스 프레임워크입니다. 
* Kapacitor는 'TICKscript'이라는 특정 도메인 언어를 통해 사용자가 다양한 알림 규칙을 설정할 수 있게 해줍니다. 

※ 하위 문서는 Kapacitor의 TICKscript를 수정하여 Inlet Temperature 알림을 설정하는 방법을 안내합니다.

# Tickscript
## trigger | httpOut('output')
* 메모리에 올려놓는 것
