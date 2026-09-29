---
title: "DOM XSS using web messages and JSON.parse"
tags:
  - portswigger
  - dom-based-vulnerabilities
lab_url: "https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages-and-json-parse"
difficulty: Practitioner
note_kind: problem
---

# DOM XSS using web messages and JSON.parse

## 문제 조건

사이트가 웹 메시지를 받고 그 내용을 JSON으로 파싱한다.

## 완료 조건

exploit server의 HTML 페이지를 통해 취약점을 이용해 `print()` 함수를 호출한다.

## 문제 설명

메시지 내용이 `JSON.parse`를 거쳐 브라우저 동작에 사용되는 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages-and-json-parse)
