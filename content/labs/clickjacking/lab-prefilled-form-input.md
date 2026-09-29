---
title: "Clickjacking with form input data prefilled from a URL parameter"
tags:
  - portswigger
  - clickjacking
lab_url: "https://portswigger.net/web-security/clickjacking/lab-prefilled-form-input"
difficulty: Apprentice
note_kind: problem
---

# Clickjacking with form input data prefilled from a URL parameter

## 문제 조건

계정 페이지의 이메일 변경 양식을 URL 매개변수로 미리 채울 수 있다. 모의 사용자는 Chrome을 사용하며 자기 계정은 `wiener:peter`다.

## 완료 조건

계정 페이지를 프레임에 넣고 `Click me` 미끼를 눌러 사용자가 `Update email`을 실행하게 한다.

## 문제 설명

사용자 이메일 주소가 실제로 바뀌면 완료된다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/clickjacking/lab-prefilled-form-input)
