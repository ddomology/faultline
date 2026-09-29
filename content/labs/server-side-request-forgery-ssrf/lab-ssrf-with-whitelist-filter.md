---
title: "SSRF with whitelist-based input filter"
tags:
  - portswigger
  - server-side-request-forgery-ssrf
lab_url: "https://portswigger.net/web-security/ssrf/lab-ssrf-with-whitelist-filter"
difficulty: Expert
note_kind: problem
---

# SSRF with whitelist-based input filter

## 문제 조건과 설명

**주어진 조건**

재고 확인 기능이 내부 시스템에서 데이터를 가져온다. 개발자가 SSRF를 막기 위한 허용 목록 방식의 방어를 적용했다.

**완료 조건**

재고 확인 URL로 `http://localhost/admin`에 접근해 `carlos` 사용자를 삭제한다.

**문제 설명**

입력 URL이 허용 목록 검사를 거치는 SSRF 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/ssrf/lab-ssrf-with-whitelist-filter)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
