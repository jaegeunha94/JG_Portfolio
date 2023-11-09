# TLS 인증서 오류
````
# kubectl get pods
Unable to connect to the server: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "kubernetes")
위의 메세지로 인증서 오류가 발생 한다면.

# 1. 환경변수 설정을 해제한 다음
unset KUBECONFIG

# 2. 환경변수 설정
export KUBECONFIG=/etc/kubernetes/admin.conf
```
