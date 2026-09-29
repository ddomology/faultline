---
title: "SameSite Lax bypass via method override"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-lax-bypass-via-method-override"
difficulty: Practitioner
note_kind: problem
---

# SameSite Lax bypass via method override

## 문제 조건

이메일 변경 기능에 CSRF 취약점이 있다. 문제 제목은 `SameSite=Lax`와 요청 방식 변경을 다루며 피해자는 Chrome을 사용한다. 자신의 계정은 `wiener:peter`다.

## 완료 조건

제공된 exploit server로 피해자의 이메일 주소를 변경한다.

## 문제 설명

브라우저별 `SameSite` 동작이 달라 Chrome에서 시험하라는 조건이 명시되어 있다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-lax-bypass-via-method-override)
