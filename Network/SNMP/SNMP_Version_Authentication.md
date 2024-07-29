# 사용자 기반 보안
* SNMP v3를 사용하면 USM(사용자 보안 모델)을 통해 향상된 사용자 기반 보안을 적용할 수 있다.
* 각 사용자마다 고유한 보안 수준을 지정할 수 있습니다.

## noAuthNoPriv
* 인증과 개인 정보 보호를 제공하지 않는 보안 수준이다.

## authNoPriv
* 인증을 제공하지만 개인 정보 보호는 제공하지 않는 보안 수준이다. 
* 어플라이언스 쿼리 시 사용자 이름과 8자 이상의 암호가 필요하다. 
* 이 수준에서는 SNMPv2와 유사하게 암호화 없이 정보가 전송된다. 
* 인증 프로토콜로는 MD5 또는 SHA를 사용할 수 있으며 기본값은 SHA이다.
* 외부 모니터링 시스템에 SHA 알고리즘이 필요한 경우 GitHub Enterprise Server은(는) 현재 SHA-1을 사용한다.

## authPriv
* 인증과 개인 정보 보호를 모두 제공하는 보안 수준이다. 
* 8자 이상의 인증 암호가 필요하며, 응답은 암호화된다. 
* 개인 정보 암호는 필수는 아니지만 제공되는 경우 8자 이상이어야 한다. 
* 제공되지 않을 경우 인증 암호가 대신 사용된다. 
* 개인 정보 프로토콜로는 DES 또는 AES를 사용할 수 있으며 기본값은 AES이다.
* 외부 모니터링 시스템에 AES 알고리즘이 필요한 경우 GitHub Enterprise Server은(는) 현재 AES-128을 사용한다.

# SNMP Version별 인증
| 모델 | 수준       | 인증               | 암호화 | 설명                                                                                          |
|------|------------|--------------------|--------|---------------------------------------------------------------------------------------------|
| v1   | noAuthNoPriv | 커뮤니티 문자열    | 아니요 | 인증 시 커뮤니티 문자열 일치 기능을 사용합니다.                                                 |
| v2c  | noAuthNoPriv | 커뮤니티 문자열    | 아니요 | 인증 시 커뮤니티 문자열 일치 기능을 사용합니다.                                                 |
| v3   | noAuthNoPriv | 사용자 이름        | 아니요 | 인증 시 사용자 이름 일치 기능을 사용합니다.                                                     |
| v3   | authNoPriv   | MD5 또는 SHA       | 아니요 | HMAC-MD5 또는 HMAC-SHA 알고리즘을 기반으로 인증을 제공합니다.                                   |
| v3   | authPriv     | MD5 또는 SHA       | DES    | HMAC-MD5 또는 HMAC-SHA 알고리즘을 기반으로 인증을 제공합니다. CBC-DES(DES-56) 표준 기반 인증 이외에 DES 56비트 암호화 기능도 제공합니다. |

## Version 2c
* Community 문자열 확인
    * 비워 두면 기본값은 public

## Version 3 + noAuthNoPriv (보안 수준: noAuthNoPriv)
* Security Name (Security User) 확인

## Version 3 + authNoPriv (보안 수준: authNoPriv)
* Security Name (Security User) 확인
* Authentication Protocol (인증 프로토콜) 확인
* Authentication Password (인증 비밀번호) 확인

## Version 3 + authPriv (보안 수준: authPriv)
* Security Name (Security User) 확인
* Authentication Protocol (인증 프로토콜) 확인
* Authentication Password (인증 비밀번호) 확인
* Privacy Protocol (암호화 프로토콜) 확인
* Privacy Password (암호화 비밀번호) 확인

# SNMPv2 요구 사항
## Trap Community
* 라이브러리와의 통신에 SNMP v2c가 사용되는 경우에만 사용되는 SNMP v2c 트랩 커뮤니티 이름이다. 
* SNMP v3을 사용하는 경우 기본값인 public으로 설정된 상태로 두어야 한다..

## Community String
* SNMP v2c 사용자 커뮤니티 문자열이며, 일반적으로 public으로 설정된다. 
* 영숫자(a–z, A–Z, 0–9)만 포함할 수 있다. 
* 특수 문자는 허용되지 않는다.

