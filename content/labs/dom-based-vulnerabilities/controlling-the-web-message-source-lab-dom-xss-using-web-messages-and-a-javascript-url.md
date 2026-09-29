---
title: "DOM XSS using web messages and a JavaScript URL"
tags:
  - portswigger
  - dom-based-vulnerabilities
lab_url: "https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages-and-a-javascript-url"
difficulty: Practitioner
note_kind: problem
---

# DOM XSS using web messages and a JavaScript URL

## 문제 조건

웹 메시지로 동작하는 DOM 기반 리디렉션 취약점이 있다.

## 완료 조건

exploit server에 HTML 페이지를 만들어 `print()` 함수를 호출한다.

## 문제 설명

메시지 처리와 JavaScript URL이 결합되는 DOM XSS 유형이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages-and-a-javascript-url)
