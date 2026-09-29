---
title: "CSRF vulnerability with no defenses"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/lab-no-defenses"
difficulty: Apprentice
note_kind: problem
---

# CSRF vulnerability with no defenses

## 문제 조건

이메일 변경 기능에 CSRF 방어가 없다. 자신의 계정은 `wiener:peter`로 로그인할 수 있다.

## 완료 조건

이메일 주소를 바꾸는 CSRF용 HTML을 만들어 exploit server에 올린다.

## 문제 설명

피해자가 HTML을 열었을 때 이메일 변경 요청이 발생하는지가 완료 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/lab-no-defenses)
