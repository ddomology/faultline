---
title: "H2.CL request smuggling"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-h2-cl-request-smuggling"
difficulty: Practitioner
note_kind: problem
---

# H2.CL request smuggling

## 문제 조건

프런트엔드가 길이가 모호한 HTTP/2 요청을 다운그레이드한다. 피해자는 10초마다 홈 페이지에 접속한다.

## 완료 조건

피해자 브라우저가 exploit server의 악성 JavaScript를 불러와 `alert(document.cookie)`를 실행하게 한다.

## 문제 설명

HTTP/2에서 HTTP/1로 변환될 때 생기는 요청 경계 차이를 피해자 브라우저 동작과 연결하는 실습이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-h2-cl-request-smuggling)
