# Jest 사용법

# it와 describe

우리가 코드 테스팅 로직을 쪼개고 쪼갤 때, 일단 가장 작은 단위는 it 이다.

it 내부에서는 expect를 통하여 특정 값이 우리가 예상한 값이 나왔는지 확인을 할 수 있다.

그리고 여러 개의 it를 describe 안에 넣을 수 있고, describe 안에는 또 여러 개의 describe를 넣을 수 있다.



> describe 와 it 에서 첫번째 파라미터는 작업의 설명을 넣어주게 되는데,   
> describe 에서는 어떤 기능을 확인하는지  
> it 부분에선 무엇을 검사해야 되는 지에 대한 설명을 넣으면 된다.



> ‘it’ 대신에 ‘test’를 사용해도 된다..  
> Jest에서는 ‘it'를 ‘test’의 alias로 제공하고 있다.  
> 그 이유는 다른 프론트엔드 테스트 프레임워크에서는 ‘it’를 사용하고 때문이다.



# 자주 사용되는 Matcher

## toBe(), toEqual()
```jsx
test('toBe는 obj가 같은 객체를 가리키고 있는지 확인한다', () => {

    const obj = {};

    expect(obj).toBe(obj); // true

});
```

```jsx
test('객체의 내용이 같더라도 서로 다른 메모리에 있는 객체이기 때문에 toBe를 쓰면 false가 나온다.', () => {

    expect({ name: 'John' }).toBe({ name: 'John' }); // false

});
```

```jsx
test('대신에 객체의 내용이 같은지를 확인하려면 toEqual을 써야 한다', () => {

    const obj = {};

    expect({ name: 'John' }).toEqual({ name: 'John' }); // true

});
```


## toBeTruthy(), toBeFalsy()

toBeTruthy()는 검증 대상이 이 규칙에 따라 true로 간주되면 테스트 통과이고,  
toBeFalsy()는 반대로 false로 간주되는 경우 테스트가 통과된다.

```jsx
test("number 0 is falsy but string 0 is truthy", () => {
  expect(0).toBeFalsy();
  expect("0").toBeTruthy();
});
```


## toHaveLength(), toContain()
toHaveLength() 배열의 길이를 체크할 때 쓰이고,

toContain() 특정 원소가 배열에 들어 있는 지를 테스트할 때 쓰인다.

```jsx
test("array", () => {
  const colors = ["Red", "Yellow", "Blue"];
  expect(colors).toHaveLength(3);
  expect(colors).toContain("Yellow");
  expect(colors).not.toContain("Green");
});
```

어떤 Matcher 함수가 불만족 하는 지를 테스트할 때는 앞에 not을 붙여주면 됩니다.



## toMatch()

문자열의 경우에는 단순히 toBe()를 사용해서 문자열이 정확히 일치하는 지를 체크하지만,  
종종 정규식 기반의 테스트가 필요할 때가 있는데 toMatch() 함수를 사용하면 된다.

```jsx
test("string", () => {
  expect(getUser(1).email).toBe("user1@test.com");
  expect(getUser(2).email).toMatch(/.*test.com$/);
});
```


## toThrow()

예외 발생 여부를 테스트 해야 할 때는 toThrow() 함수를 사용하면 된다.  
toThrow() 함수는 인자도 받는데 문자열을 넘기면 예외 메세지를 비교하고 정규식을 넘기면 정규식 체크를 해준다.

```jsx
function getUser(id) {
  if (id <= 0) throw new Error("Invalid ID");
  return {
    id,
    email: `user${id}@test.com`,
  };
}
```

그리고 테스트 코드를 작성해서 실행해보면 다음과 같이 테스트가 실패하게 된다.

```jsx
test("throw when id is non negative", () => {
  expect(getUser(-1)).toThrow();
  expect(getUser(-1)).toThrow("Invalid ID");
});
```


### ❗toThrow() 함수를 사용할 때 하기 쉬운 실수

반드시 expect() 함수에 넘기는 검증 대상을 함수로 한 번 감싸줘야 한다.
그렇지 않으면 예외 발생 여부를 체크하는 것이 아니라,  
테스트 실행 도중 정말 그 예외가 발생하기 때문에 그 테스트는 항상 실패하게 된다.

```jsx
test("throw when id is non negative", () => {
  expect(() => getUser(-1)).toThrow();
  expect(() => getUser(-1)).toThrow("Invalid ID");
});
```


## 중복 데이터 정리하기

### afterEach

각 테스트를 실행 후에 data 모듈에 저장되어 있는 데이터를 정리해주는 작업이 필요하다.  
Jest의 afterEach() 함수의 인자로 데이터를 정리해주는 코드를 넘겨주면 됩니다.

```jsx
afterEach(() => {
  data.users.splice(0);
});
```


### beforeEach

여러 테스트에 걸쳐 중복된 코드를 작성하는 것은 유지보수를 어렵게 한다.  
따라서 초기 데이터를 적재하는 코드만 추출하여 Jest의 beforeEach() 함수의 인자로 넘기겠다.

```jsx
beforeEach(() => {
  data.users.push(
    { id: 1, email: "user1@test.com" },
    { id: 2, email: "user2@test.com" },
    { id: 3, email: "user3@test.com" }
  );
});
```


### beforeAll, afterAll

 beforeAll(), afterAll()은 각각 함수의 전 후에 매번 호출되는 것이 아니라,  
맨 처음과 맨 끝에 딱 한 번씩만 호출된다.

