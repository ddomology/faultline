---
title: "User ID controlled by request parameter, with unpredictable user IDs"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-unpredictable-user-ids"
difficulty: Apprentice
note_kind: problem
---

# User ID controlled by request parameter, with unpredictable user IDs

## 문제 조건과 설명

**주어진 조건**

계정 페이지에 수평적 권한 상승 취약점이 있지만 사용자 식별자로 예측하기 어려운 GUID를 쓴다. 실습용 계정은 `wiener:peter`다. GUID를 알아내는 과정과, 알아낸 GUID로 다른 사람의 계정 정보에 접근할 수 있는지는 별개의 문제다.

**완료 조건**

`carlos`의 GUID를 찾고, 그의 API 키를 얻어 제출한다. GUID 발견만으로는 완료되지 않는다.

**문제 설명과 판단 기준**

자신의 계정 페이지 요청에서 GUID가 쓰이는 위치와 응답 구조를 먼저 확인한다. 그런 다음 애플리케이션의 공개 화면·링크·사용자 관련 응답에서 `carlos`와 연결된 식별자가 노출되는지 살핀다. 임의의 GUID를 추측하는 방식은 이 문제의 주어진 단서를 제대로 활용하지 못하며, 발견한 값이 실제로 `carlos`를 가리키는지도 확인해야 한다.

식별자를 찾았다면 계정 페이지의 대상만 바꾸어 API 키가 반환되는지 검사한다. 사용자 식별 근거, 요청 대상, 키가 표시된 응답과 제출 결과를 순서대로 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-unpredictable-user-ids)

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
