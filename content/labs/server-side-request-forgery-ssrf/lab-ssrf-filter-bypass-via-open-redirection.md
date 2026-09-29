---
title: "SSRF with filter bypass via open redirection vulnerability"
tags:
  - portswigger
  - server-side-request-forgery-ssrf
lab_url: "https://portswigger.net/web-security/ssrf/lab-ssrf-filter-bypass-via-open-redirection"
difficulty: Practitioner
note_kind: problem
---

# SSRF with filter bypass via open redirection vulnerability

## 문제 조건

재고 확인 기능이 내부 데이터를 가져오지만 로컬 애플리케이션 접근만 허용한다. 애플리케이션에는 열린 리디렉션 취약점을 찾아야 한다는 조건이 있다.

## 완료 조건

`http://192.168.0.12:8080/admin`의 관리 화면에 접근해 `carlos`를 삭제한다.

## 문제 설명

허용된 로컬 요청의 이동 경로가 SSRF 범위에 영향을 주는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/ssrf/lab-ssrf-filter-bypass-via-open-redirection)
