---
title: "User role controlled by request parameter"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-user-role-controlled-by-request-parameter"
difficulty: Apprentice
note_kind: problem
---

# User role controlled by request parameter

## 문제 조건과 설명

**주어진 조건**

관리자 패널은 `/admin`에 있으며, 서버가 위조 가능한 쿠키를 이용해 관리자 여부를 판별한다. 일반 사용자 계정 `wiener:peter`가 제공된다. 어떤 쿠키의 어떤 값이 역할 판단에 쓰이는지는 실제 로그인 요청과 응답을 통해 확인해야 한다.

**완료 조건**

관리자 패널에 접근하고 그 기능으로 `carlos` 사용자를 삭제한다. 쿠키만 변경한 상태나 관리자 화면만 열린 상태는 최종 완료와 다르다.

**문제 설명과 판단 기준**

먼저 제공된 계정으로 로그인해 정상 세션의 쿠키와 `/admin` 접근 결과를 기준으로 잡는다. 이후 역할을 나타내는 것으로 보이는 요청 값을 따로 변경하고 같은 URL의 응답을 비교한다. 클라이언트가 자유롭게 보낼 수 있는 값에 서버의 권한 판정이 종속되는지가 핵심이다. 세션 자체의 무효화와 역할 값에 따른 응답 차이도 구분해야 한다.

관리 기능이 허용되면 사용자 목록에서 `carlos`를 확인한 뒤 삭제 결과를 검증한다. 어떤 쿠키를 바꾸었고 서버 응답이 어떻게 달라졌는지 아래 풀이 기록에 남긴다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-user-role-controlled-by-request-parameter)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
