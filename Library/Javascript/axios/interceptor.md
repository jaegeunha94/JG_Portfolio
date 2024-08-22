# Axios 인터셉터(Interceptor)
* Axios에서 HTTP 요청이나 응답이 이루어지기 전이나 후에 특정 로직을 실행할 수 있게 해주는 기능
* 인터셉터는 주로 요청을 수정하거나, 토큰을 자동으로 첨부하거나, 오류를 전역적으로 처리하는 등의 작업에 사용

# 요청 인터셉터 (Request Interceptor)
* 요청 인터셉터는 서버로 요청이 전송되기 전에 실행
* 예를 들어, 모든 요청에 인증 토큰을 자동으로 추가하거나, 요청 데이터를 특정 형식으로 변환할 수 있다.

# 응답 인터셉터 (Response Interceptor)
* 응답 인터셉터는 서버로부터 응답을 받은 후, 본격적인 처리 전에 실행된다. 
* 예를 들어, 응답 데이터를 변환하거나, 특정 오류를 전역적으로 처리하는 데 사용할 수 있다.

# 인터셉터 사용법
요청이 서버로 전송되기 전에 토큰을 자동으로 헤더에 추가하는 예제

```javascript
import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create();

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청을 수정하기 전에 실행될 코드
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 오류가 발생했을 때 실행될 코드
    return Promise.reject(error);
  }
);

// API 요청
axiosInstance.get('/user/12345')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

# 응답 인터셉터 예시
서버로부터의 응답을 받았을 때, 응답 데이터를 변환하거나 오류 처리를 하는 예제

```javascript
import axios from 'axios';

const axiosInstance = axios.create();

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공하거나 그대로 반환
    return response.data;
  },
  (error) => {
    // 특정 오류 코드에 따른 처리
    if (error.response && error.response.status === 401) {
      console.log('인증 오류 발생!');
      // 로그아웃 처리 등 추가 작업
    }
    return Promise.reject(error);
  }
);

// API 요청
axiosInstance.get('/user/12345')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
```

# 요약
* 요청 인터셉터는 요청이 서버로 전송되기 전에 요청을 수정하거나, 특정 로직을 실행할 수 있게 해준다.
* 응답 인터셉터는 서버로부터 응답을 받은 후, 데이터를 가공하거나 오류를 처리하는 데 유용
* 인터셉터는 주로 인증 처리, 오류 처리, 데이터 가공 등에 많이 사용
* 이러한 인터셉터 기능을 잘 활용하면 코드의 유지보수성과 가독성을 높일 수 있다.