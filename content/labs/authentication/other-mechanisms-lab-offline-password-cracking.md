---
title: "Offline password cracking"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/other-mechanisms/lab-offline-password-cracking"
difficulty: Practitioner
note_kind: problem
---

# Offline password cracking

## 문제 조건

비밀번호 해시가 쿠키에 저장되고 댓글 기능에 XSS 취약점이 있다. 자신의 계정은 `wiener:peter`, 피해자 이름은 `carlos`다.

## 완료 조건

Carlos의 로그인 유지 쿠키에서 비밀번호를 알아내 로그인한 뒤 `My account`에서 그의 계정을 삭제한다.

## 문제 설명

브라우저 쿠키 노출과 오프라인 비밀번호 분석이 결합되는 상황을 다룬다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/other-mechanisms/lab-offline-password-cracking)
