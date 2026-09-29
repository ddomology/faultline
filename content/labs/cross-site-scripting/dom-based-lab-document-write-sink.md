---
title: "DOM XSS in document.write sink using source location.search"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink"
difficulty: Apprentice
note_kind: problem
---

# DOM XSS in document.write sink using source location.search

## 문제 조건

검색어 추적 기능이 URL의 `location.search` 값을 `document.write`로 페이지에 쓴다.

## 완료 조건

DOM XSS로 `alert` 함수를 호출한다.

## 문제 설명

서버 응답보다 브라우저의 URL 값과 DOM 쓰기 동작이 연결되는 지점이 중요하다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink)
