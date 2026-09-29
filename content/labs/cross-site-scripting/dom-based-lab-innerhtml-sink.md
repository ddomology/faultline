---
title: "DOM XSS in innerHTML sink using source location.search"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-innerhtml-sink"
difficulty: Apprentice
note_kind: problem
---

# DOM XSS in innerHTML sink using source location.search

## 문제 조건과 설명

**주어진 조건**

블로그 검색 기능이 `location.search` 값을 사용해 `div` 요소의 `innerHTML`을 바꾼다.

**완료 조건**

DOM XSS로 `alert` 함수를 호출한다.

**문제 설명**

URL에서 온 데이터가 HTML 내용으로 해석되는 브라우저 측 흐름을 다룬다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-innerhtml-sink)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
