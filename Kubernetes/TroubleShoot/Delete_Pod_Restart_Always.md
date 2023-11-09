# restart always인 pod 삭제
```
$ kubectl edit <pod> -n <namespace>
# 수정 불가시 상위 삭제
# 상위 가능: replicaset, deployment, stateful

# pod가 속한 상위 단계 찾기
kubectl get pod <pod-name> -o jsonpath='{.metadata.ownerReferences[0].kind}'


# 삭제
kubectl delete replicaset <replicaset-name>
kubectl delete deployment <deployment-name>
kubectl delete statefulset <statefulset-name>
kubectl delete daemonset <daemonset-name>

```