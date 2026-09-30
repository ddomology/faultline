---
title: "CORS vulnerability with basic origin reflection"
tags:
  - portswigger
  - cross-origin-resource-sharing-cors
lab_url: "https://portswigger.net/web-security/cors/lab-basic-origin-reflection-attack"
difficulty: Apprentice
note_kind: problem
---

# CORS vulnerability with basic origin reflection

## 문제 조건과 설명

**주어진 조건**

사이트의 CORS 설정이 모든 origin을 신뢰한다. 자기 계정 `wiener:peter`로 로그인해 관련 API 요청을 관찰할 수 있다. 공격 JavaScript는 제공된 exploit server에 올려야 한다.

**완료 조건**

교차 출처 요청으로 관리자의 API 키를 읽어 확보한 뒤 그 값을 실습에 제출한다. 내 계정의 키를 읽거나 요청이 전송되는 것만으로는 관리자 키 제출이라는 목표를 충족하지 않는다.

**문제 설명과 판단 기준**

CORS는 서버가 브라우저에 어느 출처의 스크립트가 응답을 읽어도 되는지 알려 주는 정책이다. 모든 origin을 신뢰한다는 조건이 있어도 보호된 API 응답을 읽으려면 실제 응답 헤더와 인증 정보가 포함된 요청의 동작을 확인해야 한다. 요청 성공과 브라우저 JavaScript의 응답 읽기 가능 여부는 구분한다.

자기 계정에서 API 키가 제공되는 요청과 응답을 찾고, 다른 `Origin` 값을 보냈을 때 CORS 헤더가 어떻게 달라지는지 기록한다. exploit server 페이지에서 브라우저가 응답 본문을 읽는지 검증한 다음, 관리자 방문 시 받은 키를 구별해 제출한다. 아직 API 경로나 관리자 데이터는 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cors/lab-basic-origin-reflection-attack)

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
