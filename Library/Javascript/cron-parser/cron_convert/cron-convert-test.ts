// 1. 단순 시간 변환 (시간만 영향)
const original1 = '* 23 * * *';
const result1 = convert(original1, 'UTC', 'Asia/Seoul');
const reverseResult1 = convert(result1, 'Asia/Seoul', 'UTC');
console.log(original1 === reverseResult1); // true or false

// 2. 월 말 경계 시 테스트 (월, 일 영향)
const original2 = '59 23 31 12 *';
const result2 = convert(original2, 'UTC', 'Asia/Seoul');
const reverseResult2 = convert(result2, 'Asia/Seoul', 'UTC');
console.log(original2 === reverseResult2); // true or false

// 2-1. 월 말 경계 시 테스트2 (월, 일 영향)
const original2_1 = '59 23 30 11 *';
const result2_1 = convert(original2_1, 'UTC', 'Asia/Seoul');
const reverseResult2_1 = convert(result2_1, 'Asia/Seoul', 'UTC');
console.log(original2_1 === reverseResult2_1); // true or false

// 2-2. 월 말 경계 시 테스트2 (월, 일 영향)
const original2_2 = '59 23 30 4 *';
const result2_2 = convert(original2_2, 'UTC', 'Asia/Seoul');
const reverseResult2_2 = convert(result2_2, 'Asia/Seoul', 'UTC');
console.log(original2_2 === reverseResult2_2); // true or false

// 2-3. 월 말 경계 시 테스트2 (월, 일 영향)
const original2_3 = '59 23 29,30 4 *';
const result2_3 = convert(original2_3, 'UTC', 'Asia/Seoul');
const reverseResult2_3 = convert(result2_3, 'Asia/Seoul', 'UTC');
console.log(original2_3 === reverseResult2_3); // true or false

// 3. 월 초 경계 시 테스트
const original3 = '0 0 1 1 *';
const result3 = convert(original3, 'UTC', 'Asia/Seoul');
const reverseResult3 = convert(result3, 'Asia/Seoul', 'UTC');
console.log(original3 === reverseResult3); // true or false

// 4. 요일 변환 확인 (요일 영향)
const original4 = '* * * * 1';
const result4 = convert(original4, 'UTC', 'Asia/Seoul');
const reverseResult4 = convert(result4, 'Asia/Seoul', 'UTC');
console.log(original4 === reverseResult4); // true or false

// 5. 여러 달 선택 시 테스트
const original5 = '* * * 1,2,12 *';
const result5 = convert(original5, 'UTC', 'Asia/Seoul');
const reverseResult5 = convert(result5, 'Asia/Seoul', 'UTC');
console.log(original5 === reverseResult5); // true or false

// 6. 복합 테스트 (모든 요소 영향)
const original6 = '0 23 28 2 *';
const result6 = convert(original6, 'UTC', 'Asia/Seoul');
const reverseResult6 = convert(result6, 'Asia/Seoul', 'UTC');
console.log(original6 === reverseResult6); // true or false

// 7. 시간과 요일을 동시에 테스트
const original7 = '0 22 * * 5';
const result7 = convert(original7, 'UTC', 'Asia/Seoul');
const reverseResult7 = convert(result7, 'Asia/Seoul', 'UTC');
console.log(original7 === reverseResult7); // true or false

// 8. 분 단위 변환 확인
const original8 = '30 5 * * *';
const result8 = convert(original8, 'UTC', 'Asia/Seoul');
const reverseResult8 = convert(result8, 'Asia/Seoul', 'UTC');
console.log(original8 === reverseResult8); // true or false

// 9. 초 단위 변환 확인 (초 단위 지원 시)
const original9 = '* * * * *';
const result9 = convert(original9, 'UTC', 'Asia/Seoul');
const reverseResult9 = convert(result9, 'Asia/Seoul', 'UTC');
console.log(original9 === reverseResult9); // true or false

// 10. 매 분마다 변환 확인
const original10 = '* * * * *';
const result10 = convert(original10, 'UTC', 'Asia/Seoul');
const reverseResult10 = convert(result10, 'Asia/Seoul', 'UTC');
console.log(original10 === reverseResult10); // true or false

// 11. 윤년 시 테스트 (2월 29일 확인)
const original11 = '0 12 29 2 *';
const result11 = convert(original11, 'UTC', 'Asia/Seoul');
const reverseResult11 = convert(result11, 'Asia/Seoul', 'UTC');
console.log(original11 === reverseResult11); // true or false

// 12. 복합적으로 하나는 2월, 하나는 다른 월
const original12 = '0 1 28,30 1,3 *';
const result12 = convert(original12, 'UTC', 'Asia/Seoul');
const reverseResult12 = convert(result12, 'Asia/Seoul', 'UTC');
console.log(original12 === reverseResult12); // true or false

// 13. DST 적용 시 테스트 (일광 절약 시간 적용 확인)
const original13 = '0 2 25 3 *';
const result13 = convert(original13, 'Europe/Berlin', 'Asia/Seoul');
const reverseResult13 = convert(result13, 'Asia/Seoul', 'Europe/Berlin');
console.log(original13 === reverseResult13); // true or false

// 14. 복합적으로 하나는 2월, 하나는 다른 월
const original14 = '0 20 28 3,4 *';
const result14 = convert(original14, 'UTC', 'Asia/Seoul');
const reverseResult14 = convert(result14, 'Asia/Seoul', 'UTC');
console.log(original14 === reverseResult14); // true or false
