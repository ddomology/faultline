---
title: "Stealing OAuth access tokens via an open redirect"
tags:
  - portswigger
  - oauth-authentication
lab_url: "https://portswigger.net/web-security/oauth/lab-oauth-stealing-oauth-access-tokens-via-an-open-redirect"
difficulty: Practitioner
note_kind: problem
---

# Stealing OAuth access tokens via an open redirect

## 문제 조건

OAuth 서비스의 검증 오류로 액세스 토큰이 클라이언트 애플리케이션의 임의 페이지에 유출될 수 있다. 관리자는 exploit server에서 보낸 내용을 열고 OAuth 서비스에 로그인된 상태다. 자신의 소셜 계정은 wiener:peter로 로그인한다.

## 완료 조건

블로그의 오픈 리디렉션을 찾아 관리자 토큰을 얻고 API key를 추출해 실습 배너로 제출한다.

## 문제 설명

클라이언트 앱에 로그인하는 것만으로는 관리자 API key를 볼 수 없으므로 토큰이 흘러가는 경로를 확인해야 한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/oauth/lab-oauth-stealing-oauth-access-tokens-via-an-open-redirect)
