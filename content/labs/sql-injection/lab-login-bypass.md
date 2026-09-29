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

공식 설명이 확정해 주는 취약점 위치는 **로그인 기능**이고, 목표 계정은 `administrator`다. SQL injection을 이용해 그 사용자로 로그인해야 한다. 상품 목록처럼 조회 행이 보이는 화면이 아니므로, 이 문제에서는 쿼리 결과 자체보다 **인증 상태가 바뀌었는지**가 핵심 관찰 대상이다.

### 문제에서 알려 주지 않은 것

로그인 화면에 어떤 입력 필드가 있는지, 그중 어느 값이 SQL에 연결되는지, 서버가 실제로 어떤 쿼리를 만드는지, 데이터베이스 종류가 무엇인지는 설명에 없다. 따라서 흔히 쓰는 로그인 쿼리를 사실처럼 전제해서는 안 된다. 먼저 정상적인 실패 요청을 기준으로 남기고, 입력을 바꿨을 때 오류 메시지·화면 이동·로그인한 사용자 표시가 어떻게 달라지는지 비교해야 한다.

### 완료 기준과 탐색의 순서

**완료 조건은 `administrator` 세션으로 애플리케이션에 로그인하는 것**이다. HTTP `200` 응답 하나나 오류 화면의 변화만으로는 성공을 판정할 수 없다. 로그인 후 페이지가 어느 계정으로 인증되었다고 표시하는지와 실습 완료 상태를 함께 확인해야 한다.

아래 탐색 기록은 실패한 기본 로그인부터 시작한다. 그 기준 응답과 입력 변경 후 응답을 비교하여, 어느 관찰이 SQL injection 가능성을 시사했고 어느 시점에 관리자 로그인까지 확인했는지 순서대로 설명한다. 여기까지는 공식 문제 조건과 그에 따른 조사 계획이며, 실제 관찰값은 다음 절에 적었다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/lab-login-bypass)

## 탐색 과정

### 1. 기본 로그인 시도 및 요청 확인

먼저 사용자 이름과 비밀번호에 각각 `test`를 입력하여 로그인을 시도하고, 개발자 도구에서 로그인 요청을 확인했다.

- **요청 경로:** `/login`
- **요청 메서드:** `POST`
- **전송 항목:** `csrf`, `username`, `password`
- **입력값:** `username=test`, `password=test`
- **HTTP 응답 상태:** `200 OK`
- **화면에 표시된 결과:** `Invalid username or password.`

HTTP 응답은 `200 OK`였지만, 화면에는 `Invalid username or password.`가 표시되어 로그인에 실패했다.

**로그인 요청 헤더**

![로그인 요청의 POST 메서드와 200 OK 응답](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-login-bypass/01-login-request-headers.png)

**로그인 요청의 전송 데이터**

![csrf 항목과 username=test, password=test 전송 데이터](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-login-bypass/02-login-request-payload.png)

### 2. 사용자 이름에 작은따옴표 추가 — 첫 번째 입력 변경 시도

기본 로그인 실패 응답과 비교하기 위해 비밀번호는 `test`로 유지하고, 사용자 이름에 작은따옴표 하나를 추가하여 로그인을 시도했다.

```text
username: test'
password: test
```

- **대상 경로:** `/login`
- **관찰 결과:** 기존의 `Invalid username or password.` 대신 브라우저에 **사이트에 연결할 수 없음** 화면이 표시되었다.
- **브라우저 오류 코드:** `ERR_HTTP2_PROTOCOL_ERROR`
- **HTTP 응답 상태:** 첨부 화면에서는 확인되지 않음.

작은따옴표를 추가한 시도에서 기존과 다른 오류 화면을 관찰했다. 다만 이 화면만으로 SQL 구문 오류가 발생했다고 확정할 수는 없으며, 현재 확인된 사실은 브라우저가 `ERR_HTTP2_PROTOCOL_ERROR`를 표시했다는 것이다.

![사용자 이름에 작은따옴표를 추가한 첫 시도에서 표시된 ERR_HTTP2_PROTOCOL_ERROR](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-login-bypass/03-username-quote-error.png)

### 3. 참인 조건과 주석을 입력하여 로그인 성공

이전 입력 변경 시도에 이어 사용자 이름에 다음 값을 입력하고 로그인을 시도했다.

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

## 해결 과정

사용자 이름에 `test' OR 1=1 --`를 입력하여 로그인을 시도했고, `My Account` 화면에서 `Your username is: administrator`를 확인했다. 따라서 문제의 목표인 **SQL injection을 통한 administrator 계정 로그인**을 달성했다.

## 배운 점

- **기본 요청과 실패 응답을 먼저 확인하면 비교 기준을 만들 수 있다.** 처음에는 `test / test`로 요청을 보내 `POST /login`과 `csrf`, `username`, `password` 항목을 확인했다. 이후 사용자 이름을 바꾸면서 기본 실패 응답과 어떤 차이가 생기는지 비교했다.
- **HTTP 상태 코드만으로 로그인 성공 여부를 판단하면 안 된다.** 기본 로그인 요청은 `200 OK`였지만 화면에는 `Invalid username or password.`가 표시되었다. 성공 여부는 응답 내용과 로그인 후 계정 정보까지 확인해야 한다.
- **입력값이 SQL 구문의 일부로 해석되면 인증 조건 자체가 바뀔 수 있다.** 문자열을 직접 이어 붙이는 로그인 쿼리를 가정하면, `test' OR 1=1 --`에서 작은따옴표는 문자열을 닫고, `OR 1=1`은 항상 참인 조건을 추가하며, `--`는 뒤에 이어지는 같은 줄의 비밀번호 조건 등을 주석으로 처리한다. 이는 성공 원리를 설명하는 모델이며, 서버의 실제 SQL을 직접 확인한 것은 아니다.
- **항상 참인 조건이 특정 계정 로그인을 보장하는 것은 아니다.** 이번에는 `administrator`로 로그인되었지만, `OR 1=1` 자체가 관리자 계정을 지정하는 것은 아니다. 어떤 계정으로 처리되는지는 조회 결과와 애플리케이션의 처리 방식에 달려 있으므로, `Your username is: administrator`라는 실제 표시로 목표 달성을 확인했다.
- **관찰한 사실과 원인에 대한 추정을 구분해서 기록해야 한다.** 작은따옴표만 추가했을 때 확인한 것은 `ERR_HTTP2_PROTOCOL_ERROR`였다. 이 오류만으로 SQL 구문 오류라고 단정할 수는 없다. 입력값, 오류 화면, 최종 로그인 계정처럼 직접 확인한 증거를 남기는 것이 중요하다.

## 참고

- [PortSwigger 원본 실습](https://portswigger.net/web-security/sql-injection/lab-login-bypass)
