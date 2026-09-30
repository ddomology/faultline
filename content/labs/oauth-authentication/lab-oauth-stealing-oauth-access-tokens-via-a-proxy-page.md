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

## 문제 조건과 설명

**주어진 조건**

OAuth 서비스가 액세스 토큰을 블로그의 임의 페이지에 보낼 수 있게 허용한다. 관리자에게는 exploit server의 페이지를 열게 할 수 있고 관리자는 OAuth 서비스에 로그인되어 있다. 자신의 소셜 계정은 `wiener:peter`다. 이번 문제는 블로그의 별도 취약점을 ‘프록시’로 써야 하며, 피해자가 Chrome을 사용하므로 같은 브라우저 계열에서 시험하는 것이 권장된다.

**완료 조건**

관리자 액세스 토큰으로 관리자 API 키를 얻어 실습 배너로 제출한다. 토큰이 블로그 안의 페이지에 도달하는 것과 공격자가 그 토큰을 읽을 수 있는 것은 서로 다른 조건이다.

**문제 설명과 판단 기준**

먼저 자신의 OAuth 요청에서 토큰이 어느 페이지에 전달되는지 파악한다. 그다음 블로그의 기능 중 해당 페이지를 거쳐 다른 곳으로 응답 내용이나 브라우저 상태를 전달할 수 있는 취약점을 찾는다. 같은 출처 안에 토큰이 있어도 별도 취약점 없이는 외부 페이지가 읽지 못할 수 있으므로, 실제 정보 이동 경로를 확인해야 한다.

Chrome에서 관리자 브라우저와 같은 조건으로 동작을 검증하고, 토큰 수신·API 키 조회·제출 결과를 각각 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/oauth/lab-oauth-stealing-oauth-access-tokens-via-a-proxy-page)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
