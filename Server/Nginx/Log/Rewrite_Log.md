# rewrite Log는 Error log에서 확인
* Nginx에서 rewrite 작업이 잘 수행되었는지 확인하려면, 로그 파일을 확인하는 것이 확실하다.
* Nginx 로그 설정을 조정하여 rewrite 관련 상세 정보를 캡처할 수 있다.
* rewrite 규칙이 실행될 때, 해당 로그 메시지는 error_log에 기록된다. 
* notice 또는 info 레벨을 사용하면 rewrite 작업에 대한 상세한 정보가 포함될 수 있다. 

```nginx
http {
    # 전역 로그 설정
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log notice;

    server {
        # 개별 서버 블록의 로그 설정
        listen 443 ssl http2;
        server_name _;

        location / {
            # 로케이션 블록 로그
            access_log /var/log/nginx/location_access.log;
            error_log /var/log/nginx/location_error.log notice;
        }

        # 다른 설정...
    }
}
```