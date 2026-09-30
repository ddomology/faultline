---
title: "Indirect prompt injection"
tags:
  - portswigger
  - web-llm-attacks
lab_url: "https://portswigger.net/web-security/llm-attacks/lab-indirect-prompt-injection"
difficulty: Practitioner
note_kind: problem
---

# Indirect prompt injection

## 문제 조건과 설명

**주어진 조건**

사이트는 간접 프롬프트 주입에 취약하다. `carlos`는 실시간 채팅에서 `Lightweight "l33t" Leather Jacket`에 관해 자주 묻는다. 따라서 사용자의 직접 지시가 아닌 상품 관련 외부 콘텐츠가 LLM에 전달되는 경로를 살펴야 한다.

**완료 조건**

간접 프롬프트 주입의 결과로 `carlos`가 삭제되게 한다. 공격 문구가 페이지에 게시되거나 채팅 답변에 인용되는 것만으로는 완료되지 않는다.

**문제 설명과 판단 기준**

먼저 상품에 관한 질문에 LLM이 어떤 데이터를 참고하는지 확인하고, 그 데이터 중 수정 가능한 부분을 찾는다. 외부 데이터 안의 문장이 단순한 상품 설명으로 처리되는지, LLM의 다음 행동을 지시하는 명령으로 승격되는지 비교한다. LLM이 삭제를 약속한 경우에도 실제 사용자 관리 작업이 수행됐는지 별도로 확인해야 한다.

통제한 콘텐츠, 채팅에서 관찰한 반응, `carlos` 삭제 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/llm-attacks/lab-indirect-prompt-injection)

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
