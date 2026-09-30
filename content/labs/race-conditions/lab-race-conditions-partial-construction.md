---
title: "Partial construction race conditions"
tags:
  - portswigger
  - race-conditions
lab_url: "https://portswigger.net/web-security/race-conditions/lab-race-conditions-partial-construction"
difficulty: Expert
note_kind: problem
---

# Partial construction race conditions

## 문제 조건과 설명

**주어진 조건**

회원가입 도중 계정이 완전히 만들어지기 전의 상태를 이용하는 경쟁 조건이 있다. 이로 인해 소유하지 않은 임의의 이메일 주소로 가입하면서 이메일 확인 절차를 우회할 수 있다. Burp Suite 2023.9 이상과 최신 Turbo Intruder 사용이 권장된다.

**완료 조건**

경쟁 조건을 이용해 계정을 만든 뒤 그 계정으로 로그인하고 `carlos`를 삭제한다. 가입 요청의 성공 응답만으로는 이메일 확인 우회나 관리자 작업 성공을 확인할 수 없다.

**문제 설명과 판단 기준**

정상 가입에서 이메일 확인 전후에 계정이 어떤 상태로 바뀌는지 먼저 관찰한다. 동시에 처리되는 요청이 아직 검증되지 않은 임시 계정을 사용할 수 있는지 비교하면 부분적으로 생성된 계정의 노출 구간을 좁힐 수 있다. 소유하지 않은 주소가 입력됐다는 사실과 그 주소로 실제 사용 가능한 계정이 만들어졌다는 사실은 구분한다.

가입 시점의 요청·응답, 로그인 가능 여부, 최종 `carlos` 삭제 결과를 아래에 순서대로 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/race-conditions/lab-race-conditions-partial-construction)

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
