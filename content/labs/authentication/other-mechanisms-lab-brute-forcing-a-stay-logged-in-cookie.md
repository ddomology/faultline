---
title: "Brute-forcing a stay-logged-in cookie"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/other-mechanisms/lab-brute-forcing-a-stay-logged-in-cookie"
difficulty: Practitioner
note_kind: problem
---

# Brute-forcing a stay-logged-in cookie

## 문제 조건과 설명

**주어진 조건**

브라우저 세션이 끝난 뒤에도 로그인을 유지하는 쿠키가 있고, 그 값은 무차별 대입에 취약하다. 자신의 계정 `wiener:peter`, 대상 사용자 이름 `carlos`, 후보 비밀번호 목록이 제공된다. 쿠키의 실제 형식과 비밀번호가 값에 어떻게 반영되는지는 아직 확인되지 않았다.

**완료 조건**

Carlos의 로그인 유지 쿠키 값을 찾아 그의 `My account` 페이지에 접근한다. 쿠키 후보를 만들 수 있다는 사실과 서버가 그 쿠키를 Carlos의 것으로 받아들이는 것은 별개의 단계다.

**문제 설명과 판단 기준**

자신의 계정에서 로그인 유지 기능을 선택했을 때의 응답과 쿠키를 먼저 확인한다. 세션 쿠키와 장기 로그인 쿠키를 구분하고, 쿠키 값의 구조가 사용자 이름이나 비밀번호 후보와 어떤 관계를 갖는지 관찰한다. 형식이 확인되면 후보 값에 대한 서버 반응을 비교해 올바른 쿠키를 식별할 수 있는지 살핀다.

로그인 실패 응답, 일반 계정 세션, Carlos 계정 접근을 구별해야 한다. 최종 판단은 Carlos의 계정 페이지 내용으로 하고, 쿠키 구조를 추정한 근거와 검증 결과를 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/other-mechanisms/lab-brute-forcing-a-stay-logged-in-cookie)

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

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
