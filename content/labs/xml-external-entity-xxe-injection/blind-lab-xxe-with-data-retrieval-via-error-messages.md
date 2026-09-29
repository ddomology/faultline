---
title: "Exploiting blind XXE to retrieve data via error messages"
tags:
  - portswigger
  - xml-external-entity-xxe-injection
lab_url: "https://portswigger.net/web-security/xxe/blind/lab-xxe-with-data-retrieval-via-error-messages"
difficulty: Practitioner
note_kind: problem
---

# Exploiting blind XXE to retrieve data via error messages

## 문제 조건

`Check stock` 기능이 XML을 파싱하지만 결과는 표시하지 않는다. 다른 도메인의 exploit server에 외부 DTD를 올릴 수 있다.

## 완료 조건

외부 DTD로 `/etc/passwd` 내용이 포함된 오류 메시지를 발생시킨다.

## 문제 설명

정상 응답에 결과가 없으므로 오류 메시지가 파일 내용을 표시하는 관찰 지점이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/blind/lab-xxe-with-data-retrieval-via-error-messages)
