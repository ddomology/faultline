---
title: "CSRF where token validation depends on request method"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-validation-depends-on-request-method"
difficulty: Practitioner
note_kind: problem
---

# CSRF where token validation depends on request method

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능에 CSRF 취약점이 있고, 애플리케이션의 방어는 특정 요청 메서드에만 적용된다. 자신의 계정은 `wiener:peter`로 로그인할 수 있으며 공격 HTML은 exploit server에 올려야 한다. 공식 설명은 어느 메서드에서 검증이 빠지는지까지 지정하지 않는다.

**완료 조건**

exploit server의 HTML을 방문한 사람의 이메일 주소를 CSRF 요청으로 변경한다. 한 메서드에서 토큰 오류가 난 사실이나 자기 계정에서 바뀐 결과만으로 피해자 대상 완료를 판단하지 않는다.

**문제 설명과 판단 기준**

방어가 요청 방식에 따라 달라진다면, 같은 기능을 호출하더라도 메서드별로 토큰 요구 여부가 다를 수 있다. 다만 어떤 메서드가 허용되고 서버가 매개변수를 어디서 읽는지는 실제 요청으로 확인해야 한다. 토큰이 없는 요청의 응답 코드뿐 아니라 이메일 변경 결과도 함께 봐야 한다.

자기 계정으로 정상 변경 요청을 캡처해 메서드, 필드, 토큰을 기록한다. 요청 메서드와 토큰 유무를 하나씩 바꾸며 서버의 응답과 계정 상태를 비교한 뒤, 검증된 방식으로 exploit server의 HTML을 구성한다. 현재 우회 가능한 메서드나 피해자 대상 성공 결과는 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-validation-depends-on-request-method)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
