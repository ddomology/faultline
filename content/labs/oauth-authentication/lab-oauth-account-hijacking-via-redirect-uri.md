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

OAuth 제공자의 설정 오류로 다른 사용자의 인가 코드가 노출될 수 있다. 관리자는 exploit server에서 보낸 내용을 열고 OAuth 서비스에 로그인된 상태다. 자신의 소셜 계정은 wiener:peter로 로그인한다.

**완료 조건**

관리자의 인가 코드를 얻어 계정에 접근한 뒤 carlos를 삭제한다.

**문제 설명**

OAuth 리디렉션 목적지 검증과 인가 코드 전달 범위를 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/oauth/lab-oauth-account-hijacking-via-redirect-uri)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
