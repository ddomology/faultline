---
title: "Inconsistent handling of exceptional input"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-inconsistent-handling-of-exceptional-input"
difficulty: Practitioner
note_kind: problem
---

# Inconsistent handling of exceptional input

## 문제 조건과 설명

**주어진 조건**

계정 등록 절차에서 예외적인 입력을 제대로 검증하지 않아 관리 기능에 접근할 수 있다. 어떤 필드와 입력 길이·형식이 문제를 일으키는지는 공식 조건에 적혀 있지 않다. 정상 등록과 특이한 입력의 저장·표시·권한 판정을 비교해야 한다.

**완료 조건**

관리자 패널에 접근해 `carlos` 사용자를 삭제한다. 가입 화면이 입력을 받아들이는 사실만으로 관리자 권한을 얻었다고 볼 수 없다.

**문제 설명과 판단 기준**

정상 계정 등록 흐름에서 이메일 등 계정 속성이 검증되고 저장되는 방식을 확인한다. 이후 경계 길이나 특이한 형식의 값을 보냈을 때 등록 응답, 프로필에 저장된 값, 권한 판단에 쓰이는 값이 서로 일치하는지 살핀다. 입력을 받는 계층과 이후 값을 소비하는 계층이 다르게 처리하면 예외적인 값에서 차이가 생길 수 있다.

차이가 확인되면 실제 관리자 기능에 접근할 수 있는지 검증하고, `carlos` 삭제 결과까지 확인한다. 요청 값과 저장·판정 결과를 나눠 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-inconsistent-handling-of-exceptional-input)

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
