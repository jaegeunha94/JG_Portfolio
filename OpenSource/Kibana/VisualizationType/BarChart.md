# Bar Chart
## Axis
### Horiontal Axis
#### Functions
| Function       | Description                                    |
|----------------|------------------------------------------------|
| Date histogram | 날짜 혹은 날짜 범위 값을 간격에 따라 분포시킨다.    |
| Filters        | 값들을 사전에 정의된 부분 집합으로 나눈다.         |
| Intervals      | 정의된 숫자 범위에 따라 값들을 버킷에 할당한다.    |
| Top values     | 선택된 메트릭에 의해 순위가 매겨진 특정 필드의 상위 값들이다. |


### Vertical Axis
#### Functions
| Function        | Description                                       |
|-----------------|---------------------------------------------------|
| Average         | 숫자 필드 집합의 평균값                                |
| Count           | 필드 값의 총 수                                        |
| Counter rate    | 시간이 지남에 따라 계속 증가하는 시계열 메트릭의 변화율.     |
| Cumulative sum  | 시간이 지남에 따라 증가하는 모든 값의 합계 = 누적 합계         |
| Differences     | 연속된 interval에서 값의 변화                          |
| Last value      | 마지막 Field 값                                       |
| Maximum         | 숫자 필드의 최대값                                    |
| Median          | 숫자 필드의 중앙값                                    |
| Minimum         | 숫자 필드의 최소값                                    |
| Moving average  | 값들의 이동 평균                                      |
| Percentile      | 발생하는 값 중 n 퍼센트보다 작은 가장 큰 값입니다.         |
| Percentile rank | 특정 값보다 낮은 값의 백분율                           |
| Standard deviation | 숫자 필드의 표준 편차                               |
| Sum             | 숫자 필드의 총 합계                                    |
| Unique count    | 지정된 숫자, 문자열, 날짜 또는 불리언 필드의 고유 값 수       |


#### Appearance
| 항목          | Description                                    |
|---------------|------------------------------------------------|
| Name          | 차트에 표시될 시리즈의 이름                          |
| Value format  | 데이터 값이 차트에 어떻게 표시될지 결정                 |
|               | 종류: Default, Number, Percent, Bytes, Bits, Duration |
| Series color  | 차트의 시리즈 색상                                 |
| Axis side     | 차트 축 위치 결정                                  |
|               | Left / Auto / Right                                |


## Options
| 항목           | Description                                  |
|----------------|----------------------------------------------|
| Location       | 범례의 위치                                   |
|                | Outside: 표 외부에 범례 위치                   |
|                | Inside: 표 내부에 범례 위치                    |
| Alignment      | 범례 정렬 설정                                |
|                | Top Left / Top Right / Bottom Left / Bottom Right |
| Legend width   | 범례 너비                                     |
| Truncate text  | 범례가 길어졌을 때 뒤에 있는 문자열 안보여주는 옵션 |
|                | True / False                                  |
| Maximum lines  | 범례 최대 길이                                |


### Legend
### Left Axis
| 항목              | Description                                                     |
|-------------------|-----------------------------------------------------------------|
| Axis title        | 축 제목을 설정하는 옵션                                            |
| Gridlines         | 차트에 그리드 라인을 표시할지 여부를 결정                              |
| Tick labels       | 축에 눈금 라벨을 표시할지 여부를 결정하는 옵션                           |
| Orientation       | 축의 방향을 설정                                                 |
|                   | Label 방향이 돌아감: Hotizontal / Vertical / Angled             |
| Axis scale        | 이것은 축의 스케일을 결정                                     |
|                   | Linear / Logarithmic / Square root                              |
| Bounds            | 축의 범위를 결정                                                 |
|                   | Min/Max 개념                                                    |
| Round to nice values | 축의 눈금 값을 '좋은' 값으로 반올림할 것인지 여부                    |
|                   | 예를 들어, 1.5 대신에 2 같은 쉽게 읽을 수 있는 숫자로 반올림           |


### Bottom Axis
| 항목              | Description                                                     |
|-------------------|-----------------------------------------------------------------|
| Axis title        | 축 제목을 설정하는 옵션                                            |
| Gridlines         | 차트에 그리드 라인을 표시할지 여부를 결정                              |
| Tick labels       | 축에 눈금 라벨을 표시할지 여부를 결정하는 옵션                           |
| Orientation       | 축의 방향을 설정                                                 |
|                   | Label 방향이 돌아감: Hotizontal / Vertical / Angled             |

## 기타 기능
### Available fields
* 선택된 다른 축의 필드와 맞는 필드를 보여줌
