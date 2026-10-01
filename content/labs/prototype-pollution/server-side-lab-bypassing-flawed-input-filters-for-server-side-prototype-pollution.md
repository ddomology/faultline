---
title: "Bypassing flawed input filters for server-side prototype pollution"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/server-side/lab-bypassing-flawed-input-filters-for-server-side-prototype-pollution"
difficulty: Practitioner
note_kind: problem
---

# Bypassing flawed input filters for server-side prototype pollution

## 문제 조건과 설명

**주어진 조건**

Node.js·Express 서버가 사용자 입력을 객체에 안전하지 않게 병합하며, 프로토타입 오염을 막는 입력 필터에도 결함이 있다. 자신의 계정은 `wiener:peter`다. 어떤 키 표현이 차단되고 병합 과정에서 어떻게 바뀌는지는 요청과 응답으로 확인해야 한다.

**완료 조건**

전역 `Object.prototype`에 속성을 추가할 소스와 권한 상승 가젯을 찾아 관리자 패널에 접근하고 `carlos`를 삭제한다. 필터 통과, 오염, 권한 변화는 각각 따로 검증해야 한다.

**문제 설명과 판단 기준**

정상 입력과 차단되는 입력을 비교해 필터가 적용되는 단계와 객체가 실제로 병합되는 단계를 구분한다. 필터가 검사한 표현과 병합 함수가 해석한 키 경로가 다르면 오염이 남을 수 있다. 우회가 되는지 무해한 속성으로 확인한 다음, 관리자 권한 판정에 쓰이는 상속 속성 가젯을 찾아야 한다.

서버가 불안정해질 수 있다는 공식 경고를 고려해 요청 결과를 단계별로 살핀다. 오염 근거, 관리자 접근, `carlos` 삭제를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/server-side/lab-bypassing-flawed-input-filters-for-server-side-prototype-pollution)

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
