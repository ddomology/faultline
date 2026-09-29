---
title: "Response queue poisoning via H2.TE request smuggling"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/response-queue-poisoning/lab-request-smuggling-h2-response-queue-poisoning-via-te-request-smuggling"
difficulty: Practitioner
note_kind: problem
---

# Response queue poisoning via H2.TE request smuggling

## 문제 조건

프런트엔드가 길이가 모호한 HTTP/2 요청을 다운그레이드한다. 백엔드 연결은 요청 10개마다 재설정되고 관리자는 약 15초마다 로그인한다.

## 완료 조건

응답 큐 포이즈닝으로 `/admin`에 들어가 `carlos`를 삭제한다.

## 문제 설명

H2.TE 요청 경계 차이와 응답 순서의 혼선을 다루는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/response-queue-poisoning/lab-request-smuggling-h2-response-queue-poisoning-via-te-request-smuggling)
