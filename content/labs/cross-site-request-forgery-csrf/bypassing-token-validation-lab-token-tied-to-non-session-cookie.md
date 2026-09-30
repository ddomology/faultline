---
title: "CSRF where token is tied to non-session cookie"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-tied-to-non-session-cookie"
difficulty: Practitioner
note_kind: problem
---

# CSRF where token is tied to non-session cookie

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능의 CSRF 토큰은 세션 쿠키가 아닌 별도 쿠키에 연결되어 있지만, 사이트의 세션 처리와 완전히 통합되어 있지 않다. 제공된 계정은 `wiener:peter`와 `carlos:montoya`이고 공격 HTML은 exploit server에서 제공한다.

**완료 조건**

exploit server 페이지를 본 사람의 이메일 주소를 CSRF 요청으로 변경한다. 토큰과 별도 쿠키가 맞아 보이는 것만으로는 충분하지 않고, 그 요청이 피해자 세션의 이메일 변경으로 이어져야 한다.

**문제 설명과 판단 기준**

이 문제는 토큰 자체가 존재하지 않는 경우와 다르다. 검증에 쓰는 쿠키와 실제 로그인 세션 쿠키의 관계가 핵심이다. 두 계정을 이용하면 로그인 주체, 토큰, 별도 쿠키를 각각 구별해 어떤 조합이 서버에 받아들여지는지 조사할 수 있다. 그러나 쿠키를 공격자가 바꿀 수 있는 경로는 공식 설명에 나와 있지 않다.

정상 변경 요청에서 세션 쿠키와 다른 쿠키, 폼 토큰의 역할을 확인한다. 두 계정의 값을 하나씩 바꿔 요청 결과와 변경된 계정을 기록하고, 필요한 값이 피해자 브라우저에 어떻게 설정될 수 있는지 별도로 검증한다. 아직 성공 조합이나 쿠키 설정 경로는 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-tied-to-non-session-cookie)

## 탐색 및 풀이 기록

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->
