# HTTP 2.0 업그레이드 설정
```
server {
        listen  443 ssl http2 ;
        server_name _;
        ssl_certificate 인증서_경로
        ssl_certificate_key 키_경로
        
        location / {
               proxy_pass https://apps;
               proxy_set_header Host $host;
               proxy_set_header X-Real-IP $remote_addr;
               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
               proxy_set_header X-Forwarded-Proto $scheme;
       }
}

```

* **listen  443 ssl http2** 줄 추가
* ssl_certificate, ssl_certificate_key 설정
