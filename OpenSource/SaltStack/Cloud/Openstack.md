# Used Provider configurations
```
$ cat cloud.providers.d/cloud.conf
osp-pj-demo:
  driver: openstack
  region_name: <region name>
  auth:
    username: '<user name>'
    password: '<password>'
    project_name: '<project name>'
    user_domain_name: <user domain name>
    project_domain_name: <project domain name>
    auth_url: '<auth url>'
  insecure: true
```
* insecure: true SSL 연결 오류 발생시 insecure 옵션을 true로 설정

# API
## list_nodes_full(conn=None, call=None, kwargs=None)
```
{
    "token": "<token>",
    "eauth": "pam",
    "client": "runner",
    "fun": "cloud.action",
    "func": "list_nodes_full",
    "provider": "<provider>",
    "kwarg": {
        "all_projects": "True"
    }
}
```

## get_compute_limits(conn=None, call=None, kwargs=None)
```
{
    "token": "<token>",
    "eauth": "pam",
    "client": "runner",
    "fun": "cloud.action",
    "func": "get_compute_limits",
    "provider": "<provider>",
    "kwarg": {
        "project": "<project>"
    }
}
```
## get_volume_limits(conn=None, call=None, kwargs=None)
```
{
    "token": "<token>",
    "eauth": "pam",
    "client": "runner",
    "fun": "cloud.action",
    "func": "get_volume_limits",
    "provider": "<provider>",
    "kwarg": {
        "project": "<project>"
    }
}
```

## get_network_quotas(conn=None, call=None, kwargs=None)
```
{
    "token": "<token>",
    "eauth": "pam",
    "client": "runner",
    "fun": "cloud.action",
    "func": "get_network_quotas",
    "provider": "provider",
    "kwarg": {
        "project": "<proejct>"
    }
}
```
