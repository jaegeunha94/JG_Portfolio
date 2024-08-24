# [scaleSequential(domain, interpolator)](https://d3js.org/d3-scale/sequential)
* D3.js 라이브러리에서 제공하는 함수 중 하나로, 연속적인 데이터 값을 색상이나 기타 시각적 요소에 매핑하는 데 사용된다.
* 이 함수는 주로 색상 그라데이션을 시각화할 때 사용되며, 데이터를 연속적으로 변환하여 시각적으로 부드러운 전환을 제공한다.

# 사용 시기
* d3.scaleSequential은 특히 데이터의 밀도를 시각적으로 표현하거나, 연속적인 데이터에 대한 색상 맵을 만들 때 유용하다.
* 예를 들어, 히트맵, 지리 정보 시각화(지리적 열지도), 과학적 데이터 시각화 등에서 효과적으로 사용할 수 있다.
* 이 함수는 간단하지만 강력한 기능을 제공하므로, 색상 그라데이션을 통해 데이터를 시각화할 때 매우 유용하다.

# d3.scaleSequential 기본 개념
* scaleSequential은 연속적인 입력 값(예: 0에서 100까지의 숫자)을 하나의 함수(일반적으로 색상 간의 전환 함수)에 매핑하여 연속적인 출력(예: 색상 그라데이션)을 생성한다. 
* 이 함수는 두 가지 중요한 구성 요소를 가진다.

## 1. 도메인(domain)
* 입력 값의 범위입니다. 예를 들어, [0, 100]과 같은 숫자 범위가 될 수 있다.

## 2. 인터폴레이터(interpolator)
* 입력 값에 따라 출력 값(일반적으로 색상)을 계산하는 함수다. 
* D3는 여러 기본 제공 색상 인터폴레이터를 제공합니다.

## 사용법
```javascript
const colorScale = d3.scaleSequential()
  .domain([0, 100])  // 입력 값의 범위 설정
  .interpolator(d3.interpolateYlGnBu);  // 색상 스케일 설정
```

* 이렇게 설정된 colorScale은 0에서 100까지의 숫자를 d3.interpolateYlGnBu 함수에 따라 색상으로 변환한다. 
* 예를 들어, colorScale(0)은 interpolateYlGnBu의 시작 색상(노란색)을 반환하고, colorScale(100)은 끝 색상(파란색)을 반환한다. 
* 그 사이의 값들은 해당하는 색상으로 부드럽게 변환됩니다.

# 주요 메서드
## domain([start, end])
* 입력 데이터의 범위를 설정합니다. 기본값은 [0, 1]입니다.

## interpolator(interpolatorFunction)
* 도메인 범위에 매핑되는 출력 값을 계산하는 함수다. 
* D3.js는 다양한 인터폴레이터 함수를 제공한다.

# 주요 인터폴레이터
* D3.js는 여러 색상 인터폴레이터를 제공한다.

## d3.interpolateYlGnBu
* 노란색에서 초록색, 파란색으로 이어지는 그라데이션.

## d3.interpolateViridis
* 대중적으로 사용되는 색상 그라데이션으로, 노란색에서 보라색으로 변환.

## d3.interpolatePlasma
* 다채로운 색상 그라데이션으로, 자주색에서 노란색으로 변환.

## d3.interpolateRdYlBu
* 빨간색에서 노란색, 파란색으로 이어지는 그라데이션.

## 인터폴레이터 예시
```javascript
const colorScale = d3.scaleSequential()
  .domain([0, 100])
  .interpolator(d3.interpolateViridis);

console.log(colorScale(0));   // 인터폴레이터의 시작 색상
console.log(colorScale(50));  // 중간 색상
console.log(colorScale(100)); // 인터폴레이터의 끝 색상
```

* 위 예시에서, colorScale(0)은 interpolateViridis의 시작 색상을 반환하고, colorScale(100)은 끝 색상을 반환하며, colorScale(50)은 그 중간 색상을 반환한다.

