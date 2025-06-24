# Elasticsearch Pagination Troubleshooting Guide
## 개요
Elasticsearch에서 대량의 검색 결과를 페이지 단위로 효율적으로 처리하기 위해 다양한 페이징 전략을 사용할 수 있음.  
이 문서는 대표적인 세 가지 페이징 방식(`from`+`size`, `search_after`, Point-in-Time API(PIT))의 문제점 및 해결 방안을 정리한 내용

## 1. From & Size 방식
* `from`과 `size` 파라미터로 결과의 시작 위치와 개수를 지정하여 페이지를 처리하는 전통적인 방식

### 문제
* 대량의 페이지(딥 페이지네이션)로 이동할 때 `from + size`의 합이 `index.max_result_window` 설정값을 초과하면 에러가 발생
* 예: 기본값 `10000`을 넘는 `from` 요청 시 다음과 같은 오류

     ```
     “Result window is too large, from + size must be less than or equal to: [10000] but was [15000].”
     ```

→ 결정: Max Result Window 한계를 우회하기 위해 `search_after` 방식으로 전환

## 2. Search After vs. PIT(Point-in-Time) 비교
`search_after`와 PIT 중 어떤 방식을 채택할지 고민할 때 주요 고려사항은 다음과 같다.

### 2.1 Search After
* 동작
  * 마지막 페이지의 정렬 키(sort values)를 다음 요청의 `search_after` 파라미터로 전달하며 이어서 조회
* 장점
  * 인덱스 스냅샷을 별도 관리하지 않으므로 구현이 비교적 단순
* 단점 & 주의사항
  * 인덱스 리프레시 중 발생 가능한 문서 누락·중복
  * Kibana Discover도 이 방식을 사용하며, 안정적인 정렬을 위해 명시적 tiebreak 설정이 필수

    * 권장 tiebreaker:

      ```js
      sort: [
        { '@timestamp': { order: 'desc', format: 'strict_date_optional_time' } },
        { '_seq_no':    { order: 'asc', unmapped_type: 'long' } },
        { '_primary_term': { order: 'asc', unmapped_type: 'long' } }
      ]
      ```
    * `_doc`을 사용할 경우 문서 누락·중복 가능성이 있으므로 지양

### 2.2 Point-in-Time (PIT)
* 동작
  * 특정 시점의 인덱스 스냅샷(ID)을 열어(`openPit()`), 해당 스냅샷에서만 일관된 검색 결과를 제공
  * 이후 `search_after`와 함께 PIT ID를 전달하여 페이징 처리
* 장점
  * 스냅샷이 고정되어 문서 순서가 일관적
* 고려사항
   1. PIT 만료(keep_alive) 관리
      * 기본 keep_alive 기간이 경과하면 PIT가 만료되어 이후 페이지 조회가 실패(`search_after` 무시 또는 에러)할 수 있다.
      * → 주기적으로 `openPit()` 으로 PIT를 재생성하거나, 충분히 긴 keep_alive 값을 설정해야 한다.
   2. 스냅샷이 고정됨에 따른 “신선도” 문제
      * PIT가 열리고 난 후에 새로 인덱싱된 로그는 조회 결과에 절대 반영되지 않는다.
      * → 장시간 이어지는 pagination 작업 중 최신 로그까지 반영하려면, 새로운 PIT를 열고 처음부터 다시 pagination해야 한다.
   3. 리소스(메모리·파일디스크립터) 비용
      * PIT를 유지하는 동안 Elasticsearch가 해당 스냅샷 정보를 보관하므로,
      * 대규모 pagination을 위한 다수의 PIT 동시 사용은 클러스터 리소스를 소모한다.
      * → 사용 후 `closePit()` 호출로 자원 회수 필수

## 3. PIT 미적용(순수 Search After) 시 고려사항
PIT 없이 `search_after`만 사용할 때 반드시 유의해야 할 두 가지 이슈

### 1. 인덱스 스냅샷 불일치
* Elasticsearch는 기본적으로 1초 단위로 인덱스 refresh를 수행
* 시나리오
    1. 첫 페이지 조회: `@timestamp` 기준 내림차순, 마지막 문서의 sort 값
    ```
    ["2025-06-24T00:00:00Z", 123, 1]
    ```
    2. 이 시점에 새로운 로그 A가 같은 타임스탬프(`2025-06-24T00:00:00Z`)로 인덱싱 → refresh
    3. 두 번째 페이지 조회:

    * A가 sort\_after보다 앞쪽에 위치하면 누락(skip)
    * A가 뒤쪽에 위치하면 중복(include)

### 2. 정렬 안정성(Stable Sort)의 한계
* `_seq_no` + `_primary_term` tiebreak를 사용해도, refresh 후 세그먼트(segment)가 변경되면 `_seq_no` 값이 바뀔 수 있어 순서 보장이 깨질 수 있습니다.
* 결과적으로 “같은 타임스탬프 그룹” 내 문서 순서가 페이지 간에 뒤섞일 가능성이 존재

## 4. 결론 및 권장 방안
* 소규모·단발성 페이징: `search_after` + `_seq_no`+`_primary_term` 방식 사용
* 대규모·장시간 페이징: PIT + `search_after` 병용
  * PIT 만료 관리와 신선도 이슈를 사전에 계획하고, 리소스 회수를 철저히 수행
* UI/서비스 요구사항에 따라 두 방식을 적절히 선택하여 안정적이고 일관된 사용자 경험 제공
