# orcl / xe
## XE (Express Edition)
* Oracle Database Express Edition의 기본 인스턴스 이름입니다. Oracle XE는 Oracle Database의 무료 버전으로, 가벼운 용도 및 개발, 학습 목적에 주로 사용됩니다.

## orcl
* Oracle Database의 전형적인 기본 인스턴스 이름 중 하나입니다. 특히 Standard Edition이나 Enterprise Edition과 같은 유료 버전에서 자주 사용되는 기본 이름입니다.

데이터베이스 인스턴스 이름은 구성에 따라 다르므로, 특정 환경에 맞게 올바른 인스턴스 이름을 사용해야 합니다.  
예를 들어, Oracle 12c에서는 XE 대신 ORCL을 사용하는 경우가 흔합니다. 이는 설치 과정 중에 설정되며, 필요에 따라 변경할 수도 있습니다.

## instance 확인 명령어
```
sqlplus / as sysdba

SELECT instance_name, status FROM v$instance;

INSTANCE_NAME                    STATUS
-------------------------------- ------------------------
orcl
```   