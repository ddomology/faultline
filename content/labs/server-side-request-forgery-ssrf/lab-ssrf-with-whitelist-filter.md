---
title: "SSRF with whitelist-based input filter"
tags:
  - portswigger
  - server-side-request-forgery-ssrf
lab_url: "https://portswigger.net/web-security/ssrf/lab-ssrf-with-whitelist-filter"
difficulty: Expert
note_kind: problem
---

# SSRF with whitelist-based input filter

## 문제 조건과 설명

**주어진 조건**

재고 확인 기능이 서버 측에서 내부 시스템의 데이터를 가져오지만, 개발자가 SSRF 방어를 위해 허용 목록을 적용했다. 목표 관리 화면은 `http://localhost/admin`이다. 허용 목록이 URL의 어느 부분을 어떻게 검사하는지는 공식 설명에 나오지 않는다.

**완료 조건**

허용 목록 검사를 통과한 요청으로 내부 관리 화면에 접근하고 `carlos` 사용자를 삭제한다. 필터가 요청을 수락한 것과 서버가 의도한 관리 주소에 도착한 것은 따로 확인해야 한다.

**문제 설명과 판단 기준**

허용 목록은 신뢰하는 주소만 통과시키려는 방어다. 그런데 입력 검증과 실제 URL 파싱 사이에 차이가 있으면 검사 시 보인 목적지와 요청이 도착한 목적지가 달라질 수 있다. 구체적인 차이는 관찰 전에는 정할 수 없으므로, 거절 메시지와 실제 응답을 바탕으로 규칙을 좁혀 가야 한다.

정상 재고 확인 요청에서 허용되는 URL의 형태를 찾는다. 호스트·포트·경로 등 구성 요소를 하나씩 바꾸어 검증 단계와 서버 요청 결과를 비교한 뒤, 관리 화면과 삭제 동작을 확인한다. 아직 허용 규칙이나 성공한 입력은 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/ssrf/lab-ssrf-with-whitelist-filter)

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
