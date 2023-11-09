# JEST 설정 파일

```
//❗cloudHub jest.config.js 파일 설정
module.exports = {
  projects: [
    {
      displayName: 'test',
      testPathIgnorePatterns: [
        'build',
        '<rootDir>/node_modules/(?!(jest-test))',
      ],
      modulePaths: ['<rootDir>', '<rootDir>/..'],
      moduleDirectories: ['src', 'node_modules'],
      setupFiles: ['<rootDir>/test/setup.js'],
      transform: {
        '^.+\\\\.tsx?$': 'ts-jest',
        '^.+\\\\.js$': 'babel-jest',
      },
      testRegex: '(/__tests__/.*|(\\\\.|/)(test|spec))\\\\.(jsx?|tsx?)$',
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      snapshotSerializers: ['enzyme-to-json/serializer'],
      moduleNameMapper: {
        '\\\\.(css|scss)$': 'identity-obj-proxy',
      },
    },
    {
      runner: 'jest-runner-eslint',
      displayName: 'eslint',
      testMatch: ['<rootDir>/test/**/*.test.js'],
    },
  ],
}
```

### displayName

* 두 가지 이상의 project runner 사용 시 각 프로젝트마다 displayName 붙여주는 것을 권장

### transform

* test는 일반 로직과 분리되어 동작
* 그래서, babel이나 webpack으로 변환되는 과정을 따로 작성 필요
* transform은 이런 변환을 자동으로 해줌
* \.js, \.jsx, \.ts, \.tsx인 경우 babel-jest로 변환


### transformIgnorePatterns
* test 제외 대상을 설정

### rootDir
* Default: Jest config file이 있는 경로 혹은 package.json이 있는 경로
* * 둘 다 존재하지 않는다면 현재 경로를 rootDir로 설정

### testRegex
* tests 폴더 내에 있는 모든 \*.(spec|test).(js|ts) 형식인 모든 파일을 test 대상으로 여김

### moduleDirectories
* 모듈의 위치 경로
* Default: ["node_modules"]

### moduleFileExtensions
* 모듈 파일 확장자
* Default: ["js", "jsx", "ts", "tsx", "json", "node"]
* jest는 파일을 배열의 왼쪽에서 오른쪽으로 검색하기 때문에 타입 스크립트 사용시 ts와 tsx를 앞쪽으로 위치

### moduleNameMapper
* Test 대상이 되는 파일에서 사용하는 외부 모듈들, 이를테면 entity, 이미지, css 등을 불러올 경로를 지정

### CSS 모듈 모의
* React 스냅샷 테스트 하기에 매우 편리
* 프록시는 기본적으로 Node 6에서 활성화  되어 있음

### setupFiles
* 테스트 환경을 구성하거나 설정하기 위해 일부 코드를 실행하는 모듈의 경로 목록
* 각 setupFile은 테스트 파일 당 한 번씩 실행



# 참조
[katanazero86 velog](https://velog.io/@katanazero86/ReactNo-CRA-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Jest-%EA%B5%AC%EC%84%B1%ED%95%B4%EB%B3%B4%EA%B8%B0)
