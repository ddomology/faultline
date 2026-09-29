---
title: "SQL injection UNION attack, retrieving multiple values in a single column"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/union-attacks/lab-retrieve-multiple-values-in-single-column"
difficulty: Practitioner
note_kind: problem
---

# SQL injection UNION attack, retrieving multiple values in a single column

## 문제 조건과 설명

상품 카테고리 필터에 SQL injection 취약점이 있고, `UNION`으로 추가한 조회 결과가 응답에 나타난다. 데이터베이스에는 `username`, `password` 열을 가진 별도의 `users` 테이블이 있다. **모든 사용자 이름과 비밀번호를 조회한 뒤 `administrator`로 로그인하는 것**이 완료 조건이다.

### 앞 실습과 다른 제약

이전 실습과 같은 테이블·열 이름이 공식 설명에 주어지지만, 이번 제목은 **여러 값을 하나의 출력 열에서 가져오는 상황**을 강조한다. 원래 조회에 문자열을 넣을 수 있는 열이 있더라도, 사용자 이름과 비밀번호를 별도 열에 놓으면 두 값이 모두 화면에 보인다고 보장할 수 없다. 그래서 각 계정 행의 두 값을 한 표시 위치에서 함께 읽을 수 있어야 한다.

여기서 “한 열”은 데이터베이스의 `users` 테이블에 계정 필드가 하나만 있다는 뜻이 아니다. 저장된 필드는 `username`과 `password` 두 개이고, **응답 화면에서 사용할 출력 통로를 하나로 만든다**는 뜻이다. 두 값을 합칠 때는 어디까지가 사용자 이름이고 어디부터가 비밀번호인지 구분할 수 있어야 한다. 구분이 흐리면 관리자 행을 찾았더라도 로그인에 필요한 값을 잘못 읽을 수 있다.

### 아직 확인하지 않은 것과 탐색 방향

공식 설명은 원래 상품 조회의 열 수, 화면에 표시되는 문자열 열의 위치, 실제 계정 값, 데이터베이스 제품별 문자열 결합 문법을 알려 주지 않는다. 우선 열 수와 문자 출력 위치를 확인하고, 그다음 두 계정 값을 **같은 추가 행의 한 출력 열**에서 구분 가능하게 표시할 방법을 검증해야 한다. 성공 판정은 화면에서 계정 쌍을 읽은 뒤 관리자 계정으로 로그인했는지까지 포함한다.

아래 영역은 직접 시도한 입력과 응답을 기록하는 자리다. 위 설명은 문제 조건과 그로부터 도출한 판단이며, 특정 결합 표현식이 이 인스턴스에서 동작했다고 주장하지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/union-attacks/lab-retrieve-multiple-values-in-single-column)

## 탐색 및 풀이 기록

아직 이 실습의 요청·응답을 직접 기록하지 않았다. 두 값이 한 출력 열에 나타나는지와 관리자 로그인을 확인한 뒤 같은 파일에 이어서 적는다.
