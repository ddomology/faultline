---
title: "Visible error-based SQL injection"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-sql-injection-visible-error-based"
difficulty: Practitioner
note_kind: problem
---

# Visible error-based SQL injection

## 문제 조건과 설명

분석용 추적 쿠키의 값이 SQL 조회에 들어간다. 이 실습에서는 SQL 조회 결과가 응답에 표시되지 않는다. 따라서 `UNION`으로 결과 행을 추가하더라도 앞선 상품 목록 문제처럼 값을 읽을 수 있다고 가정할 수 없다. 제목은 **눈에 보이는 오류를 통한 정보 노출**을 다루지만, 어떤 오류 메시지가 나타나는지와 그 안에 무엇이 포함되는지는 직접 확인해야 한다.

**12번의 조건부 오류와 다른 질문**

조건부 오류 실습은 오류가 **발생했는지 여부**를 참·거짓 신호로 이용한다. 여기서는 오류의 존재를 넘어서, 표시되는 오류 내용에 데이터가 드러날 수 있는지가 탐색의 핵심이다. 두 경우 모두 일반 조회 결과는 보이지 않지만, 관찰할 수 있는 정보량이 같다고 미리 단정해서는 안 된다.

먼저 정상적인 쿠키 요청과 잘못된 입력의 응답을 비교해 오류가 어디에 표시되는지, 단순한 공통 문구인지, SQL 처리에 관한 구체적인 값을 포함하는지 확인해야 한다. 오류를 한 번 만든 사실만으로 비밀번호가 노출된 것은 아니다. 어떤 입력이 어떤 값을 오류에 드러냈는지까지 확인되어야 한다.

**주어진 데이터와 완료 조건**

공식 설명은 별도의 `users` 테이블 및 `username`, `password` 열을 알려 준다. `administrator`의 실제 비밀번호는 주어지지 않는다. **완료 조건은 SQL injection을 이용해 그 비밀번호를 노출시키고 관리자 계정으로 로그인하는 것**이다. 비밀번호를 추측하거나 다른 계정의 행만 보여 주는 것으로는 목표를 채울 수 없다.

아래에는 실제 오류 문구와 그 해석, 비밀번호 확인 근거, 로그인 결과를 순서대로 남긴다. 현재는 오류의 구체적인 모양이나 데이터 누출 여부를 관찰한 기록이 없다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/blind/lab-sql-injection-visible-error-based)

## 탐색 및 풀이 기록

아직 이 실습의 요청·응답을 직접 기록하지 않았다. 오류 메시지의 실제 내용을 확인한 뒤 추측과 관찰을 구분해 이어서 적는다.
