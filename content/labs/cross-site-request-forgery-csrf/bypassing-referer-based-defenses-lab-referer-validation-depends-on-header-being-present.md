---
title: "CSRF where Referer validation depends on header being present"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-referer-based-defenses/lab-referer-validation-depends-on-header-being-present"
difficulty: Practitioner
note_kind: problem
---

# CSRF where Referer validation depends on header being present

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능이 교차 도메인 요청을 막으려 하지만 안전하지 않은 대체 처리가 있다. 문제 제목에 따르면 `Referer` 헤더 유무가 검증에 영향을 준다. 자신의 계정은 `wiener:peter`다.

**완료 조건**

exploit server의 HTML로 방문자의 이메일 주소를 변경한다.

**문제 설명**

`Referer` 검사 조건이 요청마다 동일하게 적용되지 않는 상황이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-referer-based-defenses/lab-referer-validation-depends-on-header-being-present)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
