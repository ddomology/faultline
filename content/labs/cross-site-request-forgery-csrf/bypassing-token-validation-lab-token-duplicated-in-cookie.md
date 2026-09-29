---
title: "CSRF where token is duplicated in cookie"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-duplicated-in-cookie"
difficulty: Practitioner
note_kind: problem
---

# CSRF where token is duplicated in cookie

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능은 안전하지 않은 `double submit` 방식으로 CSRF를 막으려 한다. 자신의 계정 `wiener:peter`로 정상 요청을 확인할 수 있으며, 공격 페이지는 exploit server에 올려야 한다.

**완료 조건**

exploit server 페이지를 방문한 사람의 이메일 주소를 변경한다. 두 위치의 토큰을 같게 만든 요청이 서버에 받아들여지는지와 실제 피해자 계정이 변경되었는지를 모두 확인해야 한다.

**문제 설명과 판단 기준**

`double submit`은 보통 요청 매개변수와 쿠키에 있는 값을 비교한다. 값의 일치만 확인하고 사용자 세션과의 결합을 검사하지 않으면 방어가 약해질 수 있다. 다만 이 실습에서 어떤 쿠키와 필드를 비교하고, 공격자가 쿠키를 바꿀 수 있는지는 제목만으로 확정할 수 없다.

먼저 자기 계정의 정상 이메일 변경 요청에서 쿠키와 폼 값을 수집한다. 두 값의 일치 여부를 독립적으로 바꿔 서버 응답과 계정 상태를 비교하고, 쿠키가 설정되는 경로도 살펴본다. 검증된 조건만 exploit server의 HTML에 옮긴다. 아직 수용된 조합이나 피해자 대상 결과는 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-duplicated-in-cookie)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
