# Miniconda에 go 환경 구성
## 1.18.5 버전으로 가정
### 1. 새 Conda 환경 생성 (선택사항)
* 필요에 따라 Go를 별도의 환경에 설치하고 싶다면, 새로운 Conda 환경을 생성할 수 있습니다. 
* 이는 선택사항이지만, 프로젝트 간의 의존성 충돌을 방지하기 위해 권장됩니다.

```bash
conda create -n goenv python=3.8
```

* 위의 명령어는 goenv라는 이름의 새 환경을 생성하며, Python 버전 3.8을 사용합니다. 
* Go 설치에 Python은 필수적이지 않지만, Miniconda 환경을 생성할 때 Python 버전을 명시하는 것이 일반적입니다.

### 2. 생성된 Conda 환경 활성화:
```bash
conda activate goenv
```
* 이 명령어는 goenv 환경을 활성화합니다.

### 3. Go 1.18.5 설치
* Miniconda를 사용하여 Go를 설치하려면, Conda 패키지 매니저를 통해 가능한 패키지 중에서 설치하고자 하는 Go 버전을 찾아야 합니다. 
* 그러나, 정확한 버전(1.18.5)을 Conda를 통해 직접 설치하기 어려울 수 있습니다. 
* Conda-forge 커뮤니티가 제공하는 Go 버전을 사용하거나, 다른 방법을 통해 직접 설치해야 할 수 있습니다.

### 3-1. Conda-forge에서 Go 검색
```bash
conda search go --channel conda-forge

# 특정 버전 설치
conda install go=1.18.5 -c conda-forge
```

* 이 명령어는 conda-forge 채널에서 사용 가능한 Go 버전을 나열합니다. 
* 원하는 버전(1.18.5)이 목록에 없을 경우, 다음 방법을 사용할 수 있습니다.

### 3-2. 직접 다운로드 및 설치 (이 경우는 go를 conda에 설치하는게 아니라 외부에 설치하는 것임)
* Conda를 통한 설치가 어려울 경우, Go 공식 웹사이트에서 바이너리를 직접 다운로드하여 설치할 수 있습니다. 
* 이 방법은 Conda 환경 외부에서 수행되며, 설치된 Go를 Conda 환경에 통합하기 위해 추가적인 설정이 필요할 수 있습니다.
    * 이 방법으로 go를 설치할 경우, conda 환경이 아닌 시스템 전체 환경에 go가 설치된다.

```bash
wget https://dl.google.com/go/go1.18.5.linux-amd64.tar.gz
tar -xzf go1.18.5.linux-amd64.tar.gz
mv go /usr/local
```

### 4. gcc_linux-64 설치
* x86_64-conda-linux-gnu-cc는 Conda가 사용하는 C 컴파일러
* 컴파일러가 $PATH 환경 변수에 포함되어 있지 않거나 시스템에 설치되어 있지 않을 때 오류 발생

`conda install -c conda-forge gcc_linux-64 gxx_linux-64`

### 5. 변경 사항 적용
* 변경된 환경 변수를 적용하기 위해 터미널 세션을 새로고침합니다.

```bash
source ~/.bashrc
```

### 6. Go 버전 확인
* 설치가 성공적으로 완료되었는지 확인하기 위해 다음 명령어를 사용합니다.

```bash
go version
```

# TroubleShoot
## node-gyp 문제
```bash
# Development Tools 설치
sudo yum groupinstall -y "Development Tools"
```

* Development Tools에는 g++, make 및 기타 개발에 필요한 도구들이 포함되어 있습니다.

## go-bindata 환경 변수 문제
* Go 1.16 이상에서 go install은 기본적으로 $GOPATH/bin 또는 $GOBIN에 실행 파일을 설치합니다. 
* 이 경로들 중 하나가 $PATH 환경 변수에 포함되어 있는지 확인하세요. 현재 셸 세션에서 $PATH를 확인하려면 다음 명령을 사용합니다:

```bash
echo $PATH
export PATH=$PATH:$(go env GOPATH)/bin
source ~/.bashrc
```

## cgo: C compiler "x86_64-conda-linux-gnu-cc" not found: exec: "x86_64-conda-linux-gnu-cc": executable file not found in $PATH
* 이 오류는 cgo가 C 컴파일러를 찾을 수 없어 발생한 것으로, Conda 환경에서 Go를 사용할 때 흔히 볼 수 있는 문제입니다. 
* x86_64-conda-linux-gnu-cc는 Conda가 사용하는 C 컴파일러의 이름이며, 이 컴파일러가 $PATH 환경 변수에 포함되어 있지 않거나 시스템에 설치되어 있지 않을 때 발생합니다.

Conda 환경에서 Go와 C 컴파일러를 함께 사용하기 위해서는 몇 가지 해결 방법이 있습니다:

### Conda를 통해 C 컴파일러 설치
* Conda 환경에 필요한 C 컴파일러를 설치할 수 있습니다. 
* Conda-forge에서 제공하는 gcc_linux-64 패키지를 사용해 볼 수 있습니다. 
* 이 패키지는 gcc 컴파일러와 g++을 포함하며, x86_64-conda-linux-gnu-cc와 같은 컴파일러도 포함될 수 있습니다.

```bash
conda install -c conda-forge gcc_linux-64 gxx_linux-64
```

* 설치 후, Conda 환경 변수들이 적절히 설정되어 있는지 확인하고, 컴파일러가 $PATH에 추가되었는지 검사합니다.
* 시스템의 기본 C 컴파일러 사용: Conda 환경 외부에 설치된 기본 C 컴파일러(예: gcc)를 사용하도록 Go 빌드 환경을 설정할 수 있습니다. 
* 이를 위해 CC 환경 변수를 시스템의 gcc 컴파일러 경로로 설정합니다.

```bash
export CC=gcc
```

* 이 후 다시 빌드를 시도합니다. 
* 이 방법은 Conda 환경 내에서도 시스템의 gcc 컴파일러를 사용하도록 설정합니다.