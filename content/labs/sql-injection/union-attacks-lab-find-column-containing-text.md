---
title: "SQL injection UNION attack, finding a column containing text"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/union-attacks/lab-find-column-containing-text"
difficulty: Practitioner
note_kind: problem
---

# SQL injection UNION attack, finding a column containing text

## 문제 조건과 설명

상품 카테고리 필터에 SQL injection 취약점이 있고, `UNION`으로 추가한 결과를 응답에 표시할 수 있다. 앞선 열 수 확인 실습과 연결되지만, 이번에는 열의 **개수만** 알면 충분하지 않다. 추가 조회에 넣은 문자열을 받아들이고 화면에 보여 주는 열을 찾아야 한다.

**주어진 값과 아직 모르는 구조**

실습 페이지가 표시해야 할 **임의 문자열을 제공한다**. 이 값은 고정된 예시 문자열이 아니므로, 실제 인스턴스에서 받은 값을 그대로 써야 한다. 반면 원래 조회의 열 수와 각 열의 자료형·표시 위치는 공식 설명에 적혀 있지 않다. 앞선 실습의 기법으로 열 수를 먼저 확인하라는 안내는 있지만, 다른 인스턴스에서 본 숫자를 이 문제의 관찰값으로 옮길 수는 없다.

**왜 문자열 열을 따로 찾아야 하나**

`UNION`의 두 조회는 열 수뿐 아니라 대응하는 열에 들어갈 값의 종류도 맞아야 한다. `NULL`만 배치한 추가 행이 성립해도, 그중 아무 열에나 텍스트를 넣으면 자료형 문제로 실패할 수 있다. 반대로 쿼리가 실행되더라도 해당 열이 화면에 출력되지 않으면 값이 보이지 않는다. 따라서 **문자열과 호환되고 결과 화면에도 드러나는 위치**를 확인하는 것이 이번 단계의 목적이다.

**완료 조건은 제공된 임의 문자열을 담은 추가 행을 반환해 그 값이 조회 결과에 나타나게 하는 것**이다. 카테고리 입력값이 페이지 제목에 그대로 표시되는 것과 `UNION` 결과 행에 그 문자열이 나오는 것은 구별해야 한다. 탐색에서는 열 수를 고정하고 문자열을 넣는 위치만 하나씩 바꿔 비교하면, 성공과 실패의 이유를 더 분명히 설명할 수 있다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/union-attacks/lab-find-column-containing-text)

## 탐색 및 풀이 기록

아직 이 실습의 임의 문자열이나 요청·응답을 직접 기록하지 않았다. 열 수를 확인한 근거와 문자열 위치별 결과를 얻으면 같은 파일에 이어서 적는다.
