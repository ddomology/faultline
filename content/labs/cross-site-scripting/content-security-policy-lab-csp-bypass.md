---
title: "Reflected XSS protected by CSP, with CSP bypass"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-csp-bypass"
difficulty: Expert
note_kind: problem
---

# Reflected XSS protected by CSP, with CSP bypass

## 문제 조건과 설명

**주어진 조건**

반사형 XSS 취약점이 있지만 CSP가 적용된다. 의도된 완료 방식은 Chrome에서만 가능하다.

**완료 조건**

CSP를 우회해 `alert` 함수를 호출한다.

**문제 설명**

브라우저의 콘텐츠 보안 정책이 스크립트 실행을 제한하는 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-csp-bypass)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
