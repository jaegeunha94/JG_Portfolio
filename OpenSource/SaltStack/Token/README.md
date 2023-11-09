# Salt token 생성
## salt cli
`salt-run -c <경로> auth.mk_token username=<username> password=<passwird> eauth=pam token_expire=$(expr \( 365 \* 24 \* 60 \* 60 \))`

## curl
```
curl --location --request POST '<salt-url>/run' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
-d '{
    "username": "<username>",
    "password": "<password>",
    "eauth": "pam",
    "client": "runner",
    "fun": "auth.mk_token",
    "kwarg": {
        "username": "<username>",
        "password": "<password>",
        "eauth": "pam",
        "token_expire": 31536000
    }
}'
```
