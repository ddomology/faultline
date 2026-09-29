---
title: "Basic clickjacking with CSRF token protection"
tags:
  - portswigger
  - clickjacking
lab_url: "https://portswigger.net/web-security/clickjacking/lab-basic-csrf-protected"
difficulty: Apprentice
note_kind: problem
---

# Basic clickjacking with CSRF token protection

## 문제 조건

로그인한 사용자의 계정 삭제 버튼은 CSRF 토큰으로 보호된다. 모의 사용자는 미끼 사이트의 `click` 문구를 누르며 Chrome을 사용한다. 자기 계정은 `wiener:peter`다.

## 완료 조건

계정 페이지를 프레임에 넣은 HTML로 사용자가 계정을 삭제하게 만든다.

## 문제 설명

완료는 실제 계정 삭제로 판정된다. 클릭 위치를 속여 보호된 버튼을 누르게 하는 유형이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/clickjacking/lab-basic-csrf-protected)
