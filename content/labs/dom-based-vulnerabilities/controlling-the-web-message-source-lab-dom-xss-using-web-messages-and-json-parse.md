---
title: "DOM XSS using web messages and JSON.parse"
tags:
  - portswigger
  - dom-based-vulnerabilities
lab_url: "https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages-and-json-parse"
difficulty: Practitioner
note_kind: problem
---

# DOM XSS using web messages and JSON.parse

## 문제 조건과 설명

**주어진 조건**

대상 사이트가 웹 메시지를 받아 JSON으로 파싱한다. 공격 HTML은 exploit server에 작성한다. 파싱 뒤 어떤 속성을 읽고 어디에 쓰는지는 공식 설명만으로 알 수 없다.

**완료 조건**

exploit server에서 보낸 메시지가 대상 페이지의 JSON 처리 경로를 거쳐 `print()`를 호출해야 한다. 유효한 JSON을 보냈거나 파싱 오류가 사라졌다는 사실은 중간 단계에 해당한다.

**문제 설명과 판단 기준**

이 문제에서는 메시지 전달과 JSON 구문 해석이 별도의 관문이다. 문자열이 JSON으로 파싱되더라도 프로그램이 기대하는 키와 자료형에 맞지 않으면 이후 코드에 도달하지 못할 수 있다. 반대로 파싱된 값이 DOM에 들어가더라도 실제 실행으로 이어지는지는 브라우저에서 확인해야 한다.

대상 페이지의 `message` 수신 코드에서 `JSON.parse`의 입력과 후속 사용 지점을 읽는다. 단순한 유효 JSON으로 메시지 수신과 파싱을 확인한 뒤, 필드별 값을 바꾸며 DOM 변화·오류·`print()` 호출을 기록한다. 아직 요구되는 JSON 구조나 성공 값은 직접 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages-and-json-parse)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
