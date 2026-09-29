---
title: "DOM XSS in jQuery selector sink using a hashchange event"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-jquery-selector-hash-change-event"
difficulty: Apprentice
note_kind: problem
---

# DOM XSS in jQuery selector sink using a hashchange event

## 문제 조건

홈페이지가 jQuery의 `$()` 선택자로 게시물을 찾아 자동 스크롤하며, 게시물 제목은 `location.hash`로 전달된다.

## 완료 조건

피해자 브라우저에서 `print()`를 호출하는 공격을 전달한다.

## 문제 설명

URL의 해시 값이 브라우저 측 선택자 처리에 쓰이는 상황이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-jquery-selector-hash-change-event)
