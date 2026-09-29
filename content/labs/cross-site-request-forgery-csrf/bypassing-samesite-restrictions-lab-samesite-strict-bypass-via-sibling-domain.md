---
title: "SameSite Strict bypass via sibling domain"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-sibling-domain"
difficulty: Practitioner
note_kind: problem
---

# SameSite Strict bypass via sibling domain

## 문제 조건

실시간 채팅 기능에 CSWSH 취약점이 있고, 채팅 기록에는 로그인 인증 정보가 평문으로 들어 있다. 제공된 exploit server와 기본 Burp Collaborator 서버를 사용한다.

## 완료 조건

피해자의 채팅 기록을 외부로 가져와 인증 정보를 확인한 뒤 피해자 계정에 로그인한다.

## 문제 설명

문제 설명은 사전 학습으로 WebSocket 취약점 주제를 권장한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-sibling-domain)
