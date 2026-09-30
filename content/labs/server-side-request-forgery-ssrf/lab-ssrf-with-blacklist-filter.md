---
title: "SSRF with blacklist-based input filter"
tags:
  - portswigger
  - server-side-request-forgery-ssrf
lab_url: "https://portswigger.net/web-security/ssrf/lab-ssrf-with-blacklist-filter"
difficulty: Practitioner
note_kind: problem
---

# SSRF with blacklist-based input filter

## 문제 조건과 설명

**주어진 조건**

재고 확인 기능이 서버 측에서 내부 데이터를 가져오며, 개발자는 약한 SSRF 방어 두 가지를 적용했다. 목표 관리 화면은 `http://localhost/admin`이다. 공식 설명은 두 방어의 정확한 검사 규칙을 공개하지 않는다.

**완료 조건**

재고 확인 URL에 대한 방어를 통과해 관리 화면에 접근하고 `carlos` 사용자를 삭제한다. 한 가지 필터를 피하거나 화면만 확인한 상태는 완료 조건과 다르다.

**문제 설명과 판단 기준**

블랙리스트 방식은 일부 문자열이나 주소 형식을 거절할 수 있지만, 서버가 실제로 해석하는 URL과 필터가 검사하는 문자열이 다를 수 있다. 그렇다고 특정 우회 표기를 미리 정하기보다 어떤 입력이 어느 단계에서 거절되는지 확인해야 한다. 필터 두 개의 효과를 혼동하지 않는 것도 중요하다.

정상 재고 확인 요청을 기준으로 URL의 호스트·경로를 하나씩 바꾸어 차단 반응을 기록한다. 통과한 입력이 실제로 어느 서버에 도착하는지 확인한 뒤 관리 화면의 삭제 동작을 검증한다. 아직 두 방어의 규칙이나 성공한 표기는 관찰되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/ssrf/lab-ssrf-with-blacklist-filter)

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
