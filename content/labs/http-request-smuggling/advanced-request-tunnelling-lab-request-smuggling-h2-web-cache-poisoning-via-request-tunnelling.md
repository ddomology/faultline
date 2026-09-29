---
title: "Web cache poisoning via HTTP/2 request tunnelling"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/request-tunnelling/lab-request-smuggling-h2-web-cache-poisoning-via-request-tunnelling"
difficulty: Expert
note_kind: problem
---

# Web cache poisoning via HTTP/2 request tunnelling

## 문제 조건과 설명

**주어진 조건**

프런트엔드는 HTTP/2를 다운그레이드하면서 헤더를 일관되게 정리하지 않는다. 백엔드 연결은 재사용하지 않지만 요청 터널링에 취약하며 피해자는 15초마다 홈 페이지에 접속한다.

**완료 조건**

홈 페이지 캐시를 오염시켜 피해자 브라우저에서 `alert(1)`을 실행한다.

**문제 설명**

요청 터널링이 캐시 응답에 영향을 줄 수 있는 상황을 다루는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/request-tunnelling/lab-request-smuggling-h2-web-cache-poisoning-via-request-tunnelling)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