대표적인 사용 사례로 데이터베이스에 접속할 필요한 연결(Connection) 객체를 생각해볼 수 있다.  
테스트 함수 마다 매번 Connection을 맺고 끊는 것 보다는 맨 처음에 한 번 Connection을 맺어 놓고   
여러 함수에 걸쳐서 사용 한 후 마지막에 Connection을 종료하는 것이 효율적일 것이다.

```jsx
let connection;

beforeAll(() => {
  conection = openConnection({ host: "...", port: "..." });
});

afterAll(() => {
  conection.close();
});
```


# Mocking
mocking은 단위 테스트를 작성할 때, 해당 코드가 의존하는 부분을 가짜(mock)로 대체하는 기법을 말한다.  
일반적으로 테스트하려는 코드가 의존하는 부분을 직접 생성하기가 너무 부담스러운 경우 많이 사용된다.


예를 들어, 데이터베이스에서 데이터를 삭제하는 코드에 대한 단위 테스트를 작성할 때,  
실제 데이터베이스를 사용한다면 여러가지 문제점이 발생할 수 있다.  
따라서 테스트가 인프라 환경에 영향을 받게됩니다. (non-deterministic)

무엇보다 이런 방식으로 테스트를 작성하게 되면   
특정 기능만 분리해서 테스트하겠다는단위 테스트(Unit Test)의 근본적인 사상에 부합하지 않게 된다.


mocking은 이러한 상황에서 실제 객체인 척하는 가짜 객체를 생성하는 매커니즘을 제공한다.  
또한 테스트가 실행되는 동안 가짜 객체에 어떤 일들이 발생했는지를 기억하기 때문에  
가짜 객체가 내부적으로 어떻게 사용되는지 검증할 수 있다.

결론적으로, mocking을 이용하면 실제 객체를 사용하는 것보다 훨씬 가볍고 빠르게 실행되면서도,  
항상 동일한 결과를 내는 테스트를 작성할 수 있다.




# jest.fn() 사용법

Jest는 가짜 함수(mock functiton)를 생성할 수 있도록 jest.fn() 함수를 제공한다.

const mockFn = jest.fn();
그리고 이 가짜 함수는 일반 자바스크립트 함수와 동일한 방식으로 인자를 넘겨 호출할 수 있다.

```jsx
mockFn();
mockFn(1);
mockFn("a");
mockFn([1, 2], { a: "b" });
```


위 가짜 함수의 호출 결과는 모두 undefined 이다.
어떤 값을 리턴 해야 할지 아직 알려주지 않았기 때문이다.

```jsx
mockFn.mockReturnValue("I am a mock!");
console.log(mockFn()); // I am a mock!
mockReturnValue(리턴 값) 함수를 이용해서 가짜 함수가 어떤 값을 리턴해야할지 설정해줄 수 있습니다.
```


## mockResolvedValue

비슷한 방식으로 mockResolvedValue(Promise가 resolve하는 값) 함수를 이용하면 가짜 비동기 함수를 만들 수 있다.

```jsx
mockFn.mockResolvedValue("I will be a mock!");
mockFn().then((result) => {
  console.log(result); // I will be a mock!
});
```


## mockImplementation(구현 코드)

mockImplementation(구현 코드)  함수를 이용하면 아예 해당 함수를 재구현 할 수 있다.

```jsx
mockFn.mockImplementation((name) => `I am ${name}!`);
console.log(mockFn("Dale")); // I am Dale!
```


테스트를 작성할 때 가짜 함수가 진짜로 유용한 이유는

가짜 함수는 자신이 어떻게 호출 되었는지를 모두 기억한다는 점이다.

```jsx
mockFn("a");
mockFn(["b", "c"]);

expect(mockFn).toBeCalledTimes(2); // 몇 번 호출 되었는지
expect(mockFn).toBeCalledWith("a"); // 어떤 인자와 호출되었는지
expect(mockFn).toBeCalledWith(["b", "c"]); // 어떤 인자(배열)와 호출되었는지
```




## jest.spyOn() 사용법

테스트를 작성할 때, 어떤 객체에 속한 함수의 구현을 가짜로 대체하지 않고,  
해당 함수의 호출 여부와 어떻게 호출 되었는지만을 알아내야 할 때 사용하는 함수이다.

```jsx
const calculator = {
  add: (a, b) => a + b,
};

const spyFn = jest.spyOn(calculator, "add");

const result = calculator.add(2, 3);

expect(spyFn).toBeCalledTimes(1); // 몇 번 호출 되었는지
expect(spyFn).toBeCalledWith(2, 3); // 어떤 인자와 호출되었는지
expect(result).toBe(5);
```

add 함수를 호출 후에 호출 횟수와 어떤 인자가 넘어갔는지 감증할 수 있다.  
하지만 가짜 함수로 대체한 것은 아니기 때문에 결과 값은 원래 구현대로 2와 3의 합인 5가 된다.


# 참조
[inpa before-after](https://inpa.tistory.com/entry/JEST-%F0%9F%93%9A-%ED%85%8C%EC%8A%A4%ED%8A%B8-before-after-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0)

[inpa describe-it](https://inpa.tistory.com/entry/JEST-%F0%9F%93%9A-%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%97%90-%EC%9C%A0%EC%9A%A9%ED%95%9C-%ED%95%A8%EC%88%98-only-skip-describe-it)

[inpa Mocking](https://inpa.tistory.com/entry/JEST-%F0%9F%93%9A-%EB%AA%A8%ED%82%B9-mocking-jestfn-jestspyOn)
