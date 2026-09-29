---
title: "Stored DOM XSS"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-dom-xss-stored"
difficulty: Practitioner
note_kind: problem
---

# Stored DOM XSS

## 문제 조건

블로그 댓글 기능에 저장형 DOM 취약점이 있다.

## 완료 조건

저장된 댓글의 취약점을 이용해 `alert()` 함수를 호출한다.

## 문제 설명

댓글 저장 이후 브라우저가 이를 DOM에 반영하는 과정이 대상이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-dom-xss-stored)
