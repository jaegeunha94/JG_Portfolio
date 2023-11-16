# Collecting via Telegraf
* Stackdriver API를 통해 수집.
* 최소 수집 간격은 1분.
* In all cases, the Stackdriver metric type is split on the last component into the measurement and field:

```
compute.googleapis.com/instance/disk/read_bytes_count
└──────────  measurement  ─────────┘ └──  field  ───┘
```

# Telegraf input plugin config sample:
```
[[inputs.stackdriver]]
project = "<Project>"
metric_type_prefix_include = [
  "compute.googleapis.com",
  "agent.googleapis.com",
  "networking.googleapis.com"
]
interval = "1m"
```