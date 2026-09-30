---
title: "Username enumeration via account lock"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-account-lock"
difficulty: Practitioner
note_kind: problem
---

# Username enumeration via account lock

## 문제 조건과 설명

**주어진 조건**

로그인 기능은 계정 잠금을 사용하지만 그 논리에 결함이 있어 사용자 이름을 열거할 수 있다. 공식 문제는 후보 사용자 이름과 비밀번호 목록을 제공한다. 잠금이 언제, 어느 식별자에 적용되는지와 존재하지 않는 계정에 대한 반응을 비교해야 한다.

**완료 조건**

유효한 사용자 이름을 찾아 비밀번호를 알아낸 뒤 그 계정 페이지에 접속한다. 잠금 메시지의 발견만으로는 계정 접근이 된 것이 아니다.

**문제 설명과 판단 기준**

후보 이름별로 잘못된 비밀번호 요청을 같은 횟수와 조건으로 보내고 응답의 변화를 비교한다. 실제 계정에만 잠금 상태가 생기는지, 단순한 요청 제한이나 공통 오류가 나타난 것인지 구분해야 이름 열거의 근거가 된다. 잠긴 계정은 이후 비밀번호 확인 결과에도 영향을 줄 수 있으므로 현재 잠금 상태를 기록하며 순서를 계획한다.

유효한 이름의 근거가 확보되면 제공된 비밀번호 후보를 확인하고, 성공 응답뿐 아니라 계정 페이지 접근까지 검증한다. 잠금 신호와 인증 성공 신호를 분리해 아래 풀이 기록에 남긴다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-account-lock)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
