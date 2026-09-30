---
title: "OAuth account hijacking via redirect_uri"
tags:
  - portswigger
  - oauth-authentication
lab_url: "https://portswigger.net/web-security/oauth/lab-oauth-account-hijacking-via-redirect-uri"
difficulty: Practitioner
note_kind: problem
---

# OAuth account hijacking via redirect_uri

## 문제 조건과 설명

**주어진 조건**

사이트는 소셜 계정의 OAuth 로그인을 사용하고, OAuth 제공자의 설정 오류로 다른 사용자의 인가 코드가 새어 나올 수 있다. 관리자는 exploit server에서 보낸 내용을 열며 OAuth 서비스에 로그인된 상태다. 자신의 소셜 계정은 `wiener:peter`다.

**완료 조건**

관리자에게 발급된 인가 코드를 확보해 관리자 블로그 계정에 접근한 뒤 `carlos`를 삭제한다. 자신의 계정에서 코드를 받거나 관리자가 링크를 열었다는 사실만으로는 완료가 아니다.

**문제 설명과 판단 기준**

먼저 자신의 정상 OAuth 로그인에서 인가 요청의 `redirect_uri`, 코드가 돌아오는 위치, 블로그가 코드를 세션으로 교환하는 단계를 확인한다. 제공자가 등록된 목적지와 요청 목적지를 어떻게 비교하는지 살펴야 코드가 의도하지 않은 페이지로 전달될 가능성을 판단할 수 있다. 코드를 얻는 단계와 블로그가 그 코드를 관리자 세션으로 인정하는 단계도 구분한다.

관리자에게 전달한 URL의 결과와 수신된 코드를 확인한 뒤 실제 관리자 로그인·삭제 결과를 검증한다. 각 단계에서 어떤 브라우저와 계정이 요청했는지 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/oauth/lab-oauth-account-hijacking-via-redirect-uri)

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
