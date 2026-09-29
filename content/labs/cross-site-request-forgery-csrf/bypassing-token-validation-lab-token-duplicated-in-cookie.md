---
title: "CSRF where token is duplicated in cookie"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-duplicated-in-cookie"
difficulty: Practitioner
note_kind: problem
---

# CSRF where token is duplicated in cookie

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능이 안전하지 않은 `double submit` 방식으로 CSRF 방어를 시도한다. 자신의 계정은 `wiener:peter`다.

**완료 조건**

exploit server의 HTML 페이지를 이용해 방문자의 이메일 주소를 변경한다.

**문제 설명**

쿠키와 요청값에 중복된 토큰이 올바른 세션 검증을 대신하는 상황이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-duplicated-in-cookie)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
