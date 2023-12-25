# The listener supports no services
* 메시지는 Listener가 현재 어떠한 Oracle 데이터베이스 서비스도 감지하고 있지 않다는 것을 나타냅니다. 이 상황은 보통 다음과 같은 몇 가지 이유로 발생할 수 있습니다:

## 1. 데이터베이스 인스턴스가 실행되지 않았을 때
* 데이터베이스 인스턴스가 아직 시작되지 않았거나 정상적으로 실행되고 있지 않을 수 있습니다. SQL*Plus를 사용하여 데이터베이스에 접속하고, SELECT instance_name, status FROM v$instance; 쿼리를 실행하여 인스턴스의 상태를 확인해야 합니다.

## 2. 동적 등록 문제
* Oracle 데이터베이스 인스턴스는 일반적으로 PMON(프로세스 모니터) 프로세스를 통해 Listener에 자동으로 등록됩니다. 이 과정에서 문제가 발생하면 Listener가 데이터베이스 서비스를 감지하지 못할 수 있습니다.

## 3. listener.ora 설정 문제
* listener.ora 파일에 정확한 SERVICE_NAME이나 SID가 지정되어 있지 않을 수 있습니다. 파일을 확인하고 필요한 경우 수정한 다음 Listener를 재시작해야 합니다.

## 4. 네트워크 문제
* 서버의 네트워크 설정이나 방화벽 구성에 문제가 있을 수 있습니다. 이는 Listener가 데이터베이스 인스턴스와 통신하는 데 영향을 줄 수 있습니다.

# Listener 관련 파일
## 포트
* tnsnames.ora 파일에서 설정하는 포트는 클라이언트가 데이터베이스에 연결할 때 사용하는 포트입니다. 보통 이 포트는 listener.ora에서 정의한 Listener 포트와 동일하게 설정됩니다.

## listener.ora용도
* 이 파일은 Oracle Net Listener의 구성을 정의합니다.
* Listener는 클라이언트의 연결 요청을 수신하고, 클라이언트가 데이터베이스에 연결할 수 있도록 합니다.
* 주요 내용: listener.ora 파일에는 Listener의 이름, 프로토콜, 포트, 그리고 데이터베이스 서비스 이름과 같은 네트워크 설정이 포함됩니다

```
LISTENER =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))
    )
  )
```

## sqlnet.ora용도
* 이 파일은 클라이언트 및 서버 측의 네트워크 환경을 구성합니다.
* sqlnet.ora는 클라이언트가 서버에 어떻게 연결하는지, 어떤 인증 방식을 사용하는지 등의 정보를 포함합니다.
* 주요 내용: 인증 방법, 암호화 설정, 네트워크 서비스 이름 해석 순서와 같은 네트워크 관련 설정이 포함됩니다.

```
SQLNET.AUTHENTICATION_SERVICES= (NONE)
NAMES.DIRECTORY_PATH= (TNSNAMES, EZCONNECT)
```

## tnsnames.ora용도
* 이 파일은 클라이언트가 Oracle 데이터베이스에 접근하기 위해 사용하는 네트워크 서비스 이름을 정의합니다.
* 주요 내용: 데이터베이스 서버의 호스트명, 포트, 데이터베이스 서비스 이름(SID) 또는 서비스 이름을 포함한 연결 정보가 포함됩니다.

```
ORCL =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = myhost.example.com)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SID = orcl)
    )
  )
```

# Listener 포트 번호 고정
* 일반적으로 Oracle Listener는 기본 포트 1521에서 수신 대기합니다. 그러나 여기서는 포트 번호가 26478로 설정되어 있습니다. 
이것이 의도된 설정인지 확인해야 합니다.만약 기본 포트 1521을 사용하길 원한다면, listener.ora 파일을 수정하여 PORT 값을 1521로 변경해야 합니다.

```
LISTENER =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = TCP)(HOST = your_hostname)(PORT = 1521))
    )
  )
```

* 여기서 your_hostname은 실제 서버의 호스트명 또는 IP 주소로 바꿔야 합니다.파일을 수정한 후, Oracle Listener를 재시작해야 변경 사항이 적용됩니다 (lsnrctl stop 후 lsnrctl start).
* Oracle Listener의 설정이 올바르게 이루어졌는지 확인하기 위해서는 lsnrctl status 명령어를 사용하여 현재 설정을 검토할 수 있습니다.

# tnsnames.ora
* 기본 경로: tnsnames.ora 파일도 일반적으로 $ORACLE_HOME/network/admin 디렉토리에 위치합니다.
* 파일 내용: tnsnames.ora 파일은 클라이언트가 데이터베이스에 접근할 때 사용하는 네트워크 서비스 이름을 정의합니다.SID orcl을 사용하는 서비스 이름 구성은 다음과 같을 수 있습니다:

```
ORCL =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SID = orcl)
    )
  )

```

* 마찬가지로, HOST = localhost와 PORT = 1521은 실제 서버 환경에 맞게 적절히 변경해야 합니다.


# TNS:listener does not currently know of SID given in connect descriptor 
* 클라이언트가 Oracle 데이터베이스에 연결을 시도할 때 발생하는데, 이는 주로 Oracle Listener가 클라이언트가 요청한 SID(Service Identifier)를 인식하지 못할 때 발생합니다.
* 이 문제를 해결하기 위해 다음 단계를 시도해 볼 수 있습니다:

## 1. SID 확인:
* 클라이언트 연결 문자열에서 사용된 SID가 데이터베이스의 실제 SID와 일치하는지 확인하세요.
* 데이터베이스의 SID는 Oracle 데이터베이스 인스턴스의 고유 식별자입니다.

## 2. Listener 구성 확인:
* listener.ora 파일을 확인하여 Listener가 올바른 SID 또는 서비스 이름으로 구성되어 있는지 확인하세요.
* 이 파일은 일반적으로 $ORACLE_HOME/network/admin 디렉토리에 위치합니다.
* 만약 listener.ora 파일에 SID 또는 서비스 이름이 명시적으로 정의되어 있지 않다면, Listener가 동적으로 서비스 등록을 수행하는지 확인할 필요가 있습니다.

## 3. 데이터베이스 서비스 상태 확인:
* 데이터베이스가 올바르게 시작되었고, 서비스가 정상적으로 실행 중인지 확인하세요.
* SQL*Plus를 사용하여 데이터베이스 인스턴스에 로그인하고, select instance_name, status from v$instance; 쿼리를 실행하여 인스턴스 상태를 확인할 수 있습니다

## 4. tnsnames.ora 파일 확인:
* 클라이언트 시스템에서 tnsnames.ora 파일의 구성을 확인하세요.
* 이 파일은 클라이언트가 데이터베이스 서비스에 연결하는 데 사용하는 정보를 포함하고 있으며, 일반적으로 클라이언트 시스템의 $ORACLE_HOME/network/admin 디렉토리에 위치합니다.

## 5. Listener 재시작:
* Listener 구성을 변경한 후에는 Listener를 재시작해야 합니다.
* 이를 위해 lsnrctl stop 명령어로 Listener를 멈춘 후, lsnrctl start 명령어로 다시 시작하세요.


