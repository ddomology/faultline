---
title: "SameSite Strict bypass via client-side redirect"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-client-side-redirect"
difficulty: Practitioner
note_kind: problem
---

# SameSite Strict bypass via client-side redirect

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능에 CSRF 취약점이 있다. 문제 제목은 `SameSite=Strict`와 브라우저 측 리디렉션을 다룬다. 자신의 계정은 `wiener:peter`다.

**완료 조건**

제공된 exploit server를 통해 피해자의 이메일 주소를 변경한다.

**문제 설명**

세션 쿠키의 `SameSite` 제약이 있는 이메일 변경 흐름이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-client-side-redirect)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
