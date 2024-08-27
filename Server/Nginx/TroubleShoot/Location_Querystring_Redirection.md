# 쿼리 문자열을 기준으로 리디렉션
* **NGINX가 location 지시문에서는 쿼리 문자열을 인식하지 못한다.**
* 기본적으로 쿼리 문자열을 기반으로 한 리디렉션을 설정하는 방법을 다루며, 일반적인 리디렉션 설정이 실패할 수 있는 상황을 해결하기 위해 MAP 지시문을 사용한다.

## NGINX에서의 일반적인 리디렉션 문제
* 일반적인 리디렉션 설정에서는 URL의 쿼리 문자열을 기반으로 리디렉션을 설정할 수 없다. 
* 예를 들어, `location = /tags?tag=cool { return 301 https://example.com/something; }` 와 같은 설정은 동작하지 않는다. 
* 이는 NGINX가 location 지시문에서 쿼리 문자열을 인식하지 못하기 때문이다.

## 해결책: MAP 지시문 사용
* MAP 지시문을 사용하여 쿼리 문자열을 기반으로 한 리디렉션을 설정할 수 있다. 
* 이 지시문은 서버 선언 이전에 설정 파일의 맨 처음 부분에 작성되며, 쿼리 문자열의 매개변수와 해당 매개변수에 따른 리디렉션 경로를 매핑한다.

## 예시 설정
```nginx
map $arg_tag $tag_new_destination {
  'cool' /something;
  '6.0.1' /tags/601;
  'alfa' /newone;
}
```

* 위의 예시에서, $arg_tag는 NGINX 변수로, URL의 쿼리 문자열에서 추출된다. 
* `?tag=` 매개변수로 인해 변수 이름이 $arg_tag가 된다. 
* `$tag_new_destination`는 우리가 정의한 커스텀 변수로, 매핑 테이블에 따라 리디렉션 경로를 지정한다.

## NGINX 설정 파일 구성
NGINX 설정 파일에서 리디렉션을 처리하는 방법은 다음과 같다.

1. MAP 지시문 작성: 쿼리 문자열 매개변수와 리디렉션 경로를 매핑하는 테이블을 작성한다.
2. 리디렉션 처리 로직 추가
    * location /tags 블록에서 error_page 420를 사용하여 리디렉션을 처리하는 위치로 전달한다.
    * location @tags_redirects 블록에서 매핑된 리디렉션 경로가 있으면 해당 경로로 301 리디렉션을 수행한다.

## 설정 예시
```nginx
location /tags {
  error_page 420 = @tags_redirects;
  if ( $args ~ "tag=" ) {
    return 420;
  }
  try_files $uri $uri/ /index.php?$query_string;
}

location @tags_redirects {
  if ($tag_new_destination) {
    return 301 $tag_new_destination;
  }
}
```

* 이 구성은 /tags 경로에서 쿼리 문자열 ?tag=가 있는 경우에만 리디렉션을 수행하도록 한다.

## 확장 가능한 설정
* 리디렉션 규칙이 많을 경우, 이를 별도의 파일로 분리하여 관리할 수 있다. 
* 예를 들어, includes/tags-redirects.conf 파일에 리디렉션 규칙을 나열하고, 설정 파일의 map 지시문에서 해당 파일을 포함시킨다.

# 참고 자료
* [azimut7 Blog](https://azimut7.com/blog/nginx-redirect-map)