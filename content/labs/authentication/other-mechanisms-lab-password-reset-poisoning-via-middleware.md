---
title: "Password reset poisoning via middleware"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-reset-poisoning-via-middleware"
difficulty: Practitioner
note_kind: problem
---

# Password reset poisoning via middleware

## 문제 조건과 설명

**주어진 조건**

비밀번호 재설정 링크를 오염시킬 수 있다. `carlos`는 받은 이메일의 링크를 클릭한다. 자신의 계정은 `wiener:peter`이며 해당 계정 메일은 exploit server의 메일 클라이언트에서 읽을 수 있다.

**완료 조건**

Carlos의 계정에 로그인한다.

**문제 설명**

재설정 이메일에 들어갈 주소가 요청 처리 과정에서 어떻게 결정되는지 살펴본다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-reset-poisoning-via-middleware)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
