---
title: "Reflected DOM XSS"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-dom-xss-reflected"
difficulty: Practitioner
note_kind: problem
---

# Reflected DOM XSS

## 문제 조건과 설명

**주어진 조건**

요청 데이터가 서버에서 응답에 반사되고, 페이지 스크립트가 그 값을 다시 처리해 위험한 DOM 출력 지점에 쓴다.

**완료 조건**

주입을 통해 `alert()` 함수를 호출한다.

**문제 설명**

서버 반사와 브라우저의 후속 DOM 처리가 함께 취약점을 이룬다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-dom-xss-reflected)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
