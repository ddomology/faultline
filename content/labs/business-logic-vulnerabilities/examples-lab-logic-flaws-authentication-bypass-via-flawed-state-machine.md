---
title: "Authentication bypass via flawed state machine"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-authentication-bypass-via-flawed-state-machine"
difficulty: Practitioner
note_kind: problem
---

# Authentication bypass via flawed state machine

## 문제 조건과 설명

**주어진 조건**

로그인 절차의 단계 순서에 관한 잘못된 가정이 인증 우회로 이어진다. 자신의 계정은 `wiener:peter`다. 로그인 중 어떤 단계에서 세션이 만들어지고 사용자가 확정되는지는 정상 흐름을 관찰해 파악해야 한다.

**완료 조건**

인증을 우회해 관리자 화면에 접근하고 `carlos`를 삭제한다. 로그인 과정의 한 화면을 건너뛰는 것과 관리자 세션을 얻는 것은 별도 단계다.

**문제 설명과 판단 기준**

제공된 계정으로 정상 로그인하며 각 요청과 세션 쿠키, 리디렉션을 순서대로 기록한다. 이후 다음 단계로 넘어가는 요청을 생략하거나 다른 순서로 보냈을 때 서버가 세션의 인증 상태를 어떻게 해석하는지 비교한다. 화면 흐름이 막혀 있어도 보호된 기능이 세션 상태를 다시 검증하는지 확인해야 한다.

관리자 인터페이스가 열린다면 실제 계정 권한을 확인하고 `carlos` 삭제 결과를 검증한다. 요청 순서와 각 시점의 세션 상태를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-authentication-bypass-via-flawed-state-machine)

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