# SNMPv3 요구 사항
## User Name
* SNMP 사용자 이름에는 최대 32자가 포함될 수 있으며 영숫자(대문자, 소문자 및 숫자)의 조합이 사용될 수 있다. 
* 공백은 허용되지 않는다.

## Authentication Password
* 인증 프로토콜 등록 정보가 MD5 또는 SHA로 설정된 경우 인증 암호가 필요하다.
* 대/소문자를 구분하는 인증 암호를 입력한다. 
* 인증 암호에는 8자 이상이어야 하며 영숫자(대문자, 소문자 및 숫자)의 조합이 사용될 수 있다.

## Privacy Password
* 프라이버시 프로토콜 등록 정보가 DES 또는 AES로 설정된 경우 프라이버시 암호가 필요하다.
* 프라이버시 암호는 8자 이상이어야 하며 영숫자(대문자, 소문자 및 숫자)의 조합이 사용되어야 한다.

## Authentication Protocol 종류
### MD5 (Message-Digest Algorithm 5)
* 설명: MD5는 해시 함수로, 임의 길이의 입력 데이터를 고정된 길이의 128비트 해시 값으로 변환합니다.
* 특징: 빠른 속도를 자랑하지만, 충돌 저항성이 약해 현대 보안 기준에서는 안전하지 않은 것으로 간주됩니다.
* 사용 예: 데이터 무결성 검사, 비밀번호 해싱 등. 그러나 중요한 보안 용도로는 권장되지 않습니다.

### SHA (Secure Hash Algorithm)
* 설명: SHA는 다양한 버전(SHA-0, SHA-1, SHA-2, SHA-3)을 포함하는 암호화 해시 함수입니다. 일반적으로 "SHA"는 SHA-1을 의미하지만, 안전성 문제로 사용이 줄고 있습니다.
* 특징: 160비트 해시 값을 생성합니다. SHA-1은 충돌 저항성 문제로 더 이상 안전하지 않습니다.

### SHA-2
* 설명: SHA-2는 SHA-256, SHA-384, SHA-512 등을 포함하는 해시 함수 군입니다.
* 특징: SHA-1보다 강화된 보안성을 제공하며, 다양한 해시 길이(256비트, 384비트, 512비트 등)를 지원합니다.
* 사용 예: 디지털 서명, SSL/TLS 인증서 등.

### HMAC-SHA-224, HMAC-SHA-256, HMAC-SHA-384, HMAC-SHA-512
* 설명: HMAC(Hash-based Message Authentication Code)는 해시 함수와 비밀 키를 조합하여 메시지 인증 코드를 생성하는 방식입니다. 
* 여기서는 각각 SHA-224, SHA-256, SHA-384, SHA-512 해시 함수를 사용합니다.
* 특징: 메시지 무결성 및 인증을 제공하며, 각각의 해시 함수의 강점을 상속받습니다.
* 사용 예: 메시지 인증, 데이터 무결성 검증, 네트워크 프로토콜 보안

## Privacy Protocol 종류
### DES (Data Encryption Standard)
* 설명: DES는 대칭 키 암호화 알고리즘으로, 56비트 키를 사용하여 데이터를 64비트 블록 단위로 암호화합니다.
* 특징: 현대 보안 기준에서는 키 길이가 짧아 안전하지 않다고 평가됩니다.
* 사용 예: 이전의 데이터 암호화 표준으로 사용되었으나, 현재는 더 안전한 알고리즘으로 대체되고 있습니다.

### AES (Advanced Encryption Standard)
* 설명: AES는 대칭 키 암호화 알고리즘으로, 128비트, 192비트, 256비트 키를 사용하여 데이터를 암호화합니다.
* 특징: 현재 가장 널리 사용되는 암호화 표준 중 하나로, 강력한 보안을 제공합니다.
* 사용 예: 데이터 암호화, 네트워크 보안, 파일 암호화 등.

### AES-128, AES-192, AES-256
* 설명: AES의 변형으로 각각 128비트, 192비트, 256비트 키를 사용합니다.
* 특징: 키 길이에 따라 보안 수준이 달라지며, AES-256이 가장 높은 보안을 제공합니다.
* 사용 예: AES와 동일하게 다양한 보안 용도로 사용됩니다.
