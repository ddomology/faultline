---
title: "User ID controlled by request parameter with password disclosure"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-password-disclosure"
difficulty: Apprentice
note_kind: problem
---

# User ID controlled by request parameter with password disclosure

## 문제 조건과 설명

**주어진 조건**

계정 페이지에는 현재 사용자의 기존 비밀번호가 마스킹된 입력 칸에 미리 채워진다. 일반 계정 `wiener:peter`로 로그인할 수 있다. 마스킹은 화면 표시 방식일 뿐, 응답에 실제 값이 들어 있는지는 별도로 확인해야 한다.

**완료 조건**

`administrator` 계정의 비밀번호를 알아내 그 계정으로 로그인하고 `carlos` 사용자를 삭제한다. 비밀번호의 노출, 관리자 로그인, 사용자 삭제는 각각 확인할 단계다.

**문제 설명과 판단 기준**

먼저 자신의 계정 페이지에서 비밀번호 입력 요소의 표시와 HTML 응답을 비교해 값이 실제로 전송되는지 확인한다. 이어 요청이 어느 사용자의 계정 페이지를 가져오는지 조사하고, 다른 사용자의 페이지를 요청할 수 있는지 살펴본다. 관리자 페이지의 비밀번호 필드가 반환되더라도 값의 소유자와 출처를 응답에서 검증해야 한다.

관리자 자격 증명을 얻은 뒤에는 실제 로그인 성공 여부와 `carlos` 삭제 결과를 각각 확인한다. 민감한 값 자체를 노트에 옮기기보다 탐색 근거와 요청·응답의 관계를 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-password-disclosure)

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
