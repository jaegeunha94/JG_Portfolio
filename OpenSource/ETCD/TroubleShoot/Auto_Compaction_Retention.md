# 이슈 내용
* ETCD의 용량 관리를 위해 아래 옵션들을 참조해야 한다.

# 자동 압축 주기
`auto-compaction-retention=24`

* etcd의 자동 압축(자동 컴팩션) 주기를 설정 옵션
* 예시로 24 시간으로 설정된 이 옵션은 etcd가 24시간마다 자동으로 컴팩션을 수행하도록 지정
* 컴팩션은 etcd의 로그에서 불필요한 데이터를 정리하여 데이터베이스 크기를 줄이는 작업으로, 오래된 키-값 쌍을 제거하여 성능을 최적화하고 저장소 공간을 절약할 수 있다.
* 이 옵션은 특히 많은 데이터가 자주 업데이트되거나 삭제되는 환경에서 중요하며, 주기적인 컴팩션을 통해 etcd의 성능을 유지할 수 있도록 돕는다.

# 데이터 베이스 크기 제한 옵션
`quota-backend-bytes=8589934592`

* 이 옵션은 etcd 데이터베이스의 크기 제한을 설정
* 예시로 든 8589934592 바이트는 정확히 8GB에 해당하며, 이 크기를 초과하면 etcd는 쓰기 작업을 중단하고 "quota exceeded"라는 오류를 발생
* 이를 통해 etcd 서버의 과도한 저장소 사용을 방지 가능