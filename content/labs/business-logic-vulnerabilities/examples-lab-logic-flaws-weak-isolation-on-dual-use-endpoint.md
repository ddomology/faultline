---
title: "Weak isolation on dual-use endpoint"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-weak-isolation-on-dual-use-endpoint"
difficulty: Practitioner
note_kind: problem
---

# Weak isolation on dual-use endpoint

## 문제 조건과 설명

**주어진 조건**

계정 관리 기능이 사용자의 입력을 보고 권한 수준을 잘못 가정하여 다른 사용자 계정에 접근할 수 있다. 자신의 계정은 `wiener:peter`다. 하나의 기능이 일반 사용자와 관리자 작업에 함께 쓰이는지, 어떤 입력이 동작을 바꾸는지는 관찰해야 한다.

**완료 조건**

`administrator` 계정에 접근하고 `carlos` 사용자를 삭제한다. 자신의 계정 설정을 바꾼 결과와 관리자 계정으로 인증된 결과는 다르다.

**문제 설명과 판단 기준**

먼저 자신의 계정 관리 요청에서 사용자 식별 값과 현재 권한 확인이 이루어지는 위치를 파악한다. 같은 요청 지점이 계정 조회·수정 등 여러 용도로 사용된다면, 입력 조합에 따라 서버가 어떤 사용자와 권한을 선택하는지 비교한다. 화면에서 숨긴 관리 기능이라도 서버가 요청자의 실제 세션과 대상 계정을 분리해 검사하는지가 핵심이다.

관리자 계정에 접근했다는 근거를 계정 정보나 관리 기능으로 확인한 뒤 삭제 결과를 검증한다. 각 입력이 누구의 계정에 영향을 주었는지 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-weak-isolation-on-dual-use-endpoint)

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
