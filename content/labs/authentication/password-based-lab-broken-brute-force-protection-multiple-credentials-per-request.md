---
title: "Broken brute-force protection, multiple credentials per request"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/password-based/lab-broken-brute-force-protection-multiple-credentials-per-request"
difficulty: Expert
note_kind: problem
---

# Broken brute-force protection, multiple credentials per request

## 문제 조건과 설명

**주어진 조건**

비밀번호 무차별 대입 방어에 논리적 결함이 있다. 대상 사용자 이름 `carlos`와 후보 비밀번호 목록이 제공된다. 제목은 한 요청에 여러 자격 증명을 담는 경우를 탐색 단서로 주지만, 서버가 어떤 입력 구조를 받아들이는지는 실제 요청으로 확인해야 한다.

**완료 조건**

Carlos의 비밀번호를 찾아 그의 계정 페이지에 접근한다. 한 요청이 차단되지 않았거나 오류가 달라진 사실만으로는 성공을 판단할 수 없다.

**문제 설명과 판단 기준**

정상 로그인 요청의 매개변수 형식과 실패 응답, 시도 제한이 적용되는 단위를 먼저 파악한다. 이후 한 요청 안에 여러 비밀번호 후보를 표현했을 때 서버가 이를 어떻게 해석하고, 제한 횟수를 요청 단위와 개별 자격 증명 단위 중 어디에 반영하는지 비교한다. 입력 파서가 후보를 모두 검사하는지, 하나만 선택하는지도 결과로 확인해야 한다.

성공으로 보이는 응답이 나온다면 어떤 후보가 유효했는지 확인하고 Carlos 계정 페이지 접근으로 검증한다. 요청 형식과 제한 상태, 인증 결과를 분리해 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/password-based/lab-broken-brute-force-protection-multiple-credentials-per-request)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
