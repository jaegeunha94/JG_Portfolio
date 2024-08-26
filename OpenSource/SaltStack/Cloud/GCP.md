# Salt module
* Salt cloud 모듈 사용
* [Getting Started With Google Compute Engine](https://docs.saltproject.io/en/3001/topics/cloud/gce.html)
* 버전 호환 주의
    * 1.0.0 < apache-libcloud  <=  2.6.0

# Used Provider configurations
```
[root@hostname cloud.providers.d]# pwd
/etc/salt/cloud.providers.d

[root@hostname cloud.providers.d]# ll
total 8
-rw-r--r--. 1 root root 133 Mar 31 15:30 ec2.conf
-rw-r--r--. 1 root root 258 Apr  1 11:11 gce.conf

[root@hostname cloud.providers.d]# cat ec2.conf gce.conf
ec2-ncu:
  id: <id>
  key: <key>
  location: <location>

  driver: <driver>
gce:
  project: "<project>"
  service_account_email_address: "<email>"
  service_account_private_key: "<private key path>"

  grains:
    node_type: <node type>
    release: <release>

  driver: <driver>
```

# Salt API 사용 예시
### Patch GCE Module
* 아래 파일들을 패치한 후, salt-master 재시작.
    * salt/utils/cloud.py
    * salt/cloud/clouds/gce.py

# API
## salt.runners.cloud.query(query_type='list_nodes')
```
{
    "token": "<token>",
    "eauth": "pam",
    "client": "runner",
    "fun": "cloud.query"
}
```

## salt.runners.cloud.full_query(query_type='list_nodes_full')
```
{
    "token": "<token>",
    "eauth": "pam",
    "client": "runner",
    "fun": "cloud.full_query"
}
```

## show_instance
* salt.runners.cloud.action(func=None, cloudmap=None, instances=None, provider=None, instance=None, opts=None, **kwargs)
    *  salt.cloud.clouds.gce.show_instance(vm_name, call=None)

### show_instance 함수 사용 자제 권고
* 이 함수를 호출하면, action 함수의 기본 루틴 중 하나인 list_nodes계열 함수를 먼저 호출하게 된다.
* 이는 해당 인스턴스의 존재 여부를 판단하기 위한 것이며 거의 모든 action에는 적합하나,
* show_instance에는 과잉 호출이 된다.
* 대신, list_instances함수를 사용하여 얻은 필요한 모든 정보를 클라이언트에서 캐싱(클라이언트 메모리, 브라우저 어플리케이션 로컬  스토리지 등 각 경우에 따라 적절한 곳)하여 처리하는 것을 권고한다.

```
{
    "token": "<token>",
    "eauth": "pam",
    "client": "runner",
    "fun": "cloud.action",
    "func": "show_instance",
    "instance": "<instance name>"
}
```

## list_instances
* salt.runners.cloud.action(func=None, cloudmap=None, instances=None, provider=None, instance=None, opts=None, **kwargs)
    * → salt.cloud.clouds.gce.list_instances(call=None)
```
{
    "token": "<token>",
    "eauth": "pam",
    "client": "runner",
    "fun": "cloud.action",
    "func": "list_instances",
    "provider": "<provider>"
}
```

## show_disk
* salt.runners.cloud.action(func=None, cloudmap=None, instances=None, provider=None, instance=None, opts=None, **kwargs)
    * → salt.cloud.clouds.gce.show_disk(name=None, kwargs=None, call=None)

```
{
    "token": "<token>",
    "eauth": "pam",
    "client": "runner",
    "fun": "cloud.action",
    "func": "show_disk",
    "provider": "<provider>", 
    "kwarg": {
        "disk_name": "<disk name>"
    }
}
```

## show_network
* salt.runners.cloud.action(func=None, cloudmap=None, instances=None, provider=None, instance=None, opts=None, **kwargs)
    * → salt.cloud.clouds.gce.show_network(kwargs=None, call=None)

```
{
    "token": "<token>",
    "eauth": "pam",
    "client": "runner",
    "fun": "cloud.action",
    "func": "show_network",
    "provider": "<provider>",
    "kwarg": {
        "name": "<name>"
    }
}
```

## list_fwrules
* salt.runners.cloud.action(func=None, cloudmap=None, instances=None, provider=None, instance=None, opts=None, **kwargs)
    * → salt.cloud.clouds.gce.list_fwrules(call=None)
```
{
    "token": "<token>",
    "eauth": "pam",
    "client": "runner",
    "fun": "cloud.action",
    "func": "list_fwrules",
    "provider": "<provider>"
}
```

## show_fwrule
* salt.runners.cloud.action(func=None, cloudmap=None, instances=None, provider=None, instance=None, opts=None, **kwargs)
    * → salt.cloud.clouds.gce.show_fwrule(kwargs=None, call=None)
```
{
    "token": "<token>",
    "eauth": "pam",
    "client": "runner",
    "fun": "cloud.action",
    "func": "show_fwrule",
    "provider": "<provider>",
    "kwarg": {
        "name": "<name>"
    }
}
```