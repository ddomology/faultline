---
title: "SQL injection with filter bypass via XML encoding"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/lab-sql-injection-with-filter-bypass-via-xml-encoding"
difficulty: Practitioner
note_kind: problem
---

# SQL injection with filter bypass via XML encoding

## 문제 조건과 설명

이 실습의 입력 지점은 앞선 상품 카테고리 필터가 아니라 **재고 확인 기능**이다. 공식 설명은 이 기능에 SQL injection 취약점이 있으며, 조회 결과가 애플리케이션 응답에 표시된다고 알려 준다. 따라서 `UNION`으로 다른 테이블의 데이터를 조회 결과에 합쳐 읽을 수 있다.

### 주어진 데이터와 목표

데이터베이스에는 등록 사용자의 이름과 비밀번호를 담은 `users` 테이블이 있다. 다만 공식 설명은 재고 확인 요청의 실제 형식, 원래 조회의 열 수, 계정 정보가 화면의 어느 위치에 나타날지, 관리자 비밀번호 값을 알려 주지 않는다. **완료 조건은 SQL injection으로 관리자 계정의 자격 증명을 얻고, 그 계정으로 로그인하는 것**이다. `UNION` 결과가 화면에 보이는 것과 관리자 로그인이 끝난 것은 별도로 확인해야 한다.

### 제목이 알려 주는 우회 과제

제목은 **XML 인코딩을 이용한 필터 우회**를 예고한다. 하지만 문제 본문만으로는 요청이 어떤 XML 구조인지, 어떤 문자나 표현이 차단되는지, 인코딩된 값이 서버의 어느 단계에서 해석되는지 알 수 없다. 먼저 재고 확인 요청의 본문과 응답을 관찰하고, 입력이 필터를 통과하는 형태와 SQL에 전달될 때의 의미를 구분해야 한다. 제목만 보고 특정 인코딩 문자열이 동작했다고 기록해서는 안 된다.

재고 조회의 정상 응답을 기준으로 삼은 뒤, 입력 표현을 바꿨을 때 차단·SQL 오류·결과 출력이 각각 어떻게 달라지는지 비교하는 순서가 타당하다. 우회 가능성이 확인되어도 `UNION`이 요구하는 반환 열 수와 문자열 출력 위치를 맞춰야 계정 값을 읽을 수 있다. 아래에는 실제 요청 형식과 관찰된 응답을 확인한 후 단계별 판단을 이어서 적는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/lab-sql-injection-with-filter-bypass-via-xml-encoding)

## 탐색 및 풀이 기록

아직 이 실습의 재고 확인 요청·응답이나 관리자 로그인을 직접 기록하지 않았다. XML 형식과 필터 동작을 확인한 결과부터 같은 파일에 이어서 적는다.
