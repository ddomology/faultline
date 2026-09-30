---
title: "Password reset broken logic"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-reset-broken-logic"
difficulty: Apprentice
note_kind: problem
---

# Password reset broken logic

## 문제 조건과 설명

**주어진 조건**

비밀번호 재설정 기능의 논리에 취약점이 있다. 자신의 계정 `wiener:peter`와 대상 사용자 이름 `carlos`가 제공된다. 재설정 링크·토큰·폼이 어느 계정에 묶이는지, 최종 변경 요청에서 대상 계정을 어떻게 결정하는지는 아직 확인되지 않았다.

**완료 조건**

Carlos의 비밀번호를 재설정한 뒤 새 비밀번호로 로그인하여 그의 `My account` 페이지에 접속한다. 재설정 요청을 보낸 것과 Carlos의 비밀번호가 실제로 변경된 것은 다르다.

**문제 설명과 판단 기준**

먼저 자신의 계정으로 정상 재설정 흐름을 따라가며 각 단계의 URL, 토큰, 사용자 식별 값과 응답을 기록한다. 특히 서버가 재설정 권한을 확인하는 값과 실제로 비밀번호를 바꾸는 대상 값이 일치하는지 살펴봐야 한다. 화면에 표시되는 이름만 바뀌는 경우와 서버의 대상 계정이 바뀌는 경우도 구분한다.

대상 계정과 재설정 권한의 연결에 결함이 있다는 근거가 확보되면 Carlos에 대한 변경 여부를 검증한다. 최종 판단은 새 자격 증명으로 로그인하고 Carlos의 계정 페이지를 확인하는 데 둔다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-reset-broken-logic)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
