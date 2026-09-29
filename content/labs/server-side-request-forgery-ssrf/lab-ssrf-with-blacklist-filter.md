---
title: "SSRF with blacklist-based input filter"
tags:
  - portswigger
  - server-side-request-forgery-ssrf
lab_url: "https://portswigger.net/web-security/ssrf/lab-ssrf-with-blacklist-filter"
difficulty: Practitioner
note_kind: problem
---

# SSRF with blacklist-based input filter

## 문제 조건과 설명

**주어진 조건**

재고 확인 기능이 내부 시스템에서 데이터를 가져온다. 개발자가 약한 SSRF 방어 두 가지를 적용했다.

**완료 조건**

재고 확인 URL을 이용해 `http://localhost/admin`에 접근하고 `carlos`를 삭제한다.

**문제 설명**

내부 관리 화면 접근 전에 입력 필터 조건을 통과해야 한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/ssrf/lab-ssrf-with-blacklist-filter)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
