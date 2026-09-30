---
title: "Exploiting XXE to retrieve data by repurposing a local DTD"
tags:
  - portswigger
  - xml-external-entity-xxe-injection
lab_url: "https://portswigger.net/web-security/xxe/blind/lab-xxe-trigger-error-message-by-repurposing-local-dtd"
difficulty: Expert
note_kind: problem
---

# Exploiting XXE to retrieve data by repurposing a local DTD

## 문제 조건과 설명

**주어진 조건**

`Check stock` 기능은 XML을 파싱하지만 처리 결과를 표시하지 않는다. 공식 설명은 서버에 이미 있는 DTD 파일을 참조하고 그 파일의 엔티티 하나를 재정의해야 한다고 명시한다. 사용할 DTD 파일과 엔티티 이름은 주어지지 않았다.

**완료 조건**

파서 오류 메시지에 서버의 `/etc/passwd` 내용이 나타나게 한다. DTD 참조 성공, 오류 발생, 목표 파일 내용 표시를 각각 따로 확인해야 한다.

**문제 설명과 판단 기준**

정상 응답에 엔티티 확장 결과가 보이지 않으므로 오류 메시지가 데이터 전달 경로가 된다. 외부 DTD를 새로 호스팅하는 문제와 달리 서버 안의 기존 DTD 구조를 활용해야 한다. 어느 파일을 읽을 수 있고 어떤 엔티티를 재정의할 수 있는지는 파서의 반응을 통해 좁혀 가야 한다.

정상 XML 요청과 파서 오류의 형태를 먼저 기록한다. 로컬 DTD 참조 가능성을 확인하고, 재정의할 수 있는 엔티티와 오류 발생 지점을 단계적으로 탐색한다. 마지막에는 오류 문구에 `/etc/passwd` 내용이 실제로 포함되는지 검증한다. 아직 DTD 경로나 성공 결과는 없다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/blind/lab-xxe-trigger-error-message-by-repurposing-local-dtd)

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
