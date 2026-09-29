---
title: "Reflected XSS protected by CSP, with CSP bypass"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-csp-bypass"
difficulty: Expert
note_kind: problem
---

# Reflected XSS protected by CSP, with CSP bypass

## 문제 조건

반사형 XSS 취약점이 있지만 CSP가 적용된다. 의도된 완료 방식은 Chrome에서만 가능하다.

## 완료 조건

CSP를 우회해 `alert` 함수를 호출한다.

## 문제 설명

브라우저의 콘텐츠 보안 정책이 스크립트 실행을 제한하는 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-csp-bypass)
