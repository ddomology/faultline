---
title: "Password brute-force via password change"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-brute-force-via-password-change"
difficulty: Practitioner
note_kind: problem
---

# Password brute-force via password change

## 문제 조건과 설명

**주어진 조건**

비밀번호 변경 기능을 통해 기존 비밀번호를 반복 검증할 수 있는 취약점이 있다. 자신의 계정은 `wiener:peter`, 대상 사용자 이름은 `carlos`이며 후보 비밀번호 목록이 제공된다. 변경 요청의 사용자 식별 값과 현재 비밀번호 검사 결과가 어떻게 드러나는지는 확인해야 한다.

**완료 조건**

Carlos의 비밀번호를 알아내 그의 `My account` 페이지에 접근한다. 변경 요청의 응답이 달라진 것과 실제 Carlos 로그인 성공은 분리해 검증한다.

**문제 설명과 판단 기준**

먼저 자신의 계정에서 비밀번호 변경 폼의 필드와 정상·오류 응답을 관찰한다. 현재 비밀번호가 틀린 경우와 다른 입력 조건이 틀린 경우를 비교하면 어느 오류가 비밀번호 검증 결과를 반영하는지 판단할 수 있다. 요청이 어떤 사용자의 비밀번호를 확인하는지도 따로 확인해야 자신의 계정에 대한 검사 결과를 Carlos에게 잘못 적용하지 않는다.

후보 값 가운데 검증 근거가 있는 값을 찾았다면 Carlos로 로그인해 계정 페이지를 확인한다. 대상 사용자, 오류 차이, 최종 인증 결과를 아래 기록에 차례대로 남긴다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-brute-force-via-password-change)

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
