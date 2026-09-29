---
title: "HTTP/2 request splitting via CRLF injection"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-h2-request-splitting-via-crlf-injection"
difficulty: Practitioner
note_kind: problem
---

# HTTP/2 request splitting via CRLF injection

## 문제 조건과 설명

**주어진 조건**

프런트엔드가 HTTP/2 요청을 다운그레이드하면서 수신 헤더를 충분히 정리하지 않는다. 백엔드 연결은 요청 10개마다 재설정되고 관리자는 약 10초마다 로그인한다.

**완료 조건**

응답 큐 포이즈닝으로 `/admin`에 들어가 `carlos`를 삭제한다.

**문제 설명**

HTTP/2 헤더 처리 차이가 요청 분할과 응답 순서 혼선으로 이어지는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-h2-request-splitting-via-crlf-injection)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
