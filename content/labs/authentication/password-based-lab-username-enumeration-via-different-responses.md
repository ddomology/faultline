---
title: "Username enumeration via different responses"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-different-responses"
difficulty: Apprentice
note_kind: problem
---

# Username enumeration via different responses

## 문제 조건과 설명

**주어진 조건**

로그인 기능에서 사용자 이름의 유효성에 따라 응답이 달라지며 비밀번호 시도에도 취약하다. 공식 문제는 후보 사용자 이름 목록과 후보 비밀번호 목록을 제공한다. 어느 문자열이나 응답 속성이 계정 존재 여부를 드러내는지는 실습 요청으로 확인해야 한다.

**완료 조건**

유효한 사용자 이름을 찾고 해당 계정의 비밀번호를 알아낸 뒤 계정 페이지에 접속한다. 이름 식별, 비밀번호 확인, 로그인 후 페이지 접근을 각각 검증한다.

**문제 설명과 판단 기준**

동일한 비밀번호를 두고 사용자 이름만 바꾼 로그인 응답을 비교한다. 상태 코드, 오류 문구, 본문 구조 또는 리디렉션의 일관된 차이가 있는지 살피면 비밀번호가 틀렸더라도 계정 존재 여부를 추론할 수 있다. 동적으로 바뀌는 값이나 일시적 오류를 구분 신호로 잘못 읽지 않도록 같은 조건에서 재확인한다.

유효한 이름의 근거가 확보되면 제공된 비밀번호 후보를 그 계정에 대해 확인한다. 성공으로 보이는 응답 뒤에는 실제 세션이 생겼는지와 계정 페이지가 열리는지 검증하고, 발견 과정을 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-different-responses)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
