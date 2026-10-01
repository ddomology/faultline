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

## 문제 조건과 설명

**주어진 조건**

`Check stock` 기능은 XML을 파싱하지만 예상 밖 값을 응답에 표시하지 않고 일반 외부 엔티티가 포함된 요청을 차단한다. 문제는 XML 매개변수 엔티티를 사용하라고 명시한다. 외부 요청의 대상은 Burp Collaborator의 기본 공개 서버로 제한된다.

**완료 조건**

매개변수 엔티티를 통해 XML 파서가 Burp Collaborator에 DNS 조회와 HTTP 요청을 보내게 한다. 일반 엔티티 차단을 피했다는 사실과 실제 외부 통신이 발생한 사실을 분리해 확인해야 한다.

**문제 설명과 판단 기준**

매개변수 엔티티는 XML DTD 안에서 사용되는 엔티티로, 문서 본문에서 쓰는 일반 엔티티와 위치와 문법이 다르다. 따라서 차단된 일반 엔티티 요청의 결과를 그대로 적용할 수 없다. 파서가 DTD를 처리하는지와 외부 주소를 불러오는지를 관찰해야 한다.

먼저 정상 XML 요청과 일반 엔티티 차단 반응을 기록한다. 이후 DTD에서 매개변수 엔티티를 단계적으로 시험하며 오류·차단·정상 처리 여부를 구별한다. Collaborator에서 DNS와 HTTP 상호작용을 각각 확인하기 전에는 성공으로 적지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/blind/lab-xxe-with-out-of-band-interaction-using-parameter-entities)

## 탐색 및 풀이 기록

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
