---
title: "CSRF with broken Referer validation"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-referer-based-defenses/lab-referer-validation-broken"
difficulty: Practitioner
note_kind: problem
---

# CSRF with broken Referer validation

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능은 교차 도메인 요청을 탐지·차단하려 하지만 `Referer` 검사가 우회될 수 있다. 자신의 계정은 `wiener:peter`다.

**완료 조건**

exploit server의 HTML로 방문자의 이메일 주소를 변경한다.

**문제 설명**

출처를 가리는 헤더 검사만으로 이메일 변경 요청을 보호하는 조건을 다룬다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-referer-based-defenses/lab-referer-validation-broken)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
