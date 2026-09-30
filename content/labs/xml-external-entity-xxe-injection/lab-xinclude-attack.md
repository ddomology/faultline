---
title: "Exploiting XInclude to retrieve files"
tags:
  - portswigger
  - xml-external-entity-xxe-injection
lab_url: "https://portswigger.net/web-security/xxe/lab-xinclude-attack"
difficulty: Practitioner
note_kind: problem
---

# Exploiting XInclude to retrieve files

## 문제 조건과 설명

**주어진 조건**

`Check stock`에 보낸 입력이 서버 측 XML 문서의 일부로 삽입된 뒤 파싱된다. 공격자는 XML 문서 전체를 제어하지 못하므로 DTD를 선언하는 일반적인 XXE 방식은 쓸 수 없다. 문제는 XInclude를 사용하라고 명시한다.

**완료 조건**

삽입한 XInclude 구문으로 서버의 `/etc/passwd` 내용을 가져온다. XML이 파싱되거나 입력이 응답에 나타나는 것과 파일 내용이 실제로 반환되는 것은 구분해야 한다.

**문제 설명과 판단 기준**

전체 XML 문서를 조작할 수 있는 상황과 달리, 여기서는 기존 문서의 한 위치에 들어갈 수 있는 구문을 찾아야 한다. XInclude 처리는 파서가 삽입된 요소를 외부 자원 참조로 해석하는지에 달려 있다. 입력이 텍스트로 이스케이프되는지, XML 요소로 남는지를 먼저 확인하지 않으면 이후 파일 읽기 결과를 판단할 수 없다.

정상 재고 확인 요청에서 제어 가능한 필드와 응답을 확인한다. 작은 XML 요소를 넣어 서버가 이를 문서의 어느 문맥에 배치하는지 살펴보고, XInclude가 처리되는지 시험한다. 최종 응답에 `/etc/passwd` 내용이 있는지 확인한다. 아직 삽입 위치나 성공 구문은 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/lab-xinclude-attack)

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
