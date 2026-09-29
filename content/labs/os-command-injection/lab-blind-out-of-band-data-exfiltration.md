---
title: "Blind OS command injection with out-of-band data exfiltration"
tags:
  - portswigger
  - os-command-injection
lab_url: "https://portswigger.net/web-security/os-command-injection/lab-blind-out-of-band-data-exfiltration"
difficulty: Practitioner
note_kind: problem
---

# Blind OS command injection with out-of-band data exfiltration

## 문제 조건

피드백 기능의 셸 명령은 비동기로 실행되며 응답과 접근 가능한 파일에 출력이 남지 않는다. 임의의 외부 시스템은 차단되므로 기본 공개 Burp Collaborator 서버를 사용해야 한다.

## 완료 조건

`whoami` 출력값을 DNS 질의로 외부에 전달한 뒤 현재 사용자 이름을 제출한다.

## 문제 설명

블라인드 명령 실행 결과를 외부 상호작용으로 수집하는 상황을 다룬다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/os-command-injection/lab-blind-out-of-band-data-exfiltration)
