---
title: "DOM-based cookie manipulation"
tags:
  - portswigger
  - dom-based-vulnerabilities
lab_url: "https://portswigger.net/web-security/dom-based/cookie-manipulation/lab-dom-cookie-manipulation"
difficulty: Practitioner
note_kind: problem
---

# DOM-based cookie manipulation

## 문제 조건과 설명

**주어진 조건**

사이트에는 브라우저 측 코드가 쿠키를 조작하는 취약점이 있다. 그 쿠키는 다른 페이지에서 XSS를 일으키는 데 쓰이며, 피해자를 필요한 페이지들로 안내할 때 exploit server를 사용해야 한다.

**완료 조건**

공격자가 의도한 쿠키를 피해자 브라우저에 설정한 뒤, 이를 읽는 다른 페이지에서 XSS가 발생해 `print()`가 호출되어야 한다. 쿠키가 저장되었다는 사실과 두 번째 페이지에서 실행된 결과를 따로 증명해야 한다.

**문제 설명과 판단 기준**

이 문제는 한 페이지에서 입력이 쿠키에 저장되고 다른 페이지에서 그 쿠키가 위험한 문맥에 사용되는 두 단계 흐름이다. 첫 페이지에서 쿠키 값이 원하는 형태로 들어가더라도, 쿠키의 경로·범위나 다음 페이지의 읽기 방식에 따라 실행 여부가 달라질 수 있다.

쿠키를 쓰는 스크립트와 쿠키를 읽는 페이지를 각각 찾는다. 첫 방문 뒤 브라우저 저장소의 쿠키 값을 확인하고, exploit server가 유도하는 다음 방문에서 DOM과 `print()` 실행 여부를 검사한다. 아직 쿠키 이름, 두 페이지의 이동 순서, 성공 입력은 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/dom-based/cookie-manipulation/lab-dom-cookie-manipulation)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
