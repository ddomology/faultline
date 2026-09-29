---
title: "DOM XSS using web messages"
tags:
  - portswigger
  - dom-based-vulnerabilities
lab_url: "https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages"
difficulty: Practitioner
note_kind: problem
---

# DOM XSS using web messages

## 문제 조건

사이트에 웹 메시지 처리 취약점이 있다.

## 완료 조건

exploit server에서 대상 사이트에 메시지를 보내 `print()` 함수를 호출한다.

## 문제 설명

브라우저 간 메시지가 대상 페이지의 DOM 동작에 영향을 주는 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages)
