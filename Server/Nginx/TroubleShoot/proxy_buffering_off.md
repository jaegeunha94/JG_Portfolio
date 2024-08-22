# Kapacitor 로그 스트리밍 문제 해결
Kapacitor로부터 로그를 받아오는 함수에서 문제가 발생  
이 문제는 Nginx가 앞단에서 프록시 역할을 하고 있을 때 발생했으며, Nginx의 proxy_buffering 옵션을 비활성화하여 해결

## Kapacitor로 부터 Log를 받아오는 Frontend 코드
```tsx
const kapacitorLogHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const getLogStreamByRuleID = (kapacitor, ruleID, signal) => {
  // axios는 Kapacitor가 로그 전송에 사용하는 청크 전송 인코딩을 지원하지 않음
  // AJAX는 basepath를 추가하지만, fetch를 사용하여 직접 공급해야 함
  const url = `${kapacitor.links.proxy}?path=/kapacitor/v1preview/logs?task=${ruleID}`;
  const basepath = window.basepath || '';

  return fetch(`${basepath}${url}`, {
    method: 'GET',
    headers: kapacitorLogHeaders,
    credentials: 'include',
    signal,
  });
};

```

# 문제 원인 및 해결 방법
Nginx의 proxy_buffering 옵션이 활성화되어 있으면, 프록시 서버는 백엔드 서버로부터 받은 응답을 클라이언트에 전달하기 전에 메모리나 디스크에 버퍼링 한다.  
이로 인해 실시간 로그 스트리밍과 같은 응답이 지연될 수 있는 상황이 발생했다.

이를 해결하기 위해, Nginx 설정에서 proxy_buffering 옵션을 off로 설정했다.  
이 설정을 통해 Nginx는 백엔드 서버로부터 받은 데이터를 즉시 클라이언트에 전달할 수 있게 되어, 실시간 로그 스트리밍이 원활하게 이루어지도록 했다.

## Nginx 설정 예시
```conf
upstream app {
    server <Server IP>:8888;
}

server {
    listen 443 ssl http2;
    server_name _;

    location / {
        proxy_pass https://app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
    }
}
```

## proxy_buffering 옵션 설명
* proxy_buffering 옵션은 Nginx가 백엔드 서버로부터 받은 응답을 클라이언트에게 전달하기 전에 임시로 버퍼에 저장할지를 결정한다.
* 기본적으로 이 옵션이 활성화되어 있으면, Nginx는 응답을 메모리나 디스크에 버퍼링한 후 클라이언트에게 전송한다.
* 그러나 실시간 로그 스트리밍과 같은 응답이 지연되어서는 안 되는 경우, proxy_buffering을 off로 설정해야 한다.
* 이 설정을 통해, 로그 스트리밍과 같은 실시간 데이터 전송이 필요한 경우 클라이언트가 서버에서 데이터를 즉시 받아볼 수 있도록 한다.