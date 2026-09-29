---
title: "Client-side prototype pollution in third-party libraries"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/client-side/lab-prototype-pollution-client-side-prototype-pollution-in-third-party-libraries"
difficulty: Practitioner
note_kind: problem
---

# Client-side prototype pollution in third-party libraries

## 문제 조건

축약된 서드파티 라이브러리 코드에 DOM XSS 가젯이 있어 클라이언트 측 프로토타입 오염을 찾기 어렵다.

## 완료 조건

DOM Invader로 오염 소스와 가젯을 찾고 exploit server로 피해자 브라우저에서 alert(document.cookie)를 실행한다.

## 문제 설명

라이브러리 내부의 가젯과 피해자에게 전달되는 입력을 연결하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/client-side/lab-prototype-pollution-client-side-prototype-pollution-in-third-party-libraries)
