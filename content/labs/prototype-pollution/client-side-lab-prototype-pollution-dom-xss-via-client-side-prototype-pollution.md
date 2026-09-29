---
title: "DOM XSS via client-side prototype pollution"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/client-side/lab-prototype-pollution-dom-xss-via-client-side-prototype-pollution"
difficulty: Practitioner
note_kind: problem
---

# DOM XSS via client-side prototype pollution

## 문제 조건

클라이언트 측 프로토타입 오염으로 DOM XSS가 가능하다.

## 완료 조건

전역 Object.prototype을 오염시킬 소스와 JavaScript 실행 가젯을 결합해 alert()를 호출한다.

## 문제 설명

오염된 속성이 DOM 처리 코드에 전달되는 경로를 찾는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/client-side/lab-prototype-pollution-dom-xss-via-client-side-prototype-pollution)
