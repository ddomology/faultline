---
title: "Bypassing access controls via HTTP/2 request tunnelling"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/request-tunnelling/lab-request-smuggling-h2-bypass-access-controls-via-request-tunnelling"
difficulty: Expert
note_kind: problem
---

# Bypassing access controls via HTTP/2 request tunnelling

## 문제 조건

프런트엔드는 HTTP/2를 다운그레이드하면서 헤더 이름을 충분히 정리하지 않는다. 백엔드 연결을 재사용하지 않아 일반적인 요청 밀어넣기와는 다른 요청 터널링에 취약하다.

## 완료 조건

`administrator`로 `/admin`에 접근해 `carlos`를 삭제한다.

## 문제 설명

연결 재사용이 없어도 한 요청 내부의 해석 차이로 접근 제한을 넘을 수 있는지 살펴본다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/request-tunnelling/lab-request-smuggling-h2-bypass-access-controls-via-request-tunnelling)
