# 1. /etc/nginx/sites-available
## 역할
* 이 디렉토리는 Nginx에서 사용할 수 있는 모든 사이트의 구성 파일을 저장하는 장소 
* 여기에는 Nginx가 처리할 수 있는 모든 가상 호스트(Virtual Host)의 설정이 포함된다

## 특징
* 이 디렉토리에 있는 파일들은 실제로 Nginx가 사용하는 것이 아니라, 사이트의 구성을 정의해 놓은 것이다.
* 이곳에 파일이 존재한다고 해서 자동으로 활성화되지는 않는다.

# 2. /etc/nginx/sites-enabled
## 역할
* 이 디렉토리는 실제로 활성화된 사이트의 구성 파일에 대한 심볼릭 링크(또는 복사본)를 저장한다. 
* Nginx는 이 디렉토리 내에 있는 파일들을 읽어서 웹 서버의 가상 호스트 설정을 적용한다.

## 특징
* /etc/nginx/sites-enabled에 있는 파일만이 Nginx에 의해 실제로 사용된다. 
* 따라서, 사이트를 활성화하려면 /etc/nginx/sites-available에 있는 구성 파일을 이 디렉토리로 심볼릭 링크하거나 복사해야 한다.

## 구성 파일 활성화/비활성화 방법

### 사이트 활성화:
* 사이트를 활성화하려면 /etc/nginx/sites-available/에 있는 구성 파일을 /etc/nginx/sites-enabled/로 심볼릭 링크를 걸어준다.

```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

### 사이트 비활성화:
* 사이트를 비활성화하려면 /etc/nginx/sites-enabled/에서 해당 사이트의 심볼릭 링크를 삭제하면 된다.

```bash
sudo rm /etc/nginx/sites-enabled/example.com
```
