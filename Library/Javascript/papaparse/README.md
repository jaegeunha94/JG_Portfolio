# papaparse
* Papa Parse는 JavaScript를 위한 가장 빠른 브라우저 내 CSV(또는 구분된 텍스트) 파서입니다. 
* RFC 4180 에 따라 신뢰할 수 있고 정확합니다.

## 특징
* 사용하기 쉬움
* CSV 파일을 직접 구문 분석합니다 (로컬 또는 네트워크)
* 빠름
* 대용량 파일 스트리밍
* 역방향 파싱 (JSON을 CSV로 변환)
* 구분 기호 자동 감지
* 웹 페이지의 반응성을 유지하는 작업자 스레드
* 헤더 행 지원
* 숫자와 부울을 해당 유형으로 변환할 수 있습니다.
* 줄바꿈과 인용문을 올바르게 처리하는 유일한 파서 중 하나

# papaparse Config
## 자주 사용
### header
* true 옵션을 사용하면 CSV 파일의 첫 줄을 헤더로 간주합니다.

### transformHeader
* 타입: function
* 설명: 헤더 값들을 변환하는 함수입니다. 이 예제에서는 헤더의 앞뒤 공백을 제거하기 위해 h.trim() 함수를 자주 사용

### dynamicTyping
* dynamicTyping: true 옵션을 사용하여 자동으로 데이터 타입을 변환합니다.

### delimiter
* 타입: string
* 설명: CSV 파일의 열을 구분하는 문자입니다. 기본값은 ,입니다. 다른 구분자를 사용하는 경우 예를 들어 ; 또는 \t 등을 사용할 수 있습니다.

### header
* 타입: boolean
* 설명: 첫 번째 줄을 헤더로 사용할지 여부를 지정합니다. true로 설정하면 첫 번째 줄의 값이 각 열의 키로 사용됩니다. 
* false로 설정하면 첫 번째 줄이 데이터의 일부로 간주됩니다.

### dynamicTyping
* 타입: boolean | object
* 설명: 각 필드의 값을 자동으로 해당하는 데이터 타입으로 변환할지 여부를 지정합니다. true로 설정하면 숫자는 숫자로, 날짜는 날짜 객체로 변환됩니다. 
* 특정 열에만 적용하려면 객체 형식으로 { "columnName": true }와 같이 지정할 수 있습니다.

### skipEmptyLines
* 타입: boolean | 'greedy'
* 설명: 빈 줄을 건너뛸지 여부를 지정합니다. true로 설정하면 빈 줄을 무시합니다. 'greedy'로 설정하면 데이터가 없는 줄도 건너뜁니다.

### step
* 타입: function
* 설명: 한 줄이 파싱될 때마다 호출되는 함수입니다. 이 함수는 한 줄씩 처리할 때 유용합니다.

### complete
* 타입: function
* 설명: 파싱이 완료되었을 때 호출되는 함수입니다. 파싱된 데이터는 이 함수의 인수로 전달됩니다.

### error
* 타입: function
* 설명: 오류가 발생했을 때 호출되는 함수입니다.

## 기타 Config

### quoteChar
* 타입: string
* 설명: 값을 감싸는 문자입니다. 기본값은 "입니다.

### escapeChar:
* 타입: string
* 설명: 이스케이프 문자입니다. 기본값은 "입니다.

### newline
* 타입: string
* 설명: 새 줄을 나타내는 문자입니다. 기본값은 자동으로 감지됩니다(\r\n, \n).

### comments
* 타입: boolean | string
* 설명: 주석 줄의 접두사를 지정합니다. 이 옵션이 설정되면, 주석 줄은 결과 데이터에 포함되지 않습니다. 예를 들어, "#"로 설정하면 #로 시작하는 줄은 주석으로 간주됩니다.

### preview
* 타입: number
* 설명: 미리보기 행 수를 지정합니다. 지정된 행 수만큼만 파싱합니다.

### encoding:
* 타입: string
* 설명: 파일 인코딩을 지정합니다. 기본값은 UTF-8입니다.

### worker
* 타입: boolean
* 설명: 웹 워커를 사용하여 파일을 비동기적으로 파싱할지 여부를 지정합니다. true로 설정하면 비동기적으로 처리되어 UI가 차단되지 않습니다.

### download
* 타입: boolean
* 설명: URL로부터 CSV 파일을 다운로드하여 파싱할지 여부를 지정합니다.

### delimiterDetection
* 타입: boolean
* 설명: 구분자를 자동으로 감지할지 여부를 지정합니다. 기본값은 true입니다.

# 참고
* [npmjs](https://www.npmjs.com/package/papaparse?activeTab=readme)