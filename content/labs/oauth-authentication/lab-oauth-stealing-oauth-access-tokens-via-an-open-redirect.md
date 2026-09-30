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

## 문제 조건과 설명

**주어진 조건**

OAuth 서비스의 잘못된 검증으로 액세스 토큰을 블로그의 임의 페이지에 보낼 수 있다. 관리자는 exploit server에서 보낸 내용을 열며 OAuth 서비스에 로그인된 상태다. 자신의 소셜 계정은 `wiener:peter`다. 공식 설명은 블로그에서 오픈 리디렉션을 찾아 활용하라고 요구한다.

**완료 조건**

관리자의 액세스 토큰을 확보하고 그 토큰으로 관리자 API 키를 얻어 실습 배너의 제출 버튼으로 제출한다. 공식 조건상 블로그의 관리자 계정으로 로그인하는 것만으로 API 키를 볼 수 없다.

**문제 설명과 판단 기준**

자신의 OAuth 흐름에서 토큰이 전달되는 위치와 블로그가 이를 처리하는 방식을 확인한다. 블로그의 리디렉션 기능을 찾아, OAuth가 허용한 목적지에서 다른 주소로 이동할 때 토큰도 함께 전달되는지 검증해야 한다. 브라우저가 URL의 어느 부분을 서버에 보내는지와 어느 부분을 클라이언트에서 처리하는지도 구분한다.

관리자 브라우저에서 수신된 토큰이 실제 관리자 API에 접근하는지 확인하고 API 키의 출처와 제출 결과를 기록한다. 리디렉션 성공과 토큰 확보를 같은 결과로 취급하지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/oauth/lab-oauth-stealing-oauth-access-tokens-via-an-open-redirect)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
