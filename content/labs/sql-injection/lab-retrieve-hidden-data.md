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

실습 설명에 따르면 쇼핑몰의 **카테고리 필터에 SQL injection 취약점**이 있다. 카테고리를 선택할 때 사용되는 쿼리도 예시로 제시한다. 아래는 `Gifts`를 선택했을 때의 쿼리로, 실제 서버 요청을 분석해 복원한 SQL은 아니다.

```sql
SELECT *
FROM products
WHERE category = 'Gifts'
  AND released = 1
```

**주어진 쿼리가 거르는 것**

| 조건 | 정상 동작에서의 역할 |
| --- | --- |
| `FROM products` | 상품 테이블을 조회한다. |
| `category = 'Gifts'` | 선택한 카테고리의 상품만 남긴다. 카테고리 이름은 SQL 문자열 안에 있다. |
| `AND released = 1` | 그중에서도 출시된 상품만 남긴다. 두 조건을 모두 만족해야 결과에 포함된다. |

이 쿼리대로라면 화면에는 선택한 카테고리의 **출시된 상품**만 나온다. `released = 1`에 걸려 미출시 상품은 빠진다. 이번에는 카테고리 입력을 바꿔 그 상품까지 조회되게 해야 한다.

**완료 기준과 확인할 점**

**완료 조건은 SQL injection으로 미출시 상품을 하나 이상 화면에 표시하는 것**이다. 설명에는 카테고리 필터가 입력 지점이라는 단서와 쿼리 예시가 있지만, 실제 URL의 파라미터 이름이나 서버의 입력 처리 방식은 나와 있지 않다. 미출시 상품이 응답에서 어떻게 보이는지도 직접 확인해야 한다.

먼저 정상 카테고리 요청의 URL을 확인한 뒤 필터 값을 바꿔 봤다. `WHERE`절에 값을 넣을 수 있다는 단서만으로는 성공 여부를 알 수 없으므로, **실제 결과와 실습 완료 여부**를 기준으로 판단했다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data)

## 탐색 및 풀이 기록

### 초기 관찰

#### 1. URL 관찰

상품 필터에서 확인한 URL은 다음과 같다.

[관찰한 상품 필터 URL](https://0a28008d03d1147f828f6ab50099002e.web-security-academy.net/filter?category=Clothing%2c+shoes+and+accessories)

```text
https://0a28008d03d1147f828f6ab50099002e.web-security-academy.net/filter?category=Clothing%2c+shoes+and+accessories
```

경로는 `/filter`이고, 쿼리 문자열에는 `category` 파라미터가 있다. 전달된 값은 `Clothing%2c+shoes+and+accessories`다.

폼 방식의 쿼리 문자열에서 `%2c`는 쉼표(`,`), `+`는 공백이다. 따라서 실제 카테고리 이름은 다음과 같다.

```text
Clothing, shoes and accessories
```

이 URL을 통해 상품 카테고리가 `category` 파라미터로 전달된다는 것을 알 수 있었다.

### 실행 과정

#### 2. 첫 번째 시도: `' OR 1=1--`

`category` 값을 다음과 같이 바꿔 넣었다.

```sql fragment
' OR 1=1--
```

**실제 결과**

이 값을 넣자 실습이 해결됐다.

#### 3. 입력이 들어가는 위치 확인

앞서 본 URL의 `category` 값은 상품 카테고리 이름이다. 문제에서 제시한 SQL에서는 이 값이 `WHERE category = '…'`의 작은따옴표 안에 들어간다.

따라서 입력이 카테고리 이름으로만 처리되는지, SQL 문법에도 영향을 주는지 살펴볼 수 있다.

#### 4. 성공한 입력의 역할 분석

사용한 입력은 다음 세 부분으로 나눌 수 있다.

| 입력 | 역할 |
| --- | --- |
| `'` | 카테고리 값을 감싸던 문자열을 닫는다. |
| `OR 1=1` | 항상 참인 조건을 추가한다. |
| `--` | 같은 줄의 뒤쪽 SQL을 주석으로 처리한다. |

문제에서 제시한 쿼리에 대입하면 아래와 같은 형태가 된다. **동작을 설명하기 위해 재구성한 예시**이며 서버의 실제 SQL은 아니다.

```sql
SELECT * FROM products WHERE category = '' OR 1=1--' AND released = 1
```

`--` 뒤에 이어지는 작은따옴표와 `AND released = 1`은 주석으로 처리된다. 결국 조건식은 다음과 같은 의미가 된다.

```sql
SELECT * FROM products WHERE category = '' OR 1=1
```

`1=1`이 항상 참이므로 카테고리가 일치하지 않아도 `OR`로 묶인 조건은 참이 된다. 출시 여부를 확인하는 조건도 주석으로 빠져, 카테고리나 출시 상태에 따른 필터가 적용되지 않는다.

> [!tip] 주석까지 포함해서 이해하기
> `--`는 같은 줄의 끝까지 주석으로 처리한다. 그래서 위 예시는 한 줄로 적었고, `AND released = 1`도 주석에 포함된다.

## 최종 결과

관찰한 URL의 `category` 값에 `' OR 1=1--`를 넣어 실습을 해결했다.

> [!success] 풀이 완료
> **성공한 입력:** `' OR 1=1--`
>
> **해결 목표:** 미출시 상품이 표시되도록 조회 조건을 변경하기.

## 배운 점

- **입력 지점은 URL에서 찾았다.** `/filter?category=…`를 경로와 파라미터로 나눠 보니 바꿀 수 있는 값이 `category`라는 점이 분명해졌다.
- **URL에 보이는 값과 실제 문자열은 다르다.** 이번 요청의 `%2c`와 `+`를 디코딩하면 각각 쉼표와 공백이다.
- **입력이 들어가는 위치를 알아야 한다.** 카테고리 값이 작은따옴표 안에 들어가므로, 페이로드의 첫 작은따옴표가 그 문자열을 닫았다.
- **`OR`와 주석이 함께 작동했다.** `OR 1=1`로 조건을 참으로 만들고, `--`로 뒤에 붙는 출시 여부 조건을 주석 처리했다.
- **방어하려면 입력값을 SQL과 분리해야 한다.** 매개변수화된 쿼리로 값을 바인딩하면 작은따옴표나 SQL 키워드도 쿼리 구조가 아닌 데이터로 처리할 수 있다.

### 참고

- [PortSwigger 원본 실습](https://portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data)
