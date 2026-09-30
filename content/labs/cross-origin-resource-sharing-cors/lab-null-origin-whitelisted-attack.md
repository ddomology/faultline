---
title: "CORS vulnerability with trusted null origin"
tags:
  - portswigger
  - cross-origin-resource-sharing-cors
lab_url: "https://portswigger.net/web-security/cors/lab-null-origin-whitelisted-attack"
difficulty: Apprentice
note_kind: problem
---

# CORS vulnerability with trusted null origin

## 문제 조건과 설명

**주어진 조건**

사이트의 CORS 설정은 `null` origin을 신뢰한다. 자기 계정은 `wiener:peter`이고 공격 JavaScript는 exploit server에 올린다. 일반적인 웹 출처와 달리 `null`은 브라우저의 특정 격리 문맥에서 나타날 수 있는 출처 값이다.

**완료 조건**

관리자의 API 키를 CORS를 통해 읽어 확보하고 실습에 제출한다. `Access-Control-Allow-Origin: null` 같은 응답을 보는 것과 관리자 브라우저에서 키를 읽는 것은 별도 검증 단계다.

**문제 설명과 판단 기준**

서버가 문자열 `null`을 허용하면 그 출처에서 실행되는 스크립트가 보호된 응답을 읽을 여지가 생긴다. 하지만 브라우저가 실제 요청에 어떤 `Origin`을 붙이는지, 인증된 요청의 응답 읽기를 허용하는지 확인해야 한다. 단순한 헤더 재전송 실험만으로 피해자 브라우저의 동작을 증명할 수 없다.

자기 계정에서 API 키 요청과 CORS 응답 헤더를 확인한다. 브라우저에서 `null` origin이 되는 문맥을 시험하고 exploit server에서 요청·응답 읽기 여부를 관찰한다. 관리자 계정의 값을 확보한 뒤 제출까지 확인한다. 아직 필요한 문맥이나 성공 결과는 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cors/lab-null-origin-whitelisted-attack)

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
