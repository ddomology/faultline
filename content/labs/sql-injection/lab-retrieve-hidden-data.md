---
title: "SQL injection vulnerability in WHERE clause allowing retrieval of hidden data"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data"
difficulty: Apprentice
note_kind: solution
---

# SQL injection vulnerability in WHERE clause allowing retrieval of hidden data

## 문제 조건과 설명

상품을 카테고리별로 조회하는 웹 쇼핑몰이다. 이 실습의 **상품 카테고리 필터**에는 SQL injection 취약점이 있으며, 카테고리를 선택하면 서버가 해당 조건에 맞는 상품을 데이터베이스에서 조회한다.

문제에서 제시한 조회 쿼리는 다음과 같다. `Gifts` 카테고리를 선택한 경우의 예시다.

```sql
SELECT *
FROM products
WHERE category = 'Gifts'
  AND released = 1
```

### 정상적인 조회 동작

| 구문 | 의미 |
| --- | --- |
| `SELECT * FROM products` | 상품 테이블에서 모든 컬럼을 조회한다. |
| `category = 'Gifts'` | 카테고리가 `Gifts`인 상품으로 범위를 제한한다. |
| `AND released = 1` | 앞의 카테고리 조건과 함께, 출시된 상품이라는 조건도 만족해야 한다. |

따라서 정상적인 조회 결과에는 **선택한 카테고리에 속하면서 출시된 상품**만 나타난다. 미출시 상품은 `released = 1` 조건을 만족하지 않아 결과에서 제외된다.

> [!info] 문제에서 주어진 정보
> 위 SQL과 취약점의 위치는 공식 문제 설명에서 제공한 조건이다. 직접 요청을 보내 관찰한 결과는 아래 탐색 과정에 따로 기록한다.

## 목표와 조건

- **목표:** SQL injection을 이용해 웹사이트에 **미출시 상품을 하나 이상 표시**한다.
- **입력 지점:** 상품 카테고리를 선택하는 필터.
- **취약점 위치:** 상품 조회 SQL의 `WHERE` 절.
- **확인할 결과:** 요청을 변경한 뒤 응답의 상품 목록에 미출시 상품이 포함되는지 확인한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data)

## 탐색 과정

### 1. URL 관찰

먼저 다음 URL을 관찰했다.

[관찰한 상품 필터 URL](https://0a28008d03d1147f828f6ab50099002e.web-security-academy.net/filter?category=Clothing%2c+shoes+and+accessories)

```text
https://0a28008d03d1147f828f6ab50099002e.web-security-academy.net/filter?category=Clothing%2c+shoes+and+accessories
```

URL의 경로는 `/filter`이고, 쿼리 문자열에는 `category` 파라미터가 있다. 그 값은 `Clothing%2c+shoes+and+accessories`로 전달된다.

이를 폼 방식의 쿼리 문자열로 디코딩하면 `%2c`는 쉼표(`,`), `+`는 공백이므로 카테고리 이름은 다음과 같다.

```text
Clothing, shoes and accessories
```

이 URL에서 상품 카테고리가 `category` 파라미터로 전달된다는 점을 확인했다.

### 2. 첫 번째 시도: `' OR 1=1--`

`category` 파라미터의 값을 다음과 같이 바꿔 시도했다.

```sql
' OR 1=1--
```

**실제 결과**

이 입력으로 실습 해결에 성공했다.

## 해결 과정

### 1. 입력이 들어가는 위치 확인

앞서 관찰한 URL에서 `category`는 상품 카테고리를 전달하는 값이다. 문제에서 제공한 SQL에 따르면 이 값은 `WHERE category = '…'`의 작은따옴표 안에 들어간다.

핵심은 입력한 문자가 카테고리 이름으로만 처리되는지, 아니면 SQL 문법으로 해석될 수 있는지다.

### 2. 성공한 입력의 역할 분석

사용한 입력은 다음 세 부분으로 나눌 수 있다.

| 입력 | 역할 |
| --- | --- |
| `'` | 카테고리 값을 감싸던 문자열을 닫는다. |
| `OR 1=1` | 항상 참인 조건을 추가한다. |
| `--` | 같은 줄의 뒤쪽 SQL을 주석으로 처리한다. |

문제에서 제공한 쿼리에 이 값을 그대로 대입하면 다음과 같은 구조가 된다. 아래 SQL은 **동작 원리를 설명하기 위해 재구성한 예시**다.

```sql
SELECT * FROM products WHERE category = '' OR 1=1--' AND released = 1
```

`--` 뒤의 작은따옴표와 `AND released = 1`이 주석으로 처리되므로, 조건식의 의미는 다음과 같아진다.

```sql
SELECT * FROM products WHERE category = '' OR 1=1
```

`1=1`은 항상 참이다. 따라서 앞의 카테고리 비교가 어떤 결과이든 `OR`로 연결된 조건 전체는 참이 되고, 이 쿼리는 카테고리나 출시 여부로 상품을 걸러내지 않게 된다.

> [!tip] 주석까지 포함해서 이해하기
> 이 입력은 항상 참인 조건을 추가하는 동시에, 뒤에 붙는 출시 여부 조건을 주석으로 제거한다. `--`는 줄 끝까지 적용되므로 위 예시는 한 줄 SQL로 표시했다.

### 3. 해결 결과

관찰한 URL의 `category` 값을 `' OR 1=1--`로 변경해 시도했고, 실습 해결에 성공했다.

> [!success] 풀이 완료
> **성공한 입력:** `' OR 1=1--`
>
> **해결 목표:** 미출시 상품이 표시되도록 조회 조건을 변경하기.

## 배운 점

- **URL은 입력 지점을 찾는 단서다.** `/filter?category=…`에서 경로와 파라미터를 나누어 보면, 어떤 값을 변경할 수 있는지 파악하기 쉽다.
- **인코딩된 값과 실제 문자열을 구분해야 한다.** 이번 쿼리 문자열의 `%2c`와 `+`는 디코딩하면 각각 쉼표와 공백이 된다.
- **입력이 들어가는 SQL 문맥이 중요하다.** 이번에는 작은따옴표로 둘러싸인 문자열 안에 입력이 들어가므로, 첫 작은따옴표가 문자열을 닫는 역할을 했다.
- **논리 연산과 주석을 함께 이해해야 한다.** `OR 1=1`은 조건을 참으로 만들고, `--`는 뒤쪽 조건이 적용되지 않도록 했다.
- **근본적인 방어는 SQL과 입력값을 분리하는 것이다.** 매개변수화된 쿼리로 값을 바인딩하면 입력에 들어 있는 작은따옴표나 SQL 키워드를 쿼리 구조가 아닌 데이터로 처리할 수 있다.

## 참고

- [PortSwigger 원본 실습](https://portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data)
