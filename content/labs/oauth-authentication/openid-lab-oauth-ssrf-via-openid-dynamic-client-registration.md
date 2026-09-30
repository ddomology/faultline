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

OAuth 서비스가 전용 엔드포인트에서 클라이언트 동적 등록을 허용하며, 등록 데이터의 일부를 안전하지 않게 사용해 SSRF 가능성이 생긴다. 자신의 계정은 `wiener:peter`다. 실습 방화벽 때문에 외부 통신 확인에는 Burp Collaborator의 기본 공개 서버를 사용해야 한다.

**완료 조건**

OAuth 제공자 서버에서 `http://169.254.169.254/latest/meta-data/iam/security-credentials/admin/`에 접근해 클라우드 환경의 secret access key를 얻는다. 등록 요청의 수락이나 외부 콜백 하나만으로는 목표 정보를 읽은 것이 아니다.

**문제 설명과 판단 기준**

먼저 정상 동적 등록 요청의 필드와 서버가 이후 어떤 클라이언트별 정보를 가져오는지 파악한다. 제어한 주소를 등록했을 때 OAuth 서비스가 서버 측에서 요청을 보내는지 제공된 관찰 수단으로 확인해야 한다. 브라우저가 주소를 여는 경우와 OAuth 제공자 서버가 여는 경우도 구별한다.

서버 측 요청이 확인되면 목표 메타데이터 경로의 응답을 얻을 수 있는지 살핀다. 어떤 등록 데이터가 목적지를 결정했고 어떤 응답에서 secret access key를 확인했는지 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/oauth/openid/lab-oauth-ssrf-via-openid-dynamic-client-registration)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
