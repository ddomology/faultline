---
title: "User ID controlled by request parameter"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter"
difficulty: Apprentice
note_kind: problem
---

# User ID controlled by request parameter

## 문제 조건과 설명

**주어진 조건**

사용자 계정 페이지에 수평적 권한 상승 취약점이 있다. 실습용 계정 `wiener:peter`로 로그인할 수 있다. 수평적 권한 상승은 관리자 권한을 얻는 것이 아니라, 같은 수준의 다른 사용자 데이터를 자신의 권한으로 조회하는 상황을 뜻한다.

**완료 조건**

`carlos`의 API 키를 얻어 제출한다. 다른 계정 페이지가 표시된다는 사실만으로는 키의 소유자를 확인했다고 할 수 없다.

**문제 설명과 판단 기준**

먼저 자신의 계정 페이지 요청에서 사용자 식별자가 URL이나 요청 값 중 어디에 실리는지 확인한다. 정상 응답에 나타나는 계정 이름과 API 키를 기준으로 잡고, 요청의 대상만 바꾸었을 때 어떤 정보가 반환되는지 비교한다. 서버가 로그인한 사용자와 요청 대상의 소유 관계를 검사하는지가 핵심이다.

응답에 `carlos`의 계정 정보와 API 키가 함께 나타나는지 확인한 후 제출 결과까지 기록한다. 키 값을 추측하거나 다른 응답의 값을 `carlos`의 것이라고 단정하지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter)

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
