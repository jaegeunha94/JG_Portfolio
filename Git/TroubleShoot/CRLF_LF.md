# 줄바꿈 (윈도우에서는 아래와 같은 git 설정을 해야함)
```bash
git config --global core.autocrlf input
git config --global core.eol lf
```

## git config --global core.autocrlf input
* 이 명령어는 core.autocrlf 설정을 input으로 설정합니다.
* core.autocrlf는 Git이 텍스트 파일을 체크아웃하고 커밋할 때 줄바꿈 문자(CRLF와 LF)를 어떻게 처리할지를 결정합니다.
* input으로 설정하면, Git은 체크아웃할 때 줄바꿈을 변경하지 않지만, 커밋할 때는 LF(유닉스 스타일)로 변환합니다.
* 이는 주로 유닉스 기반 시스템(예: macOS, Linux)에서 사용됩니다.

## git config --global core.eol lf
* 이 명령어는 core.eol 설정을 lf로 설정합니다.
* core.eol은 Git이 체크아웃 시 줄바꿈 문자를 어떻게 처리할지 결정합니다.
* lf로 설정하면, Git은 체크아웃 시 파일의 줄바꿈 문자를 LF(유닉스 스타일)로 강제 변환합니다.
* 이 설정은 코드가 여러 플랫폼(예: Windows와 유닉스 계열 시스템)에서 일관된 줄바꿈 문자를 가지도록 하는 데 유용합니다.
* 이 두 명령어는 주로 유닉스 기반 시스템에서 작업하는 개발자들이 코드의 줄바꿈 문제를 최소화하기 위해 사용합니다. Windows와 유닉스 계열 시스템 간의 줄바꿈 처리 방식을 * * 맞추는 것이 중요할 때 사용됩니다.
