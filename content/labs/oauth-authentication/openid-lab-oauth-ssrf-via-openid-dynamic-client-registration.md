---
title: "SSRF via OpenID dynamic client registration"
tags:
  - portswigger
  - oauth-authentication
lab_url: "https://portswigger.net/web-security/oauth/openid/lab-oauth-ssrf-via-openid-dynamic-client-registration"
difficulty: Practitioner
note_kind: problem
---

# SSRF via OpenID dynamic client registration

## 문제 조건과 설명

**주어진 조건**

OAuth 서비스의 동적 클라이언트 등록 과정에서 클라이언트별 데이터가 안전하지 않게 사용되어 SSRF 가능성이 있다. 개인 계정은 wiener:peter로 로그인하고, 외부 통신에는 Burp Collaborator의 기본 공개 서버를 사용해야 한다.

**완료 조건**

http://169.254.169.254/latest/meta-data/iam/security-credentials/admin/에 접근해 OAuth 제공자의 클라우드 secret access key를 탈취한다.

**문제 설명**

등록 데이터가 OAuth 서버의 요청 목적지에 영향을 줄 수 있는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/oauth/openid/lab-oauth-ssrf-via-openid-dynamic-client-registration)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
