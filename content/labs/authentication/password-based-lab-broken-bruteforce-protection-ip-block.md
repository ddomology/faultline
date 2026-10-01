---
title: "Broken brute-force protection, IP block"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/password-based/lab-broken-bruteforce-protection-ip-block"
difficulty: Practitioner
note_kind: problem
---

# Broken brute-force protection, IP block

## 문제 조건과 설명

**주어진 조건**

비밀번호 무차별 대입을 막기 위해 IP 차단을 사용하지만 그 상태 관리에 논리적 결함이 있다. 자신의 계정 `wiener:peter`, 대상 사용자 이름 `carlos`, 후보 비밀번호 목록이 제공된다. 정확한 차단 임계값과 해제 조건은 요청 결과로 알아봐야 한다.

**완료 조건**

Carlos의 비밀번호를 알아내 로그인하고 그의 계정 페이지에 접속한다. 차단을 한 번 피한 것과 올바른 비밀번호를 찾은 것은 다른 성과다.

**문제 설명과 판단 기준**

먼저 잘못된 로그인 시도에 따라 응답과 차단 상태가 어떻게 변하는지 제한된 횟수로 관찰한다. 자신의 정상 로그인과 Carlos에 대한 실패 요청을 비교하면 성공·실패·차단 사이에 상태가 어떻게 갱신되는지 추정할 수 있다. 단순히 요청 간격을 늘리는 방식이 아니라 어떤 사건이 IP의 실패 횟수나 차단 상태에 영향을 주는지가 핵심이다.

방어 로직의 변화가 확인되면 제공된 비밀번호 후보를 그 조건에 맞춰 확인한다. 성공으로 보이는 응답 후 Carlos 계정 페이지가 열리는지 검증하고, 차단·해제 판단의 근거를 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/password-based/lab-broken-bruteforce-protection-ip-block)

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
