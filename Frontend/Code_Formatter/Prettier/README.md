# Prettier
## Prettier를 프로젝트에 적용하는 방법

1. .prettierrc 설정 파일 사용
2. VSCode 전역 설정 파일 사용

## ❓.prettierrc 파일 별도 생성하는 이유

`코드 스타일을 통일해야 하는 경우가 생길 때를 위함`

## .prettierrc 설정 파일 사용

1. prettier extension 설치
2. prettierrc 파일 생성
3. prettier는 기본적으로 프로젝트의 root에 있는 .prettierrc 파일에 적힌 룰에 의해서 동작

```
//❗설정 예제

{
  "singleQuote": true,      // single 쿼테이션 사용 여부
  "trailingComma": "es5",   // 여러 줄을 사용할 때, 후행 콤마 사용 방식
  "bracketSpacing": false,  // 객체 리터럴에서 괄호에 공백 삽입 여부
  "semi": false,            // 세미콜론 사용 여부
  "arrowParens": "avoid"    // 화살표 함수 괄호 사용 방식
}
```

* 프로젝트에 이 파일이 없으면 기본값으로 세팅


# 설정 요소
## 2. trailingComma (default: 'none')

* 객체, 배열, 함수 등의 후행에 쉼표를 찍을지 제어합니다.
  * none - 쉼표를 붙히지 않음"
  * es5 - ES5에서 유효한 후행 쉼표 붙힘 (객체, 배열 등)
  * all - 가능하면 후행 쉼표를 붙힘 (함수 인수)

## 3. arrowParens
* v1.9.0에서 arrowParens default를 avoid에서 always로 변경
* 화살표 함수에서 단일 파라미터에 괄호를 붙일지("always") 말지("avoid")에 대한 여부를 결정

## 3. prettier.jsxSingleQuote (default: false)
* JSX에서는 큰 따옴표 대신 작은 따옴표를 사용


# VSCode 설정 파일 활용 방법
* vscode에는 이미 내장된 lint가 있어 editor.formatOnsave 설정으로 autofix를 사용 가능
* prettier의 우선순위가 vscode editor config보다 높다.
* html의 경우 prettier 동작하지 않아, vscode 기본 formatter를 쓰는 것을 권장


# ❗Prettier 설정 우선순위

Prettier의 설정은 아래의 순서로 적용이 됩니다.  
`settings.json < .editorconfig < .prettierrc`

1. 먼저 settings.json에 설정한 세팅 값을 적용
2. 만약 프로젝트에 EditorConfig의 설정 파일인 .editorconfig가 있으면 이 설정이 덮어씀
3. 마지막으로 Prettier의 고유한 설정 파일인 .prettierrc가 프로젝트에 있으면 이 값을 최종적으로 적용

**VSCode의 Setting.json**

```
// 설정 예시

{
    "editor.renderControlCharacters": true,
    "editor.largeFileOptimizations": false,
    "editor.renderWhitespace": "none",
    "editor.wordWrap": "on",

		"editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",

    "prettier.singleQuote": true,
    "prettier.bracketSpacing": false,
    "prettier.semi": false,
    "prettier.trailingComma": "es5",
    "prettier.arrowParens": "avoid",
    "eslint.alwaysShowStatus": true,
  }
  ```
  
  
  
 # 참조
 [ux.stories](https://ux.stories.pe.kr/150)
