---
title: "Bypassing access controls using email address parsing discrepancies"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-bypassing-access-controls-using-email-address-parsing-discrepancies"
difficulty: Expert
note_kind: problem
---

# Bypassing access controls using email address parsing discrepancies

## 문제 조건과 설명

**주어진 조건**

가입 기능은 허용되지 않은 도메인의 이메일 주소를 차단하지만, 검증 로직과 이메일 주소를 해석하는 라이브러리가 서로 다른 결과를 낸다. 공식 문제는 PortSwigger Research의 Gareth Heyes가 쓴 ‘Splitting the Email Atom: Exploiting Parsers to Bypass Access Controls’ 백서의 기법을 이해해야 한다고 명시한다. 여기서는 특정 주소 형식을 아직 검증된 답으로 전제하지 않는다.

**완료 조건**

해석 차이를 이용해 계정을 등록하고 `carlos`를 삭제한다. 가입 폼의 검사를 통과하는 것과 서버가 그 계정을 관리 권한이 있는 주소로 인식하는 것은 다른 단계다.

**문제 설명과 판단 기준**

정상 이메일 주소의 가입 요청과 검증 오류를 먼저 비교해 허용 도메인 규칙을 파악한다. 이후 하나의 주소를 검증 코드와 이메일 파서가 다르게 분해할 수 있는지 응답과 계정 정보로 확인해야 한다. 어떤 계층이 도메인을 판단하고 어떤 계층이 최종 계정 주소를 저장하는지 분리하면 권한 차이가 생기는 위치를 찾을 수 있다.

등록 성공 뒤 관리자 기능 접근과 `carlos` 삭제를 각각 검증한다. 입력 주소, 검증 결과, 저장된 계정 해석을 아래에 순서대로 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-bypassing-access-controls-using-email-address-parsing-discrepancies)

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
