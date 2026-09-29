---
title: "Blind XXE with out-of-band interaction"
tags:
  - portswigger
  - xml-external-entity-xxe-injection
lab_url: "https://portswigger.net/web-security/xxe/blind/lab-xxe-with-out-of-band-interaction"
difficulty: Practitioner
note_kind: problem
---

# Blind XXE with out-of-band interaction

## 문제 조건과 설명

**주어진 조건**

`Check stock` 기능이 XML을 파싱하지만 결과를 화면에 표시하지 않는다. XML 파서의 외부 통신으로 취약점을 확인할 수 있다. 실습 방화벽 때문에 외부 상호작용에는 Burp Collaborator의 기본 공개 서버를 사용해야 한다.

**완료 조건**

XML 외부 엔티티로 파서가 Burp Collaborator에 DNS 조회와 HTTP 요청을 하게 만든다. 재고 확인 응답의 상태만으로는 보이지 않는 파서 동작을 판단할 수 없다.

**문제 설명과 판단 기준**

블라인드 XXE는 외부 엔티티가 평가되어도 그 값이 HTTP 응답에 직접 드러나지 않는 유형이다. 그래서 실습 서버 밖에서 관찰되는 요청이 핵심 증거다. DNS 조회와 HTTP 요청은 서로 다른 단계일 수 있으므로 어느 상호작용이 도착했는지 각각 기록해야 한다.

정상 XML 요청을 캡처해 파서가 읽는 입력을 확인한다. Collaborator에서 고유한 주소를 준비해 외부 엔티티 참조를 시험하고, 실습 응답과 Collaborator의 DNS·HTTP 기록을 대조한다. 아직 외부 요청이 관찰되었다고 기록하지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/blind/lab-xxe-with-out-of-band-interaction)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
