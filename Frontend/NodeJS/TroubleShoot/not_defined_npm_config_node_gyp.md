# NodeJS 14 업데이트 후 빌드시 Error Message
```
gyp info using node-gyp@5.1.1

gyp info using node@14.21.3 | win32 | x64

+// error C:\ROOT\Cloudhub_goinstall_test\cloudhub\frontend\node_modules\deasync: Command failed.
Exit code: 1
Command: node ./build.js
Arguments:
+//Directory: C:\ROOT\Cloudhub_goinstall_test\cloudhub\frontend\node_modules\deasync
Output:
+// C:\ROOT\Cloudhub_goinstall_test\cloudhub\frontend\node_modules\deasync>if not defined npm_config_node_gyp (node "C:\Program Files\nodejs\node_modules\npm\bin\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild )  else (node "" rebuild )
gyp info it worked if it ends with ok
gyp info using node-gyp@5.1.1
gyp info using node@14.21.3 | win32 | x64
gyp ERR! find Python
gyp ERR! find Python Python is not set from command line or npm configuration
gyp ERR! find Python Python is not set from environment variable PYTHON
gyp ERR! find Python checking if "python" can be used
gyp ERR! find Python - "python" is not in PATH or produced an error
gyp ERR! find Python checking if "python2" can be used
gyp ERR! find Python - "python2" is not in PATH or produced an error
gyp ERR! find Python checking if "python3" can be used
gyp ERR! find Python - "python3" is not in PATH or produced an error
gyp ERR! find Python checking if the py launcher can be used to find Python 2
gyp ERR! find Python - "py.exe" is not in PATH or produced an error
gyp ERR! find Python checking if Python is C:\Python27\python.exe
gyp ERR! find Python - "C:\Python27\python.exe" could not be run
gyp ERR! find Python checking if Python is C:\Python37\python.exe
gyp ERR! find Python - "C:\Python37\python.exe" could not be run
gyp ERR! find Python
gyp ERR! find Python **********************************************************
gyp ERR! find Python You need to install the latest version of Python.
gyp ERR! find Python Node-gyp should be able to find and use Python. If not,
gyp ERR! find Python you can try one of the following options:
gyp ERR! find Python - Use the switch --python="C:\Path\To\python.exe"
gyp ERR! find Python   (accepted by both node-gyp and npm)
gyp ERR! find Python - Set the environment variable PYTHON
gyp ERR! find Python - Set the npm configuration variable python:
gyp ERR! find Python   npm config set python "C:\Path\To\python.exe"
gyp ERR! find Python For more information consult the documentation at:
gyp ERR! find Python https://github.com/nodejs/node-gyp#installation
gyp ERR! find Python **********************************************************
gyp ERR! find Python
+// gyp ERR! configure error
gyp ERR! stack Error: Could not find any Python installation to use
gyp ERR! stack     at PythonFinder.fail (C:\Users\Snetsystems\AppData\Roaming\nvm\v14.21.3\node_modules\npm\node_modules\node-gyp\lib\find-python.js:307:47)
gyp ERR! stack     at PythonFinder.runChecks (C:\Users\Snetsystems\AppData\Roaming\nvm\v14.21.3\node_modules\npm\node_modules\node-gyp\lib\find-python.js:136:21)
gyp ERR! stack     at PythonFinder.<anonymous> (C:\Users\Snetsystems\AppData\Roaming\nvm\v14.21.3\node_modules\npm\node_modules\node-gyp\lib\find-python.js:225:16)
gyp ERR! stack     at PythonFinder.execFileCallback (C:\Users\Snetsystems\AppData\Roaming\nvm\v14.21.3\node_modules\npm\node_modules\node-gyp\lib\find-python.js:271:16)
gyp ERR! stack     at exithandler (child_process.js:390:5)
gyp ERR! stack     at ChildProcess.errorhandler (child_process.js:402:5)
gyp ERR! stack     at ChildProcess.emit (events.js:400:28)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:283:12)
gyp ERR! stack     at onErrorNT (internal/child_process.js:472:16)
gyp ERR! stack     at processTicksAndRejections (internal/process/task_queues.js:82:21)
gyp ERR! System Windows_NT 10.0.19045
gyp ERR! command "C:\\Program Files\\nodejs\\node.exe" "C:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild"
gyp ERR! cwd C:\ROOT\Cloudhub_goinstall_test\cloudhub\frontend\node_modules\deasync
gyp ERR! node -v v14.21.3
gyp ERR! node-gyp -v v5.1.1
gyp ERR! not ok
+// Build failed
```

## 에러 메세지 해석
```js
// Pseudo Code
if not defined npm_config_node_gyp 
    (node "C:\Program Files\nodejs\node_modules\npm\bin\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild )  
else 
    (node "" rebuild )
```

