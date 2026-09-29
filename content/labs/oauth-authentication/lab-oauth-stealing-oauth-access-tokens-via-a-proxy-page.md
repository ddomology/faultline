---
title: "Stealing OAuth access tokens via a proxy page"
tags:
  - portswigger
  - oauth-authentication
lab_url: "https://portswigger.net/web-security/oauth/lab-oauth-stealing-oauth-access-tokens-via-a-proxy-page"
difficulty: Expert
note_kind: problem
---

# Stealing OAuth access tokens via a proxy page

## 문제 조건

OAuth 서비스의 검증 오류로 액세스 토큰이 클라이언트 애플리케이션의 임의 페이지에 유출될 수 있다. 관리자는 exploit server에서 보낸 내용을 열고 OAuth 서비스에 로그인된 상태다. 자신의 소셜 계정은 wiener:peter로 로그인한다.

## 완료 조건

클라이언트 앱의 별도 취약점을 경유해 관리자 액세스 토큰과 API key를 얻고 실습 배너로 제출한다.

## 문제 설명

피해자 브라우저는 Chrome이므로 같은 브라우저 계열에서 동작을 확인하는 것이 권장된다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/oauth/lab-oauth-stealing-oauth-access-tokens-via-a-proxy-page)
