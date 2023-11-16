# AWS Configure
```
aws configure
AWS Access Key ID [None]: <Key ID>
AWS Secret Access Key [None]: <Key>
Default region name [None]: <region>
Default output format [None]: json
```

아래 명령으로 정상 세팅 여부를 확인할 수 있다.

```
$ aws cloudwatch list-metrics --namespace <Namespace>
{
    "Metrics": [
        {
            "Namespace": "<Namespace>",
            "MetricName": "CPUUtilization",
            "Dimensions": [
                {
                    "Name": "InstanceId",
                    "Value": "<Instance ID>"
                }
            ]
        },
        {
            "Namespace": "<Namespace>",
            "MetricName": "StatusCheckFailed_System",
            "Dimensions": [
                {
                    "Name": "InstanceId",
                    "Value": "<Instance ID>"
                }
            ]
-- More  -- // To quit, type 'q'
```

# Using CloudWatch input plugin
## Sample of configuration for NCU
Telegraf Configuration Sample 내용 중, 중요한 필드만 추려서 설명한다.

* namespace: AWS services that publish CloudWatch metrics - Amazon CloudWatch 참고하여, 적절한 서비스로 기입.
* [[inputs.cloudwatch.metrics]]:
    * 수집하고자 하는 메트릭(지표)로 필터링 할 수 있다.
    * About AWS APIs | CloudWatch API 에서 보듯이 과금 대상이기 때문에, 과금 최적화를 위해 필수 사용하는 것이 좋다.
* aws cloudwatch list-metrics --namespace AWS/EC2의 결과 중 MetricName를 선택할 수 있다.
* [[inputs.cloudwatch.metrics.dimensions]]:
    * [[inputs.cloudwatch.metrics]]로 필터링 할 경우는, 반드시 하나 이상의 dimensions을 지정해야 한다.
    * aws cloudwatch list-metrics --namespace AWS/EC2의 결과 중 Dimensions를 선택할 수 있다.
    * value에는 와일드카드(*)를 사용 할 수 있다.

