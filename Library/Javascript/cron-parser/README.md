# cron-parser 라이브러리 
* `cron-parser`는 Cron 표현식을 구문 분석하고 이를 기반으로 반복되는 시간 일정을 계산하는 라이브러리
* 이 라이브러리는 Cron 스케줄을 해석하여 특정한 시간대, 일/월/년 변화를 처리하거나 시차를 계산하는 데 사용

# 주요 기능 설명
## 1. **parseExpression()**
- `cron-parser`의 핵심 함수로, 주어진 Cron 표현식을 구문 분석하여 각 필드(분, 시, 일, 월, 요일 등)를 추출
- 이 함수는 Cron 표현식이 포함된 문자열을 받아 해당 스케줄의 다음 실행 시간 또는 이전 실행 시간을 계산하는 데 사용된다.
- 예시: 
    ```typescript
    const interval = cronParser.parseExpression('0 0 * * *');
    console.log(interval.fields); 
    ```

- 위의 코드는 `0 0 * * *` (매일 00시 실행)과 같은 Cron 표현식을 해석하고, 각각의 필드 값(분, 시, 일 등)을 추출

## 2. **fieldsToExpression()**
- `cron-parser`에서 필드 객체를 다시 Cron 표현식으로 변환하는 함수
- 사용자가 수정한 필드들을 받아서 이를 Cron 표현식 문자열로 변환
- 예시:
    ```typescript
    const expressionString = cronParser.fieldsToExpression(fields).stringify();
    ```

- `fields` 객체를 Cron 표현식으로 변환해주며, 예를 들어 `fields.minute = [0]`과 같은 데이터를 Cron 표현식으로 다시 재구성한다.

# 코드에서의 사용 예시
## 1. **Cron 표현식의 필드 추출**
- `parseExpression()` 함수는 주어진 Cron 표현식에서 각 필드 값을 추출하여, 이를 시간 변환 또는 수정 작업에 활용
- 코드에서는 `getFieldsCron()` 함수에서 `cron-parser`의 `parseExpression()`을 호출하여 필드 정보를 JSON 형식으로 변환하고 있다.
    ```typescript
    const getFieldsCron = (expression: string): any => {
        const interval = cronParser.parseExpression(expression);
        return JSON.parse(JSON.stringify(interval.fields));
    };
    ```

## 2. **Cron 필드 업데이트 및 변환**
- 코드는 사용자가 입력한 Cron 스케줄을 타임존에 맞게 변환하고, 그 결과를 기반으로 필드 값을 수정한다.
- 이후 수정된 필드를 `setFieldsCron()` 함수를 통해 다시 Cron 표현식으로 변환한다.
- `setFieldsCron()` 함수는 필드 값들을 `cron-parser`의 `fieldsToExpression()`을 이용해 다시 Cron 문자열로 변환한 후 반환한다.
    ```typescript
    const setFieldsCron = (fields: any): string => {
        return cronParser.fieldsToExpression(fields).stringify();
    };
    ```

## 3. **특정 시간대에서의 변환 로직**
- 코드에서는 원래 시간대에서 타임존 오프셋을 고려해 시간 변환을 수행하고, 이 변환된 시간을 기반으로 Cron 필드를 조정한다. 
- 예를 들어, `getDaysHoursMinutes()` 함수에서는 시간대 오프셋을 사용하여 시간, 분, 일 등의 변화를 계산한다.
    ```typescript
    const getDaysHoursMinutes = (hour, minute, timeZoneOffset) => {
        const minutes = hour * 60 + minute;
        const newMinutes = minutes + timeZoneOffset;
        const diffHour = (Math.floor(newMinutes / 60) % 24) - hour;
        const diffMinutes = (newMinutes % 60) - minute;
        const diffDays = Math.floor(newMinutes / (60 * 24));

        return {hours: diffHour, minutes: diffMinutes, days: diffDays};
    };
    ```

## 4. **특수 시간대 처리**
- 코드에서는 월의 마지막 날(`L`)과 같은 특별한 Cron 표현식의 경우도 타임존에 맞춰 처리할 수 있도록 추가 로직이 포함되어 있다.
    ```typescript
    if (cronExpressionFields.dayOfMonth.includes('L')) {
        const lastDayOfMonthInTargetTZ = DateTime.now()
            .setZone(targetTimeZone)
            .endOf('month').day;
        cronExpressionFields.dayOfMonth = [lastDayOfMonthInTargetTZ];
    }
    ```

# 참고
* [cron-parser Git Repository](https://github.com/harrisiirak/cron-parser)