# CRLF (\r\n)
* Carriage Return(CR): '\r' (ASCII 13)
* Line Feed(LF): '\n' (ASCII 10)이 두 개의 문자를 연속해서 사용하여 줄바꿈을 표현합니다.주로 Windows 운영체제에서 사용된다.

# LF (\n)
* Line Feed(LF): '\n' (ASCII 10)만 사용하여 줄바꿈을 표현한다.
* 주로 Unix 기반 운영체제, 즉 Linux나 macOS에서 사용된다.

## 차이점
* Windows: CRLF (\r\n)을 사용하여 줄바꿈을 처리한다.
* 이는 과거 타자기 시절, 커서를 맨 앞으로 이동시키고(CR), 다음 줄로 이동(LF)하는 동작에서 유래되었다.
* Unix/Linux 및 최신 macOS: LF (\n)만을 사용하여 줄바꿈을 처리한다.

## 예시
### Windows에서의 줄바꿈
`Hello\r\nWorld`

### Unix/Linux에서의 줄바꿈
`Hello\nWorld`

# 줄바꿈 (윈도우에서는 아래와 같은 git 설정을 해야함)
```bash
git config --global core.autocrlf input
git config --global core.eol lf
```

## git config --global core.autocrlf input
* 이 명령어는 core.autocrlf 설정을 input으로 설정한다.
* core.autocrlf는 Git이 텍스트 파일을 체크아웃하고 커밋할 때 줄바꿈 문자(CRLF와 LF)를 어떻게 처리할지를 결정한다.
* input으로 설정하면, Git은 체크아웃할 때 줄바꿈을 변경하지 않지만, 커밋할 때는 LF(유닉스 스타일)로 변환한다.
* 이는 주로 유닉스 기반 시스템(예: macOS, Linux)에서 사용된다.

## git config --global core.eol lf
* 이 명령어는 core.eol 설정을 lf로 설정한다.
* core.eol은 Git이 체크아웃 시 줄바꿈 문자를 어떻게 처리할지 결정한다.
* lf로 설정하면, Git은 체크아웃 시 파일의 줄바꿈 문자를 LF(유닉스 스타일)로 강제 변환한다.
* 이 설정은 코드가 여러 플랫폼(예: Windows와 유닉스 계열 시스템)에서 일관된 줄바꿈 문자를 가지도록 하는 데 유용하다.
* 이 두 명령어는 주로 유닉스 기반 시스템에서 작업하는 개발자들이 코드의 줄바꿈 문제를 최소화하기 위해 사용한다. Windows와 유닉스 계열 시스템 간의 줄바꿈 처리 방식을 맞추는 것이 중요할 때 사용된다.
