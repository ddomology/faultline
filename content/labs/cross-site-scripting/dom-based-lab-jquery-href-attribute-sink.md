---
title: "DOM XSS in jQuery anchor href attribute sink using location.search source"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-jquery-href-attribute-sink"
difficulty: Apprentice
note_kind: problem
---

# DOM XSS in jQuery anchor href attribute sink using location.search source

## 문제 조건과 설명

**주어진 조건**

피드백 제출 페이지가 jQuery의 `$` 선택자로 링크를 찾아 `location.search` 값으로 `href`를 변경한다.

**완료 조건**

`back` 링크를 통해 `document.cookie`를 경고창에 표시한다.

**문제 설명**

URL 값이 링크 목적지에 반영되는 DOM XSS 유형이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-jquery-href-attribute-sink)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
