---
title: "Blind SQL injection with conditional responses"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-conditional-responses"
difficulty: Practitioner
note_kind: problem
---

# Blind SQL injection with conditional responses

## 문제 조건과 설명

애플리케이션은 방문자를 분석하기 위한 **추적 쿠키의 값**을 SQL 조회에 넣는다. 이 입력에 blind SQL injection 취약점이 있다. 조회 결과와 SQL 오류는 응답에 표시되지 않지만, 조회가 한 행 이상을 반환하면 페이지에 `Welcome back` 문구가 나온다. 즉 데이터 자체는 보이지 않아도 **행의 존재 여부**는 응답 문구로 관찰할 수 있다.

**주어진 데이터와 완료 조건**

별도의 `users` 테이블과 `username`, `password` 열이 있다는 사실은 공식 설명에 주어진다. `administrator` 계정의 비밀번호 값은 알려 주지 않는다. **완료 조건은 취약한 쿠키 값을 이용해 그 비밀번호를 알아내고, 실제로 관리자 계정으로 로그인하는 것**이다. 환영 문구를 한 번 띄우는 것만으로는 끝나지 않는다.

**이 실습에서 응답을 읽는 방법**

| 관찰 | 문제 설명에서 확실히 말하는 것 |
| --- | --- |
| `Welcome back`이 보임 | SQL 조회가 하나 이상의 행을 반환했다. |
| 문구가 보이지 않음 | 해당 요청에서 행 반환 신호를 얻지 못했다. 그 이유는 기준 요청과 비교해 판단해야 한다. |
| SQL 결과·오류 내용 | 페이지에 직접 나타나지 않는다. |

따라서 먼저 같은 페이지에서 정상적인 쿠키 요청과 값을 바꾼 요청을 비교해 문구가 안정적으로 나타나는 조건을 확인해야 한다. 그다음 관리자 비밀번호에 관한 한 가지 질문만 쿠키의 SQL 조건에 반영하고, 문구의 유무를 통해 답을 추론할 수 있다. 비밀번호의 길이나 각 문자를 처음부터 안다고 가정하지 않고, **확인한 조건과 응답을 누적**해야 한다. 아래에는 실제 쿠키 이름, 요청, 응답 문구와 로그인 결과를 확인한 뒤 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/blind/lab-conditional-responses)

## 탐색 및 풀이 기록

아직 이 실습의 요청·응답을 직접 기록하지 않았다. 위 표는 공식 문제 조건을 해석한 것이며, 비밀번호나 로그인 성공을 확인했다는 뜻은 아니다.
