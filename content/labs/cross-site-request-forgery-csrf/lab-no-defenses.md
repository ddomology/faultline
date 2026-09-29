---
title: "CSRF vulnerability with no defenses"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/lab-no-defenses"
difficulty: Apprentice
note_kind: problem
---

# CSRF vulnerability with no defenses

## 문제 조건과 설명

**주어진 조건**

이메일 주소 변경 기능에 CSRF 방어가 없다. 자신의 계정에는 `wiener:peter`로 로그인할 수 있고, 공격에 사용할 HTML은 제공된 exploit server에 올린다.

**완료 조건**

피해자가 exploit server의 HTML을 열었을 때 피해자의 이메일 변경 요청이 발생하도록 만든다. 자기 계정에서 정상적으로 이메일을 바꾸는 것은 요청 구조를 알아내는 단계이며, 피해자 대상 CSRF의 성공과 구별해야 한다.

**문제 설명과 판단 기준**

CSRF에서는 공격자 페이지가 피해자의 브라우저에 요청을 만들고, 브라우저가 해당 사이트의 인증 상태를 함께 보낼 수 있는지가 중요하다. 문제 설명의 ‘방어 없음’은 토큰 등 추가 검증이 없다는 단서지만, 정확한 요청 방식·경로·필드 이름까지 알려 주지는 않는다.

먼저 자기 계정으로 이메일 변경을 수행해 요청의 URL, 메서드, 매개변수와 응답을 확인한다. 이를 바탕으로 exploit server에서 보낼 HTML을 만들고, 페이지를 열 때 요청이 발생하는지 시험한다. 마지막에는 피해자 계정의 이메일이 실제로 바뀌었는지 확인한다. 현재는 요청 구조나 성공 결과가 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/lab-no-defenses)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
