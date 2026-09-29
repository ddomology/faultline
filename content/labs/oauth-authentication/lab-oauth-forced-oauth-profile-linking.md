---
title: "Forced OAuth profile linking"
tags:
  - portswigger
  - oauth-authentication
lab_url: "https://portswigger.net/web-security/oauth/lab-oauth-forced-oauth-profile-linking"
difficulty: Practitioner
note_kind: problem
---

# Forced OAuth profile linking

## 문제 조건

OAuth로 소셜 프로필을 계정에 연결할 수 있고, 클라이언트의 연결 과정이 안전하지 않다. 관리자는 exploit server에서 보낸 내용을 열고 블로그에 로그인된 상태다. 블로그 계정은 wiener:peter, 소셜 프로필은 peter.wiener:hotdog이다.

## 완료 조건

CSRF로 자신의 소셜 프로필을 관리자 계정에 연결한 뒤 관리자 패널에서 carlos를 삭제한다.

## 문제 설명

소셜 계정 연결 요청에 사용자 의도 확인이 충분한지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/oauth/lab-oauth-forced-oauth-profile-linking)
