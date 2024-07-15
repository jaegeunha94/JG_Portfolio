# client max body size
* 경로: /etc/nginx/nginx.conf
* 기본 설정에서 client_max_body_size 50M 옵션 추가
* Nginx에서 "413 Request Entity Too Large" 오류는 클라이언트가 서버로 전송하는 요청 본문의 크기가 설정된 제한을 초과했을 때 발생합니다. 
    * 이 문제를 해결하기 위해선 Nginx 설정에서 클라이언트 요청 본문의 최대 크기를 조정해야 합니다.
* Nginx 설정 파일(nginx.conf 또는 사이트별 설정 파일)에서 client_max_body_size 지시어를 수정하거나 추가하여 이 문제를 해결할 수 있습니다. 
    * 기본값은 1m (1 메가바이트)이지만, 필요에 따라 이 값을 늘릴 수 있습니다 

```diff
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;
++/    client_max_body_size 50M;
    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```
