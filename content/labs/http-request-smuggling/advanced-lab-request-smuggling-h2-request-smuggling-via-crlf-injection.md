---
title: "HTTP/2 request smuggling via CRLF injection"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-h2-request-smuggling-via-crlf-injection"
difficulty: Practitioner
note_kind: problem
---

# HTTP/2 request smuggling via CRLF injection

## 문제 조건과 설명

**주어진 조건**

프런트엔드가 HTTP/2 요청을 다운그레이드하면서 수신 헤더를 충분히 정리하지 않는다. 피해자는 15초마다 홈 페이지에 접속한다.

**완료 조건**

HTTP/2 전용 요청 밀어넣기 경로를 이용해 다른 사용자의 계정에 접근한다.

**문제 설명**

헤더에 포함된 줄바꿈 문자가 프로토콜 변환 과정에서 요청 해석을 바꿀 수 있는지 살펴본다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-h2-request-smuggling-via-crlf-injection)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