* npm_config_node_gyp: npm_config_node_gyp 환경 변수가 설정되지 않았다면, 다음 명령을 실행
    * (node "C:\Program Files\nodejs\node_modules\npm\bin\node-gyp-bin\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild): node-gyp.js 스크립트를 Node.js를 통해 실행하여 네이티브 애드온을 다시 빌드합니다.
    * (node "" rebuild): npm_config_node_gyp 변수가 설정되어 있다면, 이 부분이 실행되지만 명령이 완전하지 않습니다(node "" rebuild는 유효한 명령이 아닙니다).
* 환경 변수 미설정: npm_config_node_gyp 환경 변수가 올바르게 설정되지 않았거나 누락된 경우, 스크립트는 기대했던 경로나 동작을 수행하지 않을 수 있습니다.
* 경로 문제: C:\Program Files\nodejs\node_modules\npm\bin\node-gyp-bin\..\..\node_modules\node-gyp\bin\node-gyp.js 경로에 문제가 있거나 파일이 존재하지 않는 경우, 파일을 찾을 수 없다는 오류가 발생할 수 있습니다.
* node-gyp 관련 오류: node-gyp 자체가 실행 중에 오류를 만날 경우, 다양한 오류 메시지가 출력될 수 있습니다. 이는 설치된 Python 버전, C++ 컴파일러 설정, 누락된 헤더 파일 등 다양한 이유로 인해 발생할 수 있습니다.
* 문법 오류: 제공된 코드에서 else 부분은 node "" rebuild와 같이 잘못된 명령을 포함하고 있습니다. 이 부분은 유효하지 않은 명령이며 실행 시 오류를 발생시킬 수 있습니다.


# node-gyp
* node-gyp는 C++로 작성된 네이티브 모듈을 Node.js에서 빌드하기 위해 사용되는 도구입니다. 
    * cross-platform command-line tool 로, native addon modules를 컴파일 해주는 도구. 
* node-gyp가 없는 경우, 주로 다음과 같은 상황이 발생할 수 있습니다:

## 빌드시 특이사항
* Node-gyp는 Node.js 자체를 빌드하는 데 사용되진 않음.
* node-gyp가 nodejs 버전에 필요한 개발 파일 또는 헤더를 알아서 다운하기 때문에 버전에 관계없이 여러 버전에서 사용 가능

## node-gyp 의존성
* node-gyp는 python과 visual studio build tools에 의존

### node-gyp Windows Setting (5.1.1)
#### 옵션 1 Microsoft의 windows-build-tools을 사용하여 필요한 도구와 설정을 설치하세요. 
* 관리자 권한으로 실행한 PowerShell 또는 CMD.exe에서 npm install --global --production windows-build-tools 명령어를 실행하세요.

#### 옵션 2 도구와 설정을 수동으로 설치하세요:
* Visual C++ 빌드 환경을 설치하세요: Visual Studio 빌드 도구(“Visual C++ 빌드 도구” 작업을 사용) 또는 Visual Studio 2017 커뮤니티(“C++을 사용한 데스크탑 개발” 작업을 사용) cmd를 실행하고, npm config set msvs_version 2017을 입력하세요 위 단계들이 여러분에게 효과가 없었다면, 추가적인 팁을 위해 Microsoft의 Windows에 대한 Node.js 지침을 방문해주세요.
* Windows 10 on ARM에서 네이티브 ARM64 Node.js를 대상으로 하려면, "Visual C++ 컴파일러와 ARM64용 라이브러리" 및 "Visual C++ ATL for ARM64" 구성 요소를 추가하세요.

#### Configuring Python Dependency (5.1.1)
* node-gyp는 호환 가능한 버전의 파이썬이 설치되어 있어야 합니다. 호환 가능한 버전은 v2.7, v3.5, v3.6, v3.7, 또는 v3.8 중 하나입니다. 
* 여러 파이썬 버전이 설치되어 있는 경우, 다음 방법 중 하나로 node-gyp이 사용할 파이썬 버전을 지정할 수 있습니다:
    1. --python 커맨드라인 옵션을 설정 예시 :$ node-gyp <command> --python /path/to/executable/python node-gyp
    2. npm을 통해 호출되고, 여러 버전의 파이썬이 설치되어 있다면, 적절한 값을 npm의 'python' 설정 키로 설정할 수 있습니다: $ npm config set python /path/to/executable/python 
    3. PYTHON 환경 변수가 파이썬 실행 파일의 경로로 설정되어 있다면, 호환 가능한 버전이라면 해당 버전이 사용됩니다.
    4. NODE_GYP_FORCE_PYTHON 환경 변수가 파이썬 실행 파일의 경로로 설정되면, 다른 설정된 또는 내장된 파이썬 검색 경로 대신 사용됩니다. 호환되지 않는 버전이라면 더 이상의 검색은 이루어지지 않습니다.


# nvm
## 로컬에 설치된 nvm의 node-gyp 버전
* 12.22.1:
    * `"node-gyp": "^5.1.0"`
    * 로컬에 깔린 것은 5.1.1
* 14.21.3: node-gyp의 버전은 "10.0.0"  "version": "10.0.0"
    * 에러 메세지에 나온 PythonFinder.fail (C:\Users\Snetsystems\AppData\Roaming\nvm\v14.21.3\node_modules\npm\node_modules\node-gyp\lib\find-python.js:307:47)

## find-python
> 에러 처리하는 방식이 10.0.0은 throw, 5.1.1은 callback으로 에러 객체를 넘기는 것으로 보입니다.

### 파일 경로
* nodejs 12: C:\Users\Snetsystems\AppData\Roaming\nvm\v12.22.1\node_modules\npm\node_modules\node-gyp\lib\find-python.js
* nodejs 14: C:\Users\Snetsystems\AppData\Roaming\nvm\v14.21.3\node_modules\npm\node_modules\node-gyp\lib\find-python.js

### 10.0.0 find-python Github
* find-python 에러 처리
    * `throw new Error('Could not find any Python installation to use')`

### 5.1.1  find-python Github 
* find-python 에러 처리
    `callback(new Error('not found'))`

# node-gyp (5.1.0)파이썬 지원 버전
* semverRange: '^2.6.0 || >=3.5.0',