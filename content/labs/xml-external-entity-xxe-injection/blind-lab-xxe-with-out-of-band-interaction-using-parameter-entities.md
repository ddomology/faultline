---
title: "Blind XXE with out-of-band interaction via XML parameter entities"
tags:
  - portswigger
  - xml-external-entity-xxe-injection
lab_url: "https://portswigger.net/web-security/xxe/blind/lab-xxe-with-out-of-band-interaction-using-parameter-entities"
difficulty: Practitioner
note_kind: problem
---

# Blind XXE with out-of-band interaction via XML parameter entities

## 문제 조건

`Check stock` 기능이 XML을 파싱하지만 예상 밖 값을 보여 주지 않고 일반 외부 엔티티가 포함된 요청을 차단한다. 외부 상호작용은 기본 공개 Burp Collaborator 서버로 제한된다.

## 완료 조건

매개변수 엔티티를 사용해 XML 파서가 Burp Collaborator에 DNS 조회와 HTTP 요청을 보내게 한다.

## 문제 설명

일반 엔티티가 막힌 블라인드 XXE 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/blind/lab-xxe-with-out-of-band-interaction-using-parameter-entities)
