---
title: "Single-endpoint race conditions"
tags:
  - portswigger
  - race-conditions
lab_url: "https://portswigger.net/web-security/race-conditions/lab-race-conditions-single-endpoint"
difficulty: Practitioner
note_kind: problem
---

# Single-endpoint race conditions

## 문제 조건

이메일 변경 기능에 경쟁 상태가 있어 소유하지 않은 주소를 계정에 연결할 수 있다. carlos@ginandjuice.shop에는 아직 가입하지 않은 관리자 초대가 걸려 있다. 개인 계정은 wiener:peter로 로그인하며 Burp Suite 2023.9 이상이 필요하다.

## 완료 조건

이메일을 carlos@ginandjuice.shop으로 바꿔 관리자 권한을 얻고 관리자 패널에서 carlos를 삭제한다.

## 문제 설명

이메일 확인과 계정 변경의 처리 순서를 살피는 문제다. @exploit-<YOUR-EXPLOIT-SERVER-ID>.exploit-server.net 주소의 메일을 확인할 수 있다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/race-conditions/lab-race-conditions-single-endpoint)
