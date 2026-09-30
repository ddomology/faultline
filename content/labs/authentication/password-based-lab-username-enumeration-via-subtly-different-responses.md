---
title: "Username enumeration via subtly different responses"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-subtly-different-responses"
difficulty: Practitioner
note_kind: problem
---

# Username enumeration via subtly different responses

## 문제 조건과 설명

**주어진 조건**

로그인 실패 응답의 미세한 차이로 사용자 이름을 열거할 수 있고, 비밀번호 확인에도 취약하다. 공식 문제는 후보 사용자 이름과 비밀번호 목록을 제공한다. 큰 상태 코드 차이나 눈에 띄는 문구를 전제로 삼기보다 응답 전체를 세밀하게 비교해야 한다.

**완료 조건**

유효한 사용자 이름과 비밀번호를 찾아 해당 계정 페이지에 접속한다. 미세한 차이의 발견만으로는 로그인 성공을 의미하지 않는다.

**문제 설명과 판단 기준**

같은 틀린 비밀번호로 사용자 이름 후보만 바꾼 응답을 수집해 상태 코드, 리디렉션, 메시지의 글자·공백·구두점까지 비교한다. 동적 요소를 제외하고 반복해서 나타나는 차이여야 계정 존재 여부의 신호로 볼 수 있다. 비교 기준을 확정하기 전에는 후보마다 다른 비밀번호를 섞지 않는 편이 원인을 구분하기 쉽다.

유효한 이름이 확인되면 제공된 비밀번호 후보를 대상으로 로그인 결과를 확인한다. 세션 발급과 계정 페이지 접근까지 검증하고, 어떤 응답 차이를 근거로 이름을 선택했는지 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-subtly-different-responses)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
