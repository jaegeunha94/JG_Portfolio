# SaltStack
인프라의 규모가 커질 수록 서버 설치와 설정에 대한 부담이 늘어날 때 (특히 트래픽이 급격히 늘어나는 경우)  
서버를 구축하기 위해서 대규모 인프라를 관리하기 위한 자동화 관리 시스템이다

## Salt-Master
* Saltstack에서 Server 역할을 담당한다. 
* Master는 등록된 Minion 에게 명령을 publishing 하고 그 결과를 취합하여 보여주는 역할이다.  
* 1대의 single master가 minion 수천대까지 관리 가능하다. 

## Salt-Minion
* Agent의 역할이며, 구성 자동화를 하기 위한 대상 서버에 설치하면 된다.  
* Master의 명령을 기다리고 있다가 명령이 오면 그에 맞춰 작업을 수행하게 된다. 
* 만약, 서버에 minion을 설치하기 어려운 상황이라면 Ansible 처럼 SSH로 명령 push가 가능하게도 지원된다.

### ZeroMQ
* Salt-master와 Salt-minion 간 통신에 ZeroMQ 라는 비동기 메시징 라이브러리를 사용한다.
* 따로 설치해야 하는 것은 아니며 Salt-master를 설치하면 zeroMQ도 함께 설치 된다. 
* publish Port로 4505 / Return Port 로 4506 을 사용한다. (포트 수정 가능)

