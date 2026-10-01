---
title: "SQL injection UNION attack, determining the number of columns returned by the query"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/union-attacks/lab-determine-number-of-columns"
difficulty: Practitioner
note_kind: problem
---

# SQL injection UNION attack, determining the number of columns returned by the query

## 문제 조건과 설명

상품 카테고리 필터에 SQL injection 취약점이 있고, 조회 결과가 응답에 나타난다. 공식 설명은 이 특성을 이용해 `UNION`으로 다른 조회 결과를 추가할 수 있다고 알려 준다. 그러나 원래 상품 조회가 **몇 개의 열을 반환하는지**는 알려 주지 않는다. 이 숫자를 모르면 추가할 조회의 결과 모양을 맞출 수 없다.

**이번 실습이 분리해서 묻는 것**

`UNION`은 두 조회 결과의 열 개수가 같아야 성립한다. 예컨대 원래 조회가 여러 열을 반환하는데 추가 조회가 한 값만 반환한다면, 원하는 행을 결과에 합칠 수 없다. 이 문제는 계정 정보나 버전 값을 가져오는 단계에 앞서, **추가 조회에 몇 개의 값을 나열해야 하는지**를 알아내는 단계다.

공식 설명은 `NULL` 값으로 이루어진 추가 행을 반환하는 `UNION` 삽입으로 열 수를 확인하라고 요구한다. `NULL`은 초기 탐색에서 특정 자료형의 문자열이나 숫자를 먼저 고르지 않아도 되게 해 주지만, 후보 열 수가 맞는지는 실제 서버 응답으로 판정해야 한다. 어떤 숫자가 정답인지는 문제 설명에 없다.

**완료 기준과 관찰할 증거**

**완료 조건은 원래 조회와 열 수가 맞는 `UNION` 조회를 구성하여, `NULL` 값으로 된 추가 행을 결과에 반환하는 것**이다. 단순히 어느 요청이 HTTP `200`을 주었다는 사실보다, 정상 카테고리 응답과 비교했을 때 추가 조회가 받아들여졌는지와 실습 완료 상태를 확인하는 편이 정확하다.

탐색할 때는 카테고리 입력과 주석 처리 방식을 일정하게 두고 `NULL` 값의 개수만 바꿔 비교해야 한다. 그래야 오류가 열 수 때문인지, 입력 자체의 구문 때문인지 구분할 수 있다. 성공한 개수를 확인하면 그 값을 다음 실습의 출발 정보로 사용할 수 있지만, 이 노트에서는 **직접 확인하기 전의 숫자를 결과로 적지 않는다.**

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/union-attacks/lab-determine-number-of-columns)

## 탐색 및 풀이 기록

<!-- 아직 이 실습의 요청·응답을 직접 기록하지 않았다. 후보 열 수별 응답 차이와 추가 행의 표시 여부를 확인한 뒤 이 파일에 이어서 적는다. -->

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
