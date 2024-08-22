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

## proxy_buffering의 기본값은 on
* Nginx는 기본적으로 프록시된 응답을 버퍼에 저장한 후, 이 데이터를 클라이언트에게 전달한다.
* 이 설정은 일반적으로 웹 애플리케이션에서 성능을 최적화하고, 네트워크 효율성을 높이며, 클라이언트에게 안정적인 응답을 제공하기 위해 사용된다.
* 따라서, 별도의 설정이 없으면 Nginx는 응답 데이터를 버퍼링한다. 
* 이를 비활성화하려면 명시적으로 proxy_buffering off;를 설정해줘야 합니다.

# proxy_buffering off로 인한 잠재적인 문제점
## 1. 서버 부하 증가
* 버퍼링이 비활성화되면 Nginx는 백엔드 서버로부터 받은 데이터를 버퍼에 저장하지 않고 바로 클라이언트에게 전달한다.
* 이로 인해, Nginx가 중간에서 응답 데이터를 처리하고 관리할 수 없게 되어 서버에 부하가 직접적으로 전가될 수 있다. 
* 백엔드 서버의 응답 속도에 따라 클라이언트가 데이터를 받는 속도가 달라지며, 특히 대용량 데이터를 전송할 때 네트워크 지연이 발생할 수 있다.

## 2. 네트워크 성능 저하
* 버퍼링을 사용하면 Nginx는 네트워크 상황에 따라 데이터를 효율적으로 클라이언트에게 전달할 수 있다. 
* 하지만 버퍼링을 비활성화하면 이와 같은 최적화가 불가능해지고, 네트워크 트래픽이 불규칙해질 수 있다. 
* 이로 인해 대역폭이 낭비되거나, 데이터 전송이 비효율적으로 이루어질 수 있다.

## 3. 응답 지연 증가
* 버퍼링이 없으면 백엔드 서버에서 데이터를 받을 때마다 클라이언트에게 바로 전송하기 때문에, 클라이언트는 응답의 전체를 받기 전까지 부분적인 데이터만 받을 수 있다. 
* 이 경우 클라이언트가 모든 데이터를 받을 때까지의 지연 시간이 증가할 수 있으며, 특히 느린 네트워크에서 이 문제가 심각해질 수 있다.

## 4. 백엔드 서버의 스트레스 증가
* 버퍼링이 없으면 Nginx가 데이터를 관리하지 않고 백엔드 서버의 상태에 따라 클라이언트에게 직접 데이터를 전달한다. 
* 이는 백엔드 서버가 과도하게 스트레스를 받을 수 있는 상황을 초래할 수 있으며, 서버가 다운되거나 성능이 저하될 수 있다.

# 최종 해결 방안
* Nginx의 proxy_buffering 옵션을 off 하는 것은 특정 요청에만 적용하는 것을 고려해야 한다.