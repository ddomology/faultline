---
title: "HTTP request smuggling, obfuscating the TE header"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/lab-obfuscating-te-header"
difficulty: Practitioner
note_kind: problem
---

# HTTP request smuggling, obfuscating the TE header

## 문제 조건과 설명

**주어진 조건**

프런트엔드와 백엔드가 중복된 HTTP 요청 헤더를 서로 다르게 처리한다. 프런트엔드는 `GET`·`POST` 이외의 메서드를 거부하며 요청 형식은 HTTP/1을 사용한다. 실습 자체는 HTTP/2도 지원한다.

**완료 조건**

백엔드가 다음 요청의 메서드를 `GPOST`로 인식하게 한다.

**문제 설명**

중복·변형된 전송 인코딩 헤더 해석 차이를 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/lab-obfuscating-te-header)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
