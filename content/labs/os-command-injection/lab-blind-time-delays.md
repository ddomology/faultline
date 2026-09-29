---
title: "Blind OS command injection with time delays"
tags:
  - portswigger
  - os-command-injection
lab_url: "https://portswigger.net/web-security/os-command-injection/lab-blind-time-delays"
difficulty: Practitioner
note_kind: problem
---

# Blind OS command injection with time delays

## 문제 조건

피드백 기능이 사용자 입력을 포함한 셸 명령을 실행하지만 출력은 HTTP 응답에 나타나지 않는다.

## 완료 조건

명령 실행을 통해 응답에 10초 지연을 만든다.

## 문제 설명

출력을 직접 볼 수 없을 때 실행 여부를 시간 변화로 판단하는 블라인드 명령 주입 실습이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/os-command-injection/lab-blind-time-delays)
