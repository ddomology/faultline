---
title: "Basic SSRF against the local server"
tags:
  - portswigger
  - server-side-request-forgery-ssrf
lab_url: "https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-localhost"
difficulty: Apprentice
note_kind: problem
---

# Basic SSRF against the local server

## 문제 조건과 설명

**주어진 조건**

재고 확인 기능이 입력된 주소로 서버 측에서 요청을 보내 내부 시스템의 데이터를 가져온다. 목표 관리 화면의 주소는 `http://localhost/admin`으로 주어져 있다. 여기서 `localhost`는 공격자 컴퓨터가 아니라 재고 확인 요청을 수행하는 서버 기준이다.

**완료 조건**

재고 확인 URL을 이용해 내부 관리 화면에 접근하고 `carlos` 사용자를 삭제한다. 관리 화면 HTML을 읽는 것과 삭제 동작이 실제로 처리되는 것은 별도의 단계다.

**문제 설명과 판단 기준**

SSRF는 서버가 대신 요청하는 URL을 사용자가 바꿀 수 있을 때 신뢰 경계가 무너지는 문제다. 이 실습에서는 대상 호스트를 찾는 과정이 필요하지 않지만, 재고 확인 요청의 어느 필드가 URL을 결정하고 서버가 응답을 어떻게 돌려주는지는 살펴야 한다.

정상 재고 확인 요청의 URL 매개변수와 응답을 확인한다. 주어진 내부 주소로 바꾸었을 때 관리 화면 내용이 반환되는지 확인하고, 거기에 나타난 삭제 요청의 경로와 매개변수를 조사한다. 마지막에는 `carlos` 삭제가 실제로 처리됐는지 확인한다. 아직 요청 구조나 성공 결과는 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-localhost)

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
