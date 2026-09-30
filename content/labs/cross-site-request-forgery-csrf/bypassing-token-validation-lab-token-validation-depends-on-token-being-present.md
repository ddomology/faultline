---
title: "CSRF where token validation depends on token being present"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-validation-depends-on-token-being-present"
difficulty: Practitioner
note_kind: problem
---

# CSRF where token validation depends on token being present

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능에 CSRF 취약점이 있다. 문제 제목은 토큰 검증이 토큰의 존재 여부에 좌우된다고 알려 준다. 정상 요청을 관찰할 자기 계정은 `wiener:peter`이며, 공격 HTML은 제공된 exploit server에 올려야 한다.

**완료 조건**

exploit server 페이지를 방문한 사람의 이메일 주소를 CSRF 요청으로 변경한다. 토큰이 없는 요청의 응답 코드만 보고 성공했다고 판단하지 않고, 실제 계정 상태가 바뀌었는지 확인해야 한다.

**문제 설명과 판단 기준**

토큰이 제출되었을 때만 유효성을 검사한다면, 서버가 토큰 자체를 필수로 요구하는지 따로 살펴야 한다. 다만 제목은 검증의 약점을 가리킬 뿐, 토큰을 생략한 어떤 요청이 통과하는지와 필요한 필드가 무엇인지까지 알려 주지는 않는다.

먼저 자기 계정에서 정상 이메일 변경 요청을 캡처해 메서드·매개변수·토큰 위치를 기록한다. 이어 같은 요청에서 토큰을 바꾸거나 빼 보며 응답과 이메일 변경 결과를 비교한다. 확인된 동작을 토대로 exploit server의 HTML을 작성하고 피해자 방문 시 결과를 검증한다. 아직 통과한 요청이나 완료 결과는 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-validation-depends-on-token-being-present)

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
