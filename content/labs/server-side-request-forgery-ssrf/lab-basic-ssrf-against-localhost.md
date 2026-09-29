---
title: "Basic SSRF against the local server"
tags:
  - portswigger
  - server-side-request-forgery-ssrf
lab_url: "https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-localhost"
difficulty: Apprentice
note_kind: problem
---

# Basic SSRF against the local server

## 문제 조건

재고 확인 기능이 내부 시스템에서 데이터를 가져온다.

## 완료 조건

재고 확인 URL로 `http://localhost/admin`의 관리 화면에 접근해 `carlos` 사용자를 삭제한다.

## 문제 설명

서버가 내부 주소를 대신 요청하는 SSRF 상황이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-localhost)
