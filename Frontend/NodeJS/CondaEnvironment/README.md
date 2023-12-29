# Conda에서 Node 버전 관리
* Conda는 Python 외에도 여러 언어를 지원하는 강력한 패키지 관리자 및 환경 관리 시스템입니다. 
* Node.js도 Conda 환경 내에서 관리할 수 있으며, 이를 통해 특정 프로젝트에 대해 Node.js의 특정 버전을 설치하고 관리할 수 있습니다. 
* 이는 프로젝트별로 다른 버전의 Node.js를 독립적으로 사용하고 싶을 때 유용합니다.

# Conda를 사용하여 Node.js를 설치하고 관리하는 기본적인 단계
## 1. Conda 환경 생성
* 새로운 Conda 환경을 생성하거나 기존 환경을 사용할 수 있습니다. 새 환경을 만들 때는 conda create -n myenv 명령어를 사용할 수 있습니다 (여기서 myenv는 환경 이름).

> Miniconda로 설치
> [Miniconda for Windows Download](https://docs.conda.io/projects/miniconda/en/latest/)

### Conda 환경변수
* 설치 시에 환경변수 추가를 체크하는 것이 좋다. 그렇지 않으면 수동으로 환경변수를 추가해야 한다.

#### Conda 경로 수동 추가
* Path 편집 창에서 다음 경로들을 추가합니다. 여기서는 Miniconda를 예로 들지만, 실제 경로는 Anaconda 또는 Miniconda의 설치 위치에 따라 다를 수 있습니다:

* Conda의 실행 파일이 있는 경로: C:\Users\<YourUsername>\Miniconda3
* Conda의 Scripts 폴더: C:\Users\<YourUsername>\Miniconda3\Scripts
* (선택적) Conda의 Library\bin 폴더: C:\Users\<YourUsername>\Miniconda3\Library\bin

## 2. 환경 활성화
* 생성한 환경을 활성화하기 위해서는 conda activate myenv 명령어를 사용합니다.

## 3. Node.js 설치
* 활성화된 Conda 환경에 Node.js를 설치하려면, conda install -c conda-forge nodejs 명령어를 사용합니다. 
* -c conda-forge는 Conda-Forge 커뮤니티에서 Node.js를 가져오라는 의미입니다.

```bash
conda create -n <environment name> python=<python version>

done
#
# To activate this environment, use       
#
#     $ conda activate environment name
#
# To deactivate an active environment, use
#
#     $ conda deactivate

conda install -c conda-forge nodejs=<node version>
```

## 4. Node.js 사용
* 설치 후에는 Conda 환경 내에서 node와 npm 명령을 사용하여 Node.js 프로젝트를 생성하고 관리할 수 있습니다.

## 5. 환경 비활성화
* 작업이 끝나면 conda deactivate 명령어로 환경을 비활성화할 수 있습니다.
* 이 방법을 통해 Conda 환경별로 Node.js를 독립적으로 설치하고 관리할 수 있으며, 다양한 Node.js 프로젝트 간의 버전 충돌 없이 작업을 진행할 수 있습니다. 

## Conda를 사용하는 주된 이점 
* 하나는 패키지 의존성 관리와 환경 관리를 동시에 할 수 있다는 점입니다. 
* 따라서 데이터 과학, 웹 개발 등 다양한 프로젝트에서 필요한 도구들을 효과적으로 관리하고자 할 때 유용하게 사용될 수 있습니다.

## 6. Conda 환경 공유하기
### 1. 환경 의존성 내보내기
1, 명령 프롬프트 또는 Anaconda Prompt 열기: 시작 메뉴에서 Anaconda Prompt를 검색하고 실행합니다.
2. 현재 환경 활성화: 만약 환경을 활성화하지 않았다면, 환경을 활성화합니다.

```bash
conda activate myenv
```

여기서 myenv는 내보내려는 Conda 환경의 이름입니다.

### 2. 환경 파일 생성:
```bash
conda env export > environment.yml
```

* 이 명령은 현재 활성화된 Conda 환경의 모든 의존성을 environment.yml 파일로 내보냅니다.

### 2. environment.yml 파일 공유
* 생성된 environment.yml 파일을 이메일, 클라우드 스토리지, GitHub 등을 통해 다른 사람과 공유합니다.

### 3. 환경 재생성 (다른 사용자)
받은 사람은 다음과 같은 단계로 환경을 재생성할 수 있습니다:

1. 공유받은 environment.yml 파일 저장: 파일을 적절한 위치에 저장합니다.
2. 명령 프롬프트 또는 Anaconda Prompt 열기: 시작 메뉴에서 Anaconda Prompt를 검색하고 실행합니다.
3. 환경 생성:

```bash
conda env create -f environment.yml
```

이 명령은 environment.yml 파일에 명시된 의존성을 사용하여 Conda 환경을 생성합니다.

## 주의사항
* 환경 이름: environment.yml 파일 안에는 환경의 이름이 포함되어 있습니다. 받는 사람이 이미 같은 이름의 환경을 가지고 있다면, 이름을 변경하거나 기존 환경을 삭제할 필요가 있습니다.
* 플랫폼 호환성: 다른 운영 체제에서 환경을 재생성할 때 일부 패키지가 호환되지 않을 수 있습니다. 패키지가 특정 OS에 특화되어 있다면, 해당 사항을 고려하여 필요한 경우 대체 패키지를 찾아야 할 수도 있습니다.

* 이 방법으로 Conda 환경을 파일로 내보내 공유하면, 다른 사람들이 동일한 환경을 쉽게 재구성하고 프로젝트의 의존성을 일치시킬 수 있습니다. 이는 특히 팀 작업이나 공동 연구, 교육 목적 등에서 매우 유용합니다.