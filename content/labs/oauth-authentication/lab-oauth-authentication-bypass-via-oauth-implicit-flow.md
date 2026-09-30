---
title: "Authentication bypass via OAuth implicit flow"
tags:
  - portswigger
  - oauth-authentication
lab_url: "https://portswigger.net/web-security/oauth/lab-oauth-authentication-bypass-via-oauth-implicit-flow"
difficulty: Apprentice
note_kind: problem
---

# Authentication bypass via OAuth implicit flow

## 문제 조건과 설명

**주어진 조건**

사이트는 소셜 미디어 계정의 OAuth 로그인을 사용하지만 클라이언트 애플리케이션의 검증이 잘못되어 다른 사용자 계정으로 로그인할 수 있다. 자신의 소셜 계정은 `wiener:peter`이고 Carlos의 이메일 주소는 `carlos@carlos-montoya.net`이다. Carlos의 비밀번호는 주어지지 않았다.

**완료 조건**

블로그 사이트에서 Carlos의 계정에 로그인한다. 소셜 제공자에서 자신의 계정으로 인증되는 것과 블로그가 Carlos로 세션을 만드는 것은 구별해야 한다.

**문제 설명과 판단 기준**

먼저 자신의 계정으로 OAuth 흐름을 따라가며 제공자에서 돌아오는 값과 클라이언트가 계정을 매핑하는 요청을 확인한다. 암묵적 흐름에서는 브라우저가 받은 정보가 클라이언트로 전달되므로, 클라이언트가 신뢰해야 할 토큰 검증과 사용자 식별 값의 연결을 살펴야 한다. 이메일 문자열을 바꾸는 것만으로 성공이라고 단정하지 않는다.

변경된 흐름 뒤 블로그의 세션과 계정 페이지가 실제 Carlos를 가리키는지 검증한다. 제공자 응답과 클라이언트 요청, 최종 계정 정보를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/oauth/lab-oauth-authentication-bypass-via-oauth-implicit-flow)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
