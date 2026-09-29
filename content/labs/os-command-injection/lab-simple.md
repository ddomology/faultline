---
title: "OS command injection, simple case"
tags:
  - portswigger
  - os-command-injection
lab_url: "https://portswigger.net/web-security/os-command-injection/lab-simple"
difficulty: Apprentice
note_kind: problem
---

# OS command injection, simple case

## 문제 조건

상품 재고 확인 기능이 입력받은 상품·매장 ID를 포함한 셸 명령을 실행하고 실행 결과를 응답에 그대로 표시한다.

## 완료 조건

`whoami` 명령을 실행해 현재 OS 사용자 이름을 확인한다.

## 문제 설명

재고 조회 입력이 운영체제 명령에 섞일 때 명령 결과가 화면으로 반환되는 상황을 다룬다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/os-command-injection/lab-simple)
