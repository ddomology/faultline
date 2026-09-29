---
title: "Blind OS command injection with out-of-band interaction"
tags:
  - portswigger
  - os-command-injection
lab_url: "https://portswigger.net/web-security/os-command-injection/lab-blind-out-of-band"
difficulty: Practitioner
note_kind: problem
---

# Blind OS command injection with out-of-band interaction

## 문제 조건

피드백 기능의 셸 명령은 비동기로 실행되어 응답에 영향을 주지 않는다. 읽을 수 있는 위치로 출력도 돌릴 수 없지만 외부 도메인으로 별도 상호작용을 만들 수 있다. 임의의 외부 시스템은 차단되므로 기본 공개 Burp Collaborator 서버를 사용해야 한다.

## 완료 조건

DNS 조회가 Burp Collaborator에 도달하게 한다.

## 문제 설명

응답이나 파일에서 결과를 볼 수 없는 명령 실행을 외부 DNS 상호작용으로 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/os-command-injection/lab-blind-out-of-band)
