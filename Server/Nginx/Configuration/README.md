# nginx config 적용전 테스트
* nginx -t


# Cloudhub NGINX 설정
```
upstream apps {
    server 127.0.0.1:8888;
}

server {
        listen  443 ssl http2 ;
        server_name _;
        ssl_certificate 인증서_경로;
        ssl_certificate_key key_경로;
        location / {
               proxy_pass https://apps;
               proxy_set_header Host $host;
               proxy_set_header X-Real-IP $remote_addr;
               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
               proxy_set_header X-Forwarded-Proto $scheme;
       }

       location /WebTerminalHandler {
               proxy_http_version 1.1;
               proxy_pass https://apps;
               proxy_set_header       Upgrade $http_upgrade;
               proxy_set_header       Connection "upgrade";
               proxy_set_header Host $host;
       }

}
```



## nginx.conf 위치

Nginx와 그 모듈들이 동작하는 방식은 ConfigurationFile에 의해서 결정된다.

이것의 위치는 아래 세가지 중 하나다.

설치방법에 따라서 디렉토리의 위치가 바뀌게 된다.

일반적으로 많이 사용하는 apt-get을 이용할 경우는 첫번째 "/etc/nginx"에서 찾을 수 있.

1. /etc/nginx
2. /usr/local/nginx/conf
3. /usr/local/etc/nginx.


# NGinx conf 설정

## 1. upstream

우선 upstream 변수를 설정해준다.  

upstream 변수는 server 설정에서 NGINX가 받아들인 요청을  

어떤 서버로 흘려보내 줄 것인지 결정할 때 사용된다.  

보통 아래와 같이 IP와 PORT를 지정해주는 것으로 설정이 끝난다.

```
upstream exampleServer {
  server 192.168.0.1:1234;
}
```

## 2. server - https redirect

server 명령어를 통해 http 요청을 https 로 redirecting 시키는 용도로 사용했다.   

내부의 listen 명령어를 통해 NGINX가 받아들이는 PORT 번호(80)를 지정하고,  
server_name 명령어를 통해 도메인 명을 지정해주는 것으로  
어떤 서버 쪽의 요청에 반응하는 것인지 설정한다.

```
server {
    listen 80;
    server_name example.server.com;
    return 308 https://$host$request_uri;
  }
```

return 명령어를 통해 상태 코드와 https://$host$request_uri를 넘겨주는데,    
상태 코드를 308로 할 것을 추천한다.

301,302,303 Redirect HTTP Code는 POST, PUT 같은 요청 GET으로 바꿔서   
Redirect 시킬 가능성이 있어서 302->307, 301->308로 사용하는 것이 좋다고 한다.



## 3. work_processes
nginx의 실행 가능한 worker 프로세스의 수를 지정해 줄 수 있다.  
nginx는 master와 worker프로세스로 구성되어 있다.

공식 문서에 의하면, 최적값은 cpu core에서 부터 하드 드라이브 등   
여러가지 요소에 의해서 결정되어 진다.

auto로 설정하면 자동으로 이 값을 찾아준다고 한다.

`worker_processes auto;`

 

## 4. worker_rlimit_nofile

Worker process들에서 최대로 열린 파일들의 수를 제한할 수 있다.  
이 수가 클수록 메인 프로세스를 재시작 할 필요가 없어진다고 한다.  
대신 열려 있는 파일의 수만큼 서버에 부하가 간다.

`worker_rlimit_nofile 65535;`



## 5. keepalive_timeout 
keepalive로 무한정 접속을 연결 시켜 놓다 보면,  
서버를 사용하지 않는 혹은 못하는 Connection까지 모두 keep하고 있으므로    
자원의 손실이 발생하게 된다.

그래서 keepalive_timeout를 이용해서,   
일정 시간이 지나도록 요청이 없으면 Connection을 끊도록 할 수 있다.

인자로 들어간 숫자는 keepalive 클라이언트 커넥션을 열어둘 시간을 적는 것이다.  
0으로 넣는다면 disable 시키는 것과 같다. 

`keepalive_timeout 5;`

 

## 6. reset_timedout_connection
timed out 커넥션을 리셋할 것인지에 대한   
여부를 on또는 off시킬 수 있다.

디폴트 값은 off고,  
timed out된 keep-alive 커넥션은 close 상태가 된다.

`reset_timedout_connection on;`

 
## [7. proxy_read_timeout](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_connect_timeout)
nginx 리버스 프록시를 통해 websocket을 연결하고   
메세지를 주고 받다가 일정 시간 동안  
메세지를 수신 또는 송신하지 않으면  연결이 끊기는 문제가 발생


### 원인
nginx에서는 기본적으로 수신 또는 송신을  
일정시간 하지 않으면 연결을 끊게 설정

`이 시간은 60초로 설정`

### 해결
이 시간 설정을 바꿔주면 되는데 설정은   
아래와 같이 websocket server 부분에 코드를 넣어주면 됨

기본 단위는 ms  
초 단위로 하려면 s를 넣어야 한다.

```
server {
    proxy_read_timeout 21600000; # 6 * 60 * 60 * 1000
    proxy_send_timeout 21600000; # 6 * 60 * 60 * 1000
 }
```

### 
```
Syntax:	proxy_read_timeout time;
Default:	proxy_read_timeout 60s;
Context:	http, server, location
```


## [8. proxy_connect_timeout](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_connect_timeout)
```
Syntax:	proxy_connect_timeout time;
Default: proxy_connect_timeout 60s;
Context: http, server, location
```


## [9. ssl_protocols](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ssl_protocols)
```
ssl_protocols TLSv1.2 TLSv1.1 TLSv1;
```

### SSL 또는 TLS를 사용해야 합니까?
SSL 2.0 및 3.0 모두 IETF에 의해 사용 중지되었습니다     
(각각 2011년 및 2015년). 폐기된 SSL 프로토콜   
(예 : POODLE, DROWN)에서 수년동안 취약점이 발견되어 계속해서 개선되고 있습니다.   

대부분의 최신 브라우저는 이전 프로토콜을 사용하는 웹서버를 만날 때  
사용자 환경이 저하될 수 있습니다   
(예 : URL 표시 줄의 자물쇠 또는 보안 경고). 이러한 이유로 서버 구성에서  
SSL 2.0 및 3.0을 비활성화해야 하며 TLS 프로토콜만 사용하도록 설정해야 합니다.

인증서는 프로토콜과 동일하지 않습니다.

누구든지 기존 SSL 인증서를 TLS 인증서로 대체해야 한다는 걱정을 하기 전에    
인증서가 프로토콜에 의존하지 않는다는 점에 유의해야 합니다.    

많은 공급 업체가 "SSL / TLS 인증서"라는 문구를 사용하는 경향이 있지만    
프로토콜은 인증서 자체가 아니라 서버 구성에 따라 결정되므로    
"SSL 및 TLS와 함께 사용할 인증서"라고 하는 것이 더 정확할 수 있습니다.

더 많은 사람들이 익숙한 용어이기 때문에 SSL 인증서라고 하는 인증서를 계속 볼 수는 있지만    
업계 전반에 TLS 용어 사용이 늘어나기 시작했습니다.    
SSL / TLS는 더 많은 사람들이 TLS에 익숙해질 때까지 공통적인 절충안입니다.



# 참고

[hyeon9mak github](https://hyeon9mak.github.io/nginx-upstream-multi-server)

[developer88 tistory](https://developer88.tistory.com/299)
