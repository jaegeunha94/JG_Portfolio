# SNMP Version별 인증
## Version 2c
* Community 문자열 확인
    * 비워 두면 기본값은 public

## 사용자 기반 보안
* SNMP v3를 사용하면 USM(사용자 보안 모델)을 통해 향상된 사용자 기반 보안을 적용할 수 있다.
* 각 사용자마다 고유한 보안 수준을 지정할 수 있습니다.

### noAuthNoPriv
* 인증과 개인 정보 보호를 제공하지 않는 보안 수준이다.

### authNoPriv
* 인증을 제공하지만 개인 정보 보호는 제공하지 않는 보안 수준이다. 
* 어플라이언스 쿼리 시 사용자 이름과 8자 이상의 암호가 필요하다. 
* 이 수준에서는 SNMPv2와 유사하게 암호화 없이 정보가 전송된다. 
* 인증 프로토콜로는 MD5 또는 SHA를 사용할 수 있으며 기본값은 SHA이다.
* 외부 모니터링 시스템에 SHA 알고리즘이 필요한 경우 GitHub Enterprise Server은(는) 현재 SHA-1을 사용한다.

### authPriv
* 인증과 개인 정보 보호를 모두 제공하는 보안 수준이다. 
* 8자 이상의 인증 암호가 필요하며, 응답은 암호화된다. 
* 개인 정보 암호는 필수는 아니지만 제공되는 경우 8자 이상이어야 힌다. 
* 제공되지 않을 경우 인증 암호가 대신 사용된다. 
* 개인 정보 프로토콜로는 DES 또는 AES를 사용할 수 있으며 기본값은 AES이다.
* 외부 모니터링 시스템에 AES 알고리즘이 필요한 경우 GitHub Enterprise Server은(는) 현재 AES-128을 사용한다.

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
* 이 문자열은 SNMP v3 프로토콜을 사용할 때도 라이브러리와 STA 서버 사이의 초기 핸드셰이크에 필요하다.
* 영숫자(a–z, A–Z, 0–9)만 포함할 수 있다. 
* 특수 문자는 허용되지 않는다.

# SNMPv3 요구 사항
## User Name
* SNMP 사용자 이름에는 최대 32자가 포함될 수 있으며 영숫자(대문자, 소문자 및 숫자)의 조합이 사용될 수 있다. 
* 공백은 허용되지 않는다.

## Authentication Password
* 인증 프로토콜 등록 정보가 MD5 또는 SHA로 설정된 경우 인증 암호가 필요하다.
* 대/소문자를 구분하는 인증 암호를 입력한다. 
* 인증 암호에는 8-12자가 포함될 수 있으며 영숫자(대문자, 소문자 및 숫자)의 조합이 사용될 수 있다.

## Privacy Password
* 프라이버시 프로토콜 등록 정보가 DES 또는 AES로 설정된 경우 프라이버시 암호가 필요하다.
* 프라이버시 암호에는 정확히 8자가 포함되어야 하며 영숫자(대문자, 소문자 및 숫자)의 조합이 사용되어야 한다.
