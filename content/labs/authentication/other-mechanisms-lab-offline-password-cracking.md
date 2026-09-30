---
title: "Offline password cracking"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/other-mechanisms/lab-offline-password-cracking"
difficulty: Practitioner
note_kind: problem
---

# Offline password cracking

## 문제 조건과 설명

**주어진 조건**

사용자 비밀번호 해시가 쿠키에 저장되며, 댓글 기능에는 XSS 취약점이 있다. 자신의 계정은 `wiener:peter`, 대상 사용자 이름은 `carlos`다. 문제는 쿠키를 얻는 과정과, 얻은 해시에서 비밀번호를 알아내는 과정을 결합한다.

**완료 조건**

Carlos의 로그인 유지 쿠키를 확보하고 비밀번호를 알아낸 뒤, Carlos로 로그인해 `My account` 페이지에서 그의 계정을 삭제한다. 쿠키를 얻거나 해시 형태를 알아낸 것만으로는 완료되지 않는다.

**문제 설명과 판단 기준**

먼저 자신의 로그인 유지 쿠키의 구조와 댓글이 다른 사용자에게 표시되는 방식을 관찰한다. XSS가 실행되는 위치와 브라우저가 해당 쿠키를 스크립트에 노출하는지 확인해야 쿠키 수집 가능성을 판단할 수 있다. 그다음 확보한 값에서 해시 부분을 식별하고, 비밀번호 후보를 오프라인에서 검증할 수 있는 형식인지 살핀다.

비밀번호로 판단한 값은 실제 Carlos 로그인으로 확인해야 한다. 마지막 계정 삭제까지 별도로 검증하고, 쿠키 획득·해시 분석·로그인·삭제의 근거를 단계별로 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/other-mechanisms/lab-offline-password-cracking)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
