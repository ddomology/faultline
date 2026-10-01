---
title: "Single-endpoint race conditions"
tags:
  - portswigger
  - race-conditions
lab_url: "https://portswigger.net/web-security/race-conditions/lab-race-conditions-single-endpoint"
difficulty: Practitioner
note_kind: problem
---

# Single-endpoint race conditions

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능의 경쟁 조건으로 임의 주소를 자신의 계정에 연결할 수 있다. `carlos@ginandjuice.shop`에는 사이트 관리자 초대가 대기 중이며, 해당 주소를 차지한 사용자는 관리자 권한을 받는다. 계정 `wiener:peter`와 실습용 이메일 클라이언트가 제공되고 Burp Suite 2023.9 이상이 필요하다.

**완료 조건**

경쟁 조건을 이용해 자신의 이메일을 `carlos@ginandjuice.shop`으로 변경하고 관리자 패널에서 `carlos`를 삭제한다. 이메일 변경 요청의 접수와 관리자 권한 획득은 별도로 확인해야 한다.

**문제 설명과 판단 기준**

정상 이메일 변경에서 주소의 소유 확인과 계정 정보 갱신이 어느 시점에 이루어지는지 살핀다. 실습용 `@exploit-<YOUR-EXPLOIT-SERVER-ID>.exploit-server.net` 주소로 받은 메일은 확인 절차를 관찰하는 기준이 된다. 겹치는 요청으로 확인 단계와 최종 연결 주소가 달라질 가능성을 검증하되, 화면 표시만 보지 말고 계정에 저장된 주소를 확인한다.

주소 연결, 권한 변화, `carlos` 삭제 결과를 순서대로 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/race-conditions/lab-race-conditions-single-endpoint)

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
