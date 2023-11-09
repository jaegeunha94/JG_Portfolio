# 1. Connection: Upgrade의 의미

클라이언트가 서버에게 "현재 연결된 프로토콜을 다른 프로토콜로 바꿔줘!" 라고 요청하는 것

다른 프로토콜의 연결을 새로 만드는게 아니라 현재 연결의 프로토콜을 전환시키는 것

예를 들어 현재 HTTP 1.1 프로토콜에서 HTTP 2.0, HTTPS, Web socket으로 전환하는 것 


**[요청의 예시]**

```
GET /hello HTTP/1.1
Host: localhost
Connection: upgrade
Upgrade: websocket, foo
```

Upgrade가 헤더에 포함되면 Connection:upgrade도 필수적으로 요청에 포함되어야 한다.



## 101: Switching Protocols

그렇게 프로토콜 전환 요청이 성공적으로 이루어 지면 서버측 에서는  
101 Switching Protocols응답과 함께  
아래와 같이 응답을 해줌

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
```

## 426: Upgrade Required

위 내용과 살짝 별개의 내용이긴 한데 서버가 내가 보내는 요청의 프로토콜을 수행할 수 없으나     
다른 프로토콜로 전환하면 수행할 수 있을 경우 426 Upgrade Required 상태 코드를 반환

```
HTTP/1.1 426 Upgrade Required
Upgrade: HTTP/2.0
Connection: Upgrade
Content-Length: 53
Content-Type: text/plain
```



# NGinx, WebSocket 프로토콜 사용 시 Conf 파일 설정
```
location WebSocket_URL {
          proxy_http_version      1.1;
          proxy_pass https://apps;
          proxy_set_header       Upgrade $http_upgrade;
          proxy_set_header       Connection "upgrade";
          proxy_set_header Host $host;
}
```



# 출처
[j1mmyson](https://j1mmyson.github.io/posts/upgrade/)
