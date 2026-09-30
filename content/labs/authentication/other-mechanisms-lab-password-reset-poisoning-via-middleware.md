---
title: "Password reset poisoning via middleware"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-reset-poisoning-via-middleware"
difficulty: Practitioner
note_kind: problem
---

# Password reset poisoning via middleware

## 문제 조건과 설명

**주어진 조건**

비밀번호 재설정 메일에 들어갈 링크를 오염시킬 수 있다. Carlos는 받은 이메일의 링크를 클릭하며, 자신의 계정 `wiener:peter`로 보낸 메일은 제공된 exploit server의 메일 클라이언트에서 읽을 수 있다. 어떤 요청 정보가 메일의 호스트나 경로에 반영되는지는 정상 재설정 흐름을 통해 확인해야 한다.

**완료 조건**

Carlos의 계정에 로그인한다. 재설정 메일의 링크가 달라지는 것만으로는 Carlos의 계정 접근이 입증되지 않는다.

**문제 설명과 판단 기준**

먼저 자신의 계정에 대한 재설정 요청과 수신 메일을 비교해 서버가 링크를 구성하는 방식을 확인한다. 이어 중간 계층이 전달하는 요청 정보와 애플리케이션이 신뢰하는 주소 정보가 다른지 살핀다. 수신자가 링크를 클릭했을 때 재설정 토큰 등 계정 접근에 필요한 값이 어디로 전달되는지도 실습에서 제공한 서버 안에서 확인해야 한다.

링크 오염, Carlos의 클릭으로 생긴 관찰 결과, 이후 비밀번호 재설정과 로그인 성공을 구분해 기록한다. 최종 응답에서 Carlos 계정으로 인증됐는지를 확인한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-reset-poisoning-via-middleware)

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
