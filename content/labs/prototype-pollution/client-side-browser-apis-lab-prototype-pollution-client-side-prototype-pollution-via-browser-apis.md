---
title: "Client-side prototype pollution via browser APIs"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/client-side/browser-apis/lab-prototype-pollution-client-side-prototype-pollution-via-browser-apis"
difficulty: Practitioner
note_kind: problem
---

# Client-side prototype pollution via browser APIs

## 문제 조건

클라이언트 측 프로토타입 오염으로 DOM XSS가 가능하다. 개발자가 알려진 가젯을 패치하려 했지만 우회할 수 있다.

## 완료 조건

전역 Object.prototype에 속성을 넣을 소스와 JavaScript 실행 가젯을 찾아 alert()를 호출한다.

## 문제 설명

브라우저 API를 거치는 오염 경로와 패치 우회 가능성을 함께 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/client-side/browser-apis/lab-prototype-pollution-client-side-prototype-pollution-via-browser-apis)
