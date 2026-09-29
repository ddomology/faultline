---
title: "User ID controlled by request parameter with password disclosure"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-password-disclosure"
difficulty: Apprentice
note_kind: problem
---

# User ID controlled by request parameter with password disclosure

## 문제 조건

계정 페이지의 마스킹된 입력 칸에 현재 비밀번호가 미리 채워진다. 제공된 계정은 `wiener:peter`다.

## 완료 조건

`administrator`의 비밀번호를 얻어 로그인한 뒤 `carlos` 사용자를 삭제한다.

## 문제 설명

비밀번호를 화면에 숨겨 표시하더라도 응답 데이터로 노출될 수 있는지를 다룬다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-password-disclosure)
