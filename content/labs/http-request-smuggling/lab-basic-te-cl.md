---
title: "HTTP request smuggling, basic TE.CL vulnerability"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/lab-basic-te-cl"
difficulty: Practitioner
note_kind: problem
---

# HTTP request smuggling, basic TE.CL vulnerability

## 문제 조건과 설명

**주어진 조건**

백엔드는 청크 인코딩을 지원하지 않고 프런트엔드는 `GET`·`POST` 이외의 메서드를 거부한다. 요청 형식은 HTTP/1을 사용한다. 실습 자체는 HTTP/2도 지원한다.

**완료 조건**

백엔드가 다음 요청의 메서드를 `GPOST`로 인식하게 한다.

**문제 설명**

TE.CL 요청 경계 차이를 관찰 가능한 메서드 변화로 확인하는 기초 실습이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/lab-basic-te-cl)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
