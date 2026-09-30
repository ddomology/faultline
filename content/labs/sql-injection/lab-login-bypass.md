---
title: "SQL injection vulnerability allowing login bypass"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/lab-login-bypass"
difficulty: Apprentice
note_kind: solution
---

# SQL injection vulnerability allowing login bypass

## 문제 조건과 설명

실습 설명에는 **로그인 기능**에 SQL injection 취약점이 있다고 나온다. 목표는 이를 이용해 `administrator`로 로그인하는 것이다. 이 문제에서는 쿼리 결과가 화면에 나오지 않으므로, 로그인 후 **어떤 계정으로 인증됐는지** 확인해야 한다.

**문제에서 알려 주지 않은 것**

설명만으로는 로그인 화면의 입력 항목, SQL에 쓰이는 값, 서버의 실제 쿼리나 데이터베이스 종류를 알 수 없다. 그래서 일반적인 로그인 쿼리를 미리 가정하지 않고, 먼저 로그인 실패 화면을 확인했다. 이후 입력을 바꾸면서 오류 메시지와 화면 이동, 로그인한 사용자 표시를 비교했다.

**완료 기준과 탐색의 순서**

**완료 조건은 `administrator` 세션으로 애플리케이션에 로그인하는 것**이다. HTTP `200` 응답이나 오류 화면의 변화만으로는 성공 여부를 알 수 없다. 로그인 후 페이지에 표시되는 계정과 실습 완료 상태를 확인해야 한다.

실패한 기본 로그인부터 시작해 입력을 하나씩 바꿔 봤다. 각 시도에서 확인한 응답과 최종 로그인 결과를 아래에 순서대로 적었다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/lab-login-bypass)

## 탐색 및 풀이 기록

### 초기 관찰

#### 1. 기본 로그인 시도 및 요청 확인

먼저 사용자 이름과 비밀번호에 모두 `test`를 넣고 로그인을 시도했다. 개발자 도구에서 확인한 요청과 응답은 다음과 같다.

- **요청 경로:** `/login`
- **요청 메서드:** `POST`
- **전송 항목:** `csrf`, `username`, `password`
- **입력값:** `username=test`, `password=test`
- **HTTP 응답 상태:** `200 OK`
- **화면에 표시된 결과:** `Invalid username or password.`

응답은 `200 OK`였지만 화면에는 `Invalid username or password.`가 나왔다. 로그인은 실패했다.

**로그인 요청 헤더**

![로그인 요청의 POST 메서드와 200 OK 응답](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-login-bypass/01-login-request-headers.png)

**로그인 요청의 전송 데이터**

![csrf 항목과 username=test, password=test 전송 데이터](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-login-bypass/02-login-request-payload.png)

### 실행 과정

#### 2. 사용자 이름에 작은따옴표 추가 — 첫 번째 입력 변경 시도

비밀번호는 `test`로 두고 사용자 이름 끝에 작은따옴표 하나를 붙였다. 기본 로그인 실패 응답과 비교하기 위한 시도였다.

```text
username: test'
password: test
```

- **대상 경로:** `/login`
- **관찰 결과:** 기존의 `Invalid username or password.` 대신 브라우저에 **사이트에 연결할 수 없음** 화면이 표시되었다.
- **브라우저 오류 코드:** `ERR_HTTP2_PROTOCOL_ERROR`
- **HTTP 응답 상태:** 첨부 화면에서는 확인되지 않음.

이때는 기본 로그인과 달리 브라우저 오류 화면이 나왔다. `ERR_HTTP2_PROTOCOL_ERROR`가 표시된 것은 확인했지만, 이 화면만으로 서버에서 SQL 구문 오류가 났다고 단정할 수는 없다.

![사용자 이름에 작은따옴표를 추가한 첫 시도에서 표시된 ERR_HTTP2_PROTOCOL_ERROR](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-login-bypass/03-username-quote-error.png)

#### 3. 참인 조건과 주석을 입력하여 로그인 성공

다음에는 사용자 이름을 아래 값으로 바꿔 로그인했다.

```text
username: test' OR 1=1 --
```

- **비밀번호:** 입력한 상태로 제출했다. 첨부 화면에서는 마스킹되어 있어 실제 값은 확인할 수 없다.
- **관찰 결과:** 로그인 후 **My Account** 화면으로 이동했다.
- **로그인된 계정:** 화면에 `Your username is: administrator`가 표시되었다.
- **결과:** `administrator` 계정으로 로그인하는 데 성공했다.

**성공한 시도의 로그인 입력 화면**

![사용자 이름에 test' OR 1=1 --를 입력한 로그인 화면](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-login-bypass/04-login-bypass-input.png)

**관리자 계정으로 로그인된 결과**

![My Account 화면의 Your username is: administrator 표시](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-login-bypass/05-administrator-login-success.png)

## 최종 결과

사용자 이름에 `test' OR 1=1 --`를 넣고 로그인하자 `My Account` 화면에 `Your username is: administrator`가 표시됐다. 목표였던 **SQL injection을 통한 administrator 계정 로그인**에 성공했다.

## 배운 점

- **실패한 요청이 비교 기준이 됐다.** `test / test`로 로그인할 때 `POST /login`과 `csrf`, `username`, `password` 항목을 확인했다. 이후에는 사용자 이름을 바꾸고 실패 응답과 비교했다.
- **상태 코드만으로는 로그인 여부를 알 수 없었다.** 기본 요청은 `200 OK`였지만 화면에는 `Invalid username or password.`가 표시됐다. 로그인 성공 여부는 화면과 계정 정보로 확인해야 한다.
- **입력값이 SQL로 해석되면 인증 조건이 달라질 수 있다.** 로그인 쿼리를 문자열로 이어 붙였다고 가정하면 `test' OR 1=1 --`의 작은따옴표가 문자열을 닫고, `OR 1=1`이 참인 조건을 더하며, `--`가 같은 줄의 비밀번호 조건 등을 주석 처리한다. 서버의 실제 SQL을 확인한 것은 아니므로 이는 동작을 설명하는 예시다.
- **`OR 1=1`만으로 관리자 계정이 정해지는 것은 아니다.** 이번에는 `administrator`로 로그인됐지만, 처리되는 계정은 조회 결과와 애플리케이션의 동작에 달려 있다. 그래서 `Your username is: administrator`라는 화면 표시를 확인했다.
- **오류 화면은 확인한 범위에서만 해석해야 한다.** 작은따옴표를 추가했을 때 나온 것은 `ERR_HTTP2_PROTOCOL_ERROR`였다. 그 원인을 SQL 구문 오류로 단정하지 않고, 입력값과 오류 화면, 최종 로그인 계정을 각각 기록했다.

### 참고

- [PortSwigger 원본 실습](https://portswigger.net/web-security/sql-injection/lab-login-bypass)
