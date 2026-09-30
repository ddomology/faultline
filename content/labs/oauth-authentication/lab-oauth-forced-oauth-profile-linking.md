---
title: "Forced OAuth profile linking"
tags:
  - portswigger
  - oauth-authentication
lab_url: "https://portswigger.net/web-security/oauth/lab-oauth-forced-oauth-profile-linking"
difficulty: Practitioner
note_kind: problem
---

# Forced OAuth profile linking

## 문제 조건과 설명

**주어진 조건**

블로그 계정에 소셜 프로필을 연결하면 이후 OAuth로 로그인할 수 있다. 클라이언트의 연결 흐름이 안전하지 않으며, 관리자는 블로그에 로그인된 상태로 exploit server가 보낸 내용을 열어 본다. 자신의 블로그 계정은 `wiener:peter`, 소셜 프로필은 `peter.wiener:hotdog`다.

**완료 조건**

CSRF를 이용해 자신의 소셜 프로필을 관리자 블로그 계정에 연결한 뒤 관리자 패널에 접근해 `carlos`를 삭제한다. 관리자가 페이지를 열었다는 사실과 연결이 실제로 완료된 결과는 다르다.

**문제 설명과 판단 기준**

먼저 자신의 두 계정으로 정상 소셜 프로필 연결 요청과 OAuth 콜백의 순서를 확인한다. 연결 요청에 사용자 의도를 증명하는 값이 있는지, 어떤 단계에서 현재 로그인된 블로그 계정과 소셜 프로필이 결합되는지 살핀다. 관리자에게 전달할 페이지는 제공된 exploit server에서 열리지만, 공격자의 브라우저와 관리자의 블로그 세션을 혼동하면 결과를 잘못 해석할 수 있다.

관리자 쪽 연결이 확인되면 자신의 소셜 프로필로 블로그에 로그인해 관리자 권한과 `carlos` 삭제를 검증한다. 연결·로그인·삭제의 근거를 각각 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/oauth/lab-oauth-forced-oauth-profile-linking)

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
