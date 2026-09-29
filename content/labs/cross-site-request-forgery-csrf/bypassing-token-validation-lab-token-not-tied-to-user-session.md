---
title: "CSRF where token is not tied to user session"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-not-tied-to-user-session"
difficulty: Practitioner
note_kind: problem
---

# CSRF where token is not tied to user session

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능은 CSRF 토큰을 쓰지만 그 토큰이 사이트의 세션 처리와 연결되어 있지 않다. 실험용 계정 두 개 `wiener:peter`, `carlos:montoya`가 제공된다. 최종 공격 페이지는 exploit server에 올려야 한다.

**완료 조건**

exploit server의 HTML을 보는 사람의 이메일 주소를 CSRF로 변경한다. 한 계정에서 발급된 토큰이 다른 계정의 요청에 쓰일 수 있는지 조사하는 단계와 실제 피해자 계정 변경은 구별한다.

**문제 설명과 판단 기준**

정상적인 토큰 검증이라면 값이 유효한지만이 아니라 어느 사용자 세션을 위해 발급되었는지도 중요하다. 두 계정을 주는 이유는 같은 이메일 변경 요청에 서로 다른 로그인 세션과 토큰을 조합해 관계를 관찰할 수 있기 때문이다. 토큰이 어디서 발급되고 재사용되는지는 실습에서 확인해야 한다.

각 계정의 정상 변경 요청과 토큰을 따로 수집한다. 토큰·세션 조합을 하나씩 바꾸되 요청의 다른 필드는 유지해 응답과 계정 상태를 비교한다. 다른 세션에서도 사용할 수 있다는 사실이 확인된 경우에만 그 구조를 exploit server 페이지에 반영한다. 아직 교차 세션 실험 결과는 없다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-not-tied-to-user-session)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
