
# Inventory APIs
```
{
    "token": "",
    "eauth": "pam",
    "client": "local",
    "tgt": "<target minion>",
    "fun": "boto_ec2.get_regions",
    "kwarg": {
        "keyid": "<key id>",
        "key": "<key>"
    }
}
```

```
{
    "token": "",
    "eauth": "pam",
    "client": "local",
    "tgt": "<target minion>",
    "fun": "boto_ec2.get_zones",
    "kwarg": {
        "region": "<region>",
        "keyid": "<key id>",
        "key": "<key>"
    }
}
```

```
{
    "token": "",
    "eauth": "pam",
    "client": "local",
    "tgt": "<target minion>",
    "fun": "boto_ec2.describe_instances",
    "kwarg": {
        "region": "<region>",
        "keyid": "<key id>",
        "key": "<key>"
    }
}
```

```
{
    "token": "",
    "eauth": "pam",
    "client": "local",
    "tgt": "<target minion>",
    "fun": "boto_secgroup.get_all_security_groups",
    "kwarg": {
        "region": "<region>",
        "keyid": "<key id>",
        "key": "<key>",
        "group_ids": [
            "<group id>",
            "<group id2>"
        ]
    }
}
```

```
{
    "token": "",
    "eauth": "pam",
    "client": "local",
    "tgt": "<target minion>",
    "fun": "boto_ec2.describe_volumes",
    "kwarg": {
        "region": "<region>",
        "keyid": "<key id>",
        "key": "<key>",
        "volume_ids": [
            "<volume id1>",
            "<volume id2>"
        ]
    }
}
```

```
{
    "token": "",
    "eauth": "pam",
    "client": "local",
    "tgt": "<target minion>",
    "fun": "boto_ec2.describe_instance_types",
    "kwarg": {
        "region": "<region>",
        "keyid": "<key id>",
        "key": "<key>",
        "instance_types": [
            "<instance type>",
            "<instance type>"
        ]
    }
}
```

# Metric list API
* salt.modules.boto_cloudwatch.list_metrics(namespace=None, dimensions=[], next_token=None, region=None, key=None, keyid=None, profile=None)

```
{
    "token": "",
    "eauth": "pam",
    "client": "local",
    "tgt": "<target minion>",
    "fun": "boto_cloudwatch.list_metrics",
    "kwarg": {
        "region": "<region>",
        "keyid": "<key id>",
        "key": "<key>"
    }
}
```

```
{
    "token": "",
    "eauth": "pam",
    "client": "local",
    "tgt": "<target minion>",
    "fun": "boto_cloudwatch.list_metrics",
    "kwarg": {
        "region": "<region>",
        "keyid": "<key id>",
        "key": "<key>",
        "namespace": "<namespace>"
    }
}
```

```
{
    "token": "",
    "eauth": "pam",
    "client": "local",
    "tgt": "<target minion>",
    "fun": "boto_cloudwatch.list_metrics",
    "kwarg": {
        "region": "<region>",
        "keyid": "<key id>",
        "key": "<key>",
        "namespace": "<namespace>",
        "dimensions": [
            {
                "Name": "<instance id>"
            }
        ]
    }
}
```

```
{
    "token": "",
    "eauth": "pam",
    "client": "local",
    "tgt": "<target minion>",
    "fun": "boto_cloudwatch.list_metrics",
    "kwarg": {
        "region": "<region>",
        "keyid": "<key id>",
        "key": "<key>",
        "namespace": "<namespace>",
        "dimensions": [
            {
                "Name": "<instsance id>",
                "Value": "<value>"
            }
        ]
    }
}
```