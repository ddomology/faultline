---
title: "DOM XSS in document.write sink using source location.search inside a select element"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink-inside-select-element"
difficulty: Practitioner
note_kind: problem
---

# DOM XSS in document.write sink using source location.search inside a select element

## 문제 조건

재고 확인 페이지가 `location.search` 값을 `document.write`로 출력하고, 그 값은 `select` 요소 안에 놓인다.

## 완료 조건

`select` 요소 문맥을 벗어나 `alert` 함수를 호출한다.

## 문제 설명

URL 입력이 브라우저에서 특정 HTML 요소 내부로 쓰이는 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink-inside-select-element)
