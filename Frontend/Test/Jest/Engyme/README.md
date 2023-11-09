# Enzyme

Enzyme 은 airbnb 에서 만든 리액트 컴포넌트 테스팅 도구다.  
이 도구를 사용하면 더욱 세밀한 리액트 컴포넌트 테스팅을 할 수 있게 된다.

Enzyme 을 통해서 DOM 이벤트를 시뮬레이트 할 수도 있고 (예: 버튼 클릭, 인풋 수정, 폼 등록 등)  
모든 라이프사이클이 문제 없이 돌아가는지도 확인 할 수 있다.

## Enzyme 설치

`$ yarn add enzyme enzyme-adapter-react-16`

## ❗Enzyme 사용하는 모든 폴더에 들어가 있어야 하는 설정

```jsx
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

cloudHub 제품에는 setup.js에 들어있고 jest.config.js 파일의 setupFiles 설정에 의해서 
 
테스트 파일 당 한 번씩 실행된다.

## ❗enzyme-to-json 이 필요한 이유

Enzyme 을 사용한 기본 스냅샷은, 가독성이 좋지 않다.

그때 필요한게 enzyme-to-json 이다.

적용하려면 package.json 파일 또는 jest.config.js 파일에 

snapshotSerializers: ['enzyme-to-json/serializer'],

속성을 추가한 후 yarn start 명령어를 다시 실행해야 한다.

```jsx
//❗ cloudHub jest.config.js 파일 설정

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
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
      },
      testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
     
      //-------------------------------------------------
      //❗ 필요한 설정 내용
      snapshotSerializers: ['enzyme-to-json/serializer'],
      //-------------------------------------------------
      
      moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
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

 cloudHub 제품에는 jest.config.js에 설정되어 있다.
