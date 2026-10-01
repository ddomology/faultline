---
title: "Referer-based access control"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-referer-based-access-control"
difficulty: Practitioner
note_kind: problem
---

# Referer-based access control

## 문제 조건과 설명

**주어진 조건**

일부 관리자 기능의 접근 여부를 요청의 `Referer` 헤더로 판단한다. `administrator:admin` 계정으로 정상 관리자 요청을 관찰할 수 있고, 일반 계정 `wiener:peter`를 관리자로 승격해야 한다. 정상 요청의 헤더 값과 보호 대상 기능은 직접 확인해야 한다.

**완료 조건**

`wiener`로 로그인해 자신의 권한을 관리자로 바꾼다. 헤더를 붙여 요청이 허용된 것처럼 보이는 것과 계정 권한이 실제로 변경된 것은 구별한다.

**문제 설명과 판단 기준**

관리자 계정에서 역할 변경 기능의 요청을 확보하고, 일반 계정의 동일한 요청이 어떻게 거부되는지 비교한다. 그때 `Referer`의 유무와 값을 분리해서 살펴보면 서버가 세션의 역할 대신 클라이언트가 보낸 출처 문자열을 신뢰하는지 판단할 수 있다. `Referer`는 브라우저의 이동 맥락을 표현할 뿐 사용자 권한을 증명하지 않는다.

요청이 통과했다면 대상 사용자가 `wiener`인지 확인하고, 이후 계정 정보 또는 관리자 기능으로 권한 변경을 검증한다. 헤더 변화와 서버 상태 변화를 각각 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-referer-based-access-control)

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
