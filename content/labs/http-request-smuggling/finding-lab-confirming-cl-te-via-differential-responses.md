---
title: "HTTP request smuggling, confirming a CL.TE vulnerability via differential responses"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/finding/lab-confirming-cl-te-via-differential-responses"
difficulty: Practitioner
note_kind: problem
---

# HTTP request smuggling, confirming a CL.TE vulnerability via differential responses

## 문제 조건과 설명

**주어진 조건**

프런트엔드·백엔드 서버가 있으며 프런트엔드는 청크 인코딩을 지원하지 않는다. 실습은 HTTP/2도 지원하지만 이 과제의 요청 형식은 HTTP/1을 사용한다.

**완료 조건**

백엔드로 숨겨진 요청을 보내 이후 웹 루트 `/` 요청이 `404 Not Found`를 반환하게 한다.

**문제 설명**

두 서버가 요청 길이를 다르게 해석하는 CL.TE 유형인지 응답 차이로 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/finding/lab-confirming-cl-te-via-differential-responses)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
