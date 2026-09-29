---
title: "Reflected XSS with AngularJS sandbox escape and CSP"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/client-side-template-injection/lab-angular-sandbox-escape-and-csp"
difficulty: Expert
note_kind: problem
---

# Reflected XSS with AngularJS sandbox escape and CSP

## 문제 조건

페이지에 CSP와 AngularJS가 함께 적용된다.

## 완료 조건

CSP를 우회하고 AngularJS 샌드박스를 벗어나 `document.cookie`를 경고창에 표시한다.

## 문제 설명

브라우저 정책과 AngularJS 실행 제한을 모두 다루는 XSS 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/client-side-template-injection/lab-angular-sandbox-escape-and-csp)
