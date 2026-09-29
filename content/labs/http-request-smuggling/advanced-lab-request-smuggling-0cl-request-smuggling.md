---
title: "0.CL request smuggling"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-0cl-request-smuggling"
difficulty: Expert
note_kind: problem
---

# 0.CL request smuggling

## 문제 조건

서버에 0.CL 요청 밀어넣기 취약점이 있고 `carlos`는 5초마다 홈 페이지에 접속한다. 공식 설명은 배경 자료로 `HTTP/1.1 Must Die` 백서를 언급한다.

## 완료 조건

Carlos의 브라우저에서 `alert()`를 실행한다.

## 문제 설명

0.CL에서 요청 길이를 다르게 이해할 때 사용자 브라우저까지 영향이 전파되는지를 다룬다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-0cl-request-smuggling)
