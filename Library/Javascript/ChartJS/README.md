# ChartJS

## 차트 종류와 데이터 속성
* Line, Bar, Doughnut&Pie, Polar Area, Bubble, Scatter, Area, Mixed
* 총 8가지가 있으며, type에 속성 값에 사용

# ChartJS 관련 라이브러리

## react-chartjs-2
* Chart.js의 최신 버전: 4.4.0
* MIT Licensed Copyright 
* Chart.js v4 and v3 지원
* chart.js ^4.0.0 권장
* react-chartjs 최신 버전: 5.2.0 (2023.1.10)


# 기타 차트 관련 내용 정리
## Bubble Chart
* Bubble Chart는 세 가지 차원의 데이터를 동시에 표시하는 데 사용된다.
* 버블의 위치는 처음 두 차원과 해당 가로축 및 세로축에 의해 결정된다.
* 세 번째 차원은 개별 거품의 크기로 표시된다.


## Doughnut and Pie Charts
* Pie/Doughnut Chart는 세그먼트로 나뉘며, 각 세그먼트의 호는 각 데이터의 비례 값을 나타낸다.
* 데이터 간의 관계적 비율을 표시하는 데 탁월하다.
* Pie Chart와 Doughnut Chart는 Chart.js에서 사실상 동일한 클래스이지만 기본값인 컷아웃이 하나 다르다.
* 기본값은 파이 차트의 경우 0이고 도넛 차트의 경우 '50%'

## Line Chart
* Line Chart는 데이터 포인트를 선 위에 그리는 방식이다.
* 대개 추세 데이터 또는 두 데이터 집합의 비교를 표시하는 데 사용한다.

## Radar Chart
* 레이더 차트는 여러 데이터 요소와 그 사이의 변화를 표시하는 방법이다.
* 레이더 차트는 두 개 이상의 서로 다른 데이터 집합의 포인트를 비교하는 데 유용하다.

## Scatter Chart
* 기본 꺾은선형 차트를 기반으로 하며, X축이 선형 축으로 변경된다.
* Scatter Chart를 사용하려면 데이터를 X 및 Y 속성을 포함하는 개체로 전달해야 한다. 

# TroubleShoot
## Chart.js 4.0.0 이상 버전 문제점
* Chart.js는 Rollup이라는 Bundler를 사용
* Chart.js 4 버전에서 변경된 rollup.config.js 설정으로 인해, Chart.js 4 버전 이상의 라이브러리를 CloudHub에서 빌드 할 때 다음과 같은 오류가 발생
* 변경된 설정 파일로 인해 class 문법이 제대로 transpile 되지 않는 것으로 보임

### 결론
* Chart.js는 3.9.1, react-chartjs-2는 4.3.1 버전 사용
* react-chartjs-2 홈페이지에서 Chart.js v3에 대한 호환성을 제공하는 버전
* `yarn add chart.js@^3.9.1 react-chartjs-2@^4.3.1``
