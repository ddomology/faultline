---
title: "Blind SQL injection with out-of-band interaction"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band"
difficulty: Practitioner
note_kind: problem
---

# Blind SQL injection with out-of-band interaction

## 문제 조건과 설명

분석용 추적 쿠키의 값이 SQL 조회에 사용된다. 그러나 이 조회는 **비동기식**으로 실행되고 애플리케이션 응답에 영향을 주지 않는다. 화면의 문구, SQL 오류, 응답 시간으로 결과를 읽는 앞선 실습과 조건이 다르다. 공식 설명은 대신 주입된 조회를 통해 외부 도메인과 별도의 네트워크 상호작용을 일으킬 수 있다고 알려 준다.

### 관찰 지점이 웹 응답 밖에 있다

이 문제의 증거는 실습 페이지의 HTML이나 HTTP 상태 코드가 아니라, 지정한 외부 도메인 쪽에 도착한 **DNS 조회 기록**이다. 요청을 보낸 직후 페이지가 평소와 똑같이 보이더라도 SQL이 실행되지 않았다는 뜻은 아니다. 반대로 외부 이벤트를 보지 못한 채 요청 자체가 정상 처리되었다고 해서 목표를 달성한 것도 아니다.

**완료 조건은 SQL injection으로 Burp Collaborator에 대한 DNS 조회를 발생시키는 것**이다. 여기서는 사용자 비밀번호를 빼내거나 로그인할 필요가 없다. 실제 검증에서는 보낸 요청과 외부 이벤트를 연결할 수 있도록 식별 가능한 Collaborator 주소를 사용하고, 요청 후 해당 DNS 이벤트가 도착했는지 확인해야 한다.

### 실습 환경의 제한

공식 설명의 주의 문구에 따르면 Academy 방화벽은 실습에서 임의의 외부 시스템으로 향하는 상호작용을 차단한다. **Burp Collaborator의 기본 공개 서버를 사용해야 한다.** 임의의 도메인에서 이벤트가 보이지 않는다면 SQL 조건이 틀렸다는 결론부터 내릴 수 없다. 쿠키 이름, 주입 구문, 실제 DNS 이벤트는 문제 설명에 없으므로 직접 시도한 뒤 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band)

## 탐색 및 풀이 기록

아직 이 실습의 쿠키 요청이나 Burp Collaborator DNS 이벤트를 직접 기록하지 않았다. 웹 응답과 외부 이벤트를 혼동하지 않고 확인 결과를 같은 파일에 이어서 적는다.
