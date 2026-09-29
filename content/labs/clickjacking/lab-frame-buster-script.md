---
title: "Clickjacking with a frame buster script"
tags:
  - portswigger
  - clickjacking
lab_url: "https://portswigger.net/web-security/clickjacking/lab-frame-buster-script"
difficulty: Apprentice
note_kind: problem
---

# Clickjacking with a frame buster script

## 문제 조건

사이트에 프레임 표시를 막는 frame buster 스크립트가 있다. 피해자는 Chrome을 사용하고 자기 계정은 `wiener:peter`다.

## 완료 조건

계정 페이지를 프레임에 표시한 뒤 `Click me` 클릭으로 사용자의 이메일 주소를 변경한다.

## 문제 설명

프레임 차단 장치가 있는 클릭재킹 조건이며 실제 이메일 변경으로 완료된다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/clickjacking/lab-frame-buster-script)
