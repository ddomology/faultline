---
title: "URL-based access control can be circumvented"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-url-based-access-control-can-be-circumvented"
difficulty: Practitioner
note_kind: problem
---

# URL-based access control can be circumvented

## 문제 조건

인증 없는 관리자 패널은 `/admin`에 있지만 프런트엔드가 외부 접근을 차단한다. 백엔드 프레임워크는 `X-Original-URL` 헤더를 지원한다.

## 완료 조건

관리자 패널에 접근해 `carlos`를 삭제한다.

## 문제 설명

앞단의 경로 제한과 백엔드의 실제 경로 해석이 일치하는지 살펴본다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-url-based-access-control-can-be-circumvented)
