---
title: "Referer-based access control"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-referer-based-access-control"
difficulty: Practitioner
note_kind: problem
---

# Referer-based access control

## 문제 조건과 설명

**주어진 조건**

일부 관리자 기능의 접근 여부를 `Referer` 헤더에 의존해 결정한다. 관리자 계정은 `administrator:admin`, 일반 계정은 `wiener:peter`다.

**완료 조건**

`wiener`로 로그인해 자신의 권한을 관리자로 높인다.

**문제 설명**

요청 출처를 나타내는 헤더가 권한 증거로 신뢰될 수 있는지 다룬다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-referer-based-access-control)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