## [Telegraf Configuration Sample]
```
[[inputs.cloudwatch]]
  ## Amazon Region
  region = "<region>"
  access_key = "<access key>"
  secret_key = "<secret key>"
  # role_arn = "arn:aws:iam::055008654303:user/chmnt"

  ## Requested CloudWatch aggregation Period (required - must be a multiple of 60s)
  period = "5m"

  ## Collection Delay (required - must account for metrics availability via CloudWatch API)
  delay = "5m"

  ## Recommended: use metric 'interval' that is a multiple of 'period' to avoid
  ## gaps or overlap in pulled data
  interval = "5m"

  ## Metric Statistic Namespace (required)
  namespace = "<Namespace>"

  ## Maximum requests per second. Note that the global default AWS rate limit is
  ## 50 reqs/sec, so if you define multiple namespaces, these should add up to a
  ## maximum of 50.
  ## See http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_limits.html
  # ratelimit = 25

  ## Timeout for http requests made by the cloudwatch client.
  # timeout = "5s"

  ## Namespace-wide statistic filters. These allow fewer queries to be made to
  ## cloudwatch.
  statistic_include = [ "average" ]
  # statistic_exclude = []

  ## Metrics to Pull
  ## Defaults to all Metrics in Namespace if nothing is provided
  ## Refreshes Namespace available metrics every 1h
  # [[inputs.cloudwatch.metrics]]
  # names = [ "RequestCountPerTarget" ]
  
  #  ## Statistic filters for Metric.  These allow for retrieving specific
  #  ## statistics for an individual metric.
  #  # statistic_include = [ "average", "sum", "minimum", "maximum", "sample_count" ]
  #  # statistic_exclude = []
  # #
  # #  ## Dimension filters for Metric.  All dimensions defined for the metric names
  # #  ## must be specified in order to retrieve the metric statistics.
  #   [[inputs.cloudwatch.metrics.dimensions]]
  #     name = "TargetGroup"
  #     value = "*"

[[inputs.cloudwatch]]
  ## Amazon Region
  region = "<region>"
  access_key = "<access key>"
  secret_key = "<secret key>"
  # role_arn = "arn:aws:iam::055008654303:user/chmnt"

  ## Requested CloudWatch aggregation Period (required - must be a multiple of 60s)
  period = "5m"

  ## Collection Delay (required - must account for metrics availability via CloudWatch API)
  delay = "5m"

  ## Recommended: use metric 'interval' that is a multiple of 'period' to avoid
  ## gaps or overlap in pulled data
  interval = "5m"

  ## Configure the TTL for the internal cache of metrics.
  cache_ttl = "1h"

  ## Metric Statistic Namespace (required)
  namespace = "<namespace>"

  ## Maximum requests per second. Note that the global default AWS rate limit is
  ## 50 reqs/sec, so if you define multiple namespaces, these should add up to a
  ## maximum of 50.
  ## See http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_limits.html
  # ratelimit = 25

  ## Timeout for http requests made by the cloudwatch client.
  # timeout = "5s"

  ## Namespace-wide statistic filters. These allow fewer queries to be made to
  ## cloudwatch.
  statistic_include = [ "average" ]
  # statistic_exclude = []

  ## Metrics to Pull
  ## Defaults to all Metrics in Namespace if nothing is provided
  ## Refreshes Namespace available metrics every 1h
  # [[inputs.cloudwatch.metrics]]
  #   names = ["CPUUtilization","EBSWriteBytes"]
  
  #   ## Statistic filters for Metric.  These allow for retrieving specific
  #   ## statistics for an individual metric.
  #   # statistic_include = ["average"]
  #   # statistic_exclude = []
  # #
  # #  ## Dimension filters for Metric.  All dimensions defined for the metric names
  # #  ## must be specified in order to retrieve the metric statistics.
  #   [[inputs.cloudwatch.metrics.dimensions]]
  #     name = "InstanceId"
  #     value = "*"

[[inputs.cloudwatch]]
  ## Amazon Region
  region = "<region>"
  access_key = "<access key>"
  secret_key = "<secret key>"
  # role_arn = "arn:aws:iam::055008654303:user/chmnt"

  ## Requested CloudWatch aggregation Period (required - must be a multiple of 60s)
  period = "5m"

  ## Collection Delay (required - must account for metrics availability via CloudWatch API)
  delay = "5m"

  ## Recommended: use metric 'interval' that is a multiple of 'period' to avoid
  ## gaps or overlap in pulled data
  interval = "5m"

  ## Configure the TTL for the internal cache of metrics.
  cache_ttl = "1h"

  ## Metric Statistic Namespace (required)
  namespace = "<namespace>"

  ## Maximum requests per second. Note that the global default AWS rate limit is
  ## 50 reqs/sec, so if you define multiple namespaces, these should add up to a
  ## maximum of 50.
  ## See http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_limits.html
  # ratelimit = 25

  ## Timeout for http requests made by the cloudwatch client.
  # timeout = "5s"

  ## Namespace-wide statistic filters. These allow fewer queries to be made to
  ## cloudwatch.
  statistic_include = [ "average" ]
  # statistic_exclude = []

  ## Metrics to Pull
  ## Defaults to all Metrics in Namespace if nothing is provided
  ## Refreshes Namespace available metrics every 1h
  # [[inputs.cloudwatch.metrics]]
  #   names = ["CPUUtilization","EBSWriteBytes"]
  
  #   ## Statistic filters for Metric.  These allow for retrieving specific
  #   ## statistics for an individual metric.
  #   # statistic_include = ["average"]
  #   # statistic_exclude = []
  # #
  # #  ## Dimension filters for Metric.  All dimensions defined for the metric names
  # #  ## must be specified in order to retrieve the metric statistics.
  #   [[inputs.cloudwatch.metrics.dimensions]]
  #     name = "InstanceId"
  #     value = "*"
```


[Test Result]
```
$ ./telegraf.exe --test --config=/etc/telegraf_win_test.conf --input-filter=cloudwatch
2021-06-30T08:14:38Z I! Starting Telegraf 
2021-06-30T08:14:38Z E! Unable to open windows/telegraf.log (open windows/telegraf.log: The system cannot find the path specified.), using stderr
```