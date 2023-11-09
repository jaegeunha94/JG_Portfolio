# iptables failed 에러
firewalld가 stop 된 상태에서 Docker를 실행하고  
Docker가 실행되고 있는 상태에서 firewalld를 start했더니 위와 같이 에러가 발생했다.

반대로 firewalld가 start된 상태에서 Docker를 실행하고  
firewalld를 stop해도 위와 같은 에러가 발생한다.

이 에러는 **iptables에 Docker Chain 설정이 없어져서**  
발생하는 에러라고 한다.

 
Docker는 실행(start) 시,  
iptables 안에 Docker Chain을 만드는데  
다른 시스템에 의해 iptables에 변경이 발생할 경우  
위와 같은 에러를 띄운다고 한다.

해결법은 iptables 변경으로 인해 없어진 Docker Chain을  
Docker를 재시작해서 다시 만들어주면 된다.


```
# 1. Clear all chains:
[root@localhost /]# iptables -t filter -F
[root@localhost /]# iptables -t filter -X

# 2. Then restart Docker Service:
[root@localhost /]# systemctl restart docker
```

항상 서비스가 실행된 상태에서  
작업을 진행해서 문제가 생기는 것 같다.

명령어를 칠 때 이 명령어가 미치는 영향을  
천천히 생각해보고 나서  
신중히 명령어를 치는 습관을 들여야 겠다. 



# 참고자료
[P00H의 개발 블로그](https://p00hp00h.tistory.com/21)

[성딱이의 Shining Life](https://sseongju1.tistory.com/64)



