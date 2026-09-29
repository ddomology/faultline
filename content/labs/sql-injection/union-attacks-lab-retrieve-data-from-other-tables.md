---
title: "SQL injection UNION attack, retrieving data from other tables"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/union-attacks/lab-retrieve-data-from-other-tables"
difficulty: Practitioner
note_kind: problem
---

# SQL injection UNION attack, retrieving data from other tables

## 문제 조건과 설명

상품 카테고리 필터에 SQL injection 취약점이 있고, 조회 결과가 응답에 표시된다. 따라서 `UNION`으로 상품이 아닌 테이블의 행을 결과에 합칠 수 있다. 이 실습은 앞선 두 단계, 즉 **반환 열 수를 맞추는 일**과 **문자열을 출력할 수 있는 열을 찾는 일**을 실제 데이터 조회에 연결한다.

### 이번에는 테이블 구조가 주어져 있다

공식 설명은 별도의 `users` 테이블과 그 안의 `username`, `password` 열을 명시한다. 앞의 “database contents” 실습처럼 테이블 이름과 열 이름을 처음부터 발굴해야 하는 문제가 아니다. 다만 원래 상품 조회의 열 수, `UNION` 결과에서 두 값을 각각 볼 수 있는 위치, 데이터베이스에 실제로 저장된 계정 행과 비밀번호는 알려 주지 않는다.

| 정보 | 출발 시점의 상태 |
| --- | --- |
| `users`, `username`, `password` | 공식 문제 설명에서 제공한다. |
| 상품 조회 결과의 열 수와 표시 위치 | 요청과 응답으로 확인해야 한다. |
| 사용자별 실제 자격 증명 | 계정 행을 조회해야 알 수 있다. |

### 완료 기준과 판단 순서

**완료 조건은 모든 사용자의 이름과 비밀번호를 조회하고, 얻은 정보로 `administrator`로 로그인하는 것**이다. 화면에 임의의 문자열 한 개를 띄우는 것은 준비 단계일 뿐이다. 조회 결과에서 어떤 비밀번호가 어떤 사용자 이름에 대응하는지 식별할 수 있어야 관리자 계정으로 로그인할 수 있다.

먼저 `UNION`의 열 개수를 맞춘 뒤 계정 열의 텍스트를 화면에 배치할 수 있는지 확인하는 순서가 타당하다. 계정 행이 보이면 그 결과를 기준으로 관리자 로그인까지 확인해야 한다. 아래에는 이 인스턴스에서 직접 확인한 열 수, 출력 위치, 계정 행과 로그인 결과만 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/union-attacks/lab-retrieve-data-from-other-tables)

## 탐색 및 풀이 기록

아직 이 실습의 요청·응답을 직접 기록하지 않았다. 위 순서는 문제 설명에서 세운 계획이며, 계정 값이나 로그인 성공을 확인했다는 뜻은 아니다.
