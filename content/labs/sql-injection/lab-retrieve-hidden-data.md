---
title: "SQL injection vulnerability in WHERE clause allowing retrieval of hidden data"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data"
difficulty: Apprentice
draft: false
---

# SQL injection vulnerability in WHERE clause allowing retrieval of hidden data

## 문제 설명

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

## 탐색 과정

### 1. 첫 번째 시도

**이렇게 생각한 이유**


**시도한 요청 / 코드**

```text

```

**실제 결과**


**해석과 다음 시도**


## 해결 과정


## 배운 점

- 

## 참고

- [원본 실습](https://portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data)
