---
title: "Exploiting AI agents to perform destructive actions"
tags:
  - portswigger
  - web-llm-attacks
lab_url: "https://portswigger.net/web-security/llm-attacks/ai-powered-scanner-vulnerabilities/lab-indirect-prompt-injection-via-ai-powered-scan"
difficulty: Apprentice
note_kind: problem
---

# Exploiting AI agents to perform destructive actions

## 문제 조건과 설명

**주어진 조건**

사용자 생성 콘텐츠를 조사하는 AI 스캐너가 있고, 인증된 영역을 탐색하도록 `carlos`의 로그인 정보가 제공돼 있다. 자신의 계정은 `wiener:peter`다. 블로그 게시물을 선택해 `Scan site`를 누르면 스캔이 시작된다. 실시간 LLM이라 같은 입력에도 반응이 달라질 수 있다.

**완료 조건**

외부 콘텐츠를 통한 간접 프롬프트 주입으로 스캐너가 `carlos`를 삭제하게 한다. 자신의 세션에서 게시물을 수정하거나 스캔 결과에 삭제라는 말이 나타나는 단계와 실제 계정 삭제는 다르다.

**문제 설명과 판단 기준**

스캐너가 어느 게시물 내용을 읽고 어떤 작업 권한으로 후속 요청을 보내는지 파악한다. 게시물의 지시문이 분석할 데이터로 남는지, 스캐너의 행동을 바꾸는 명령으로 받아들여지는지 응답과 작업 결과로 구분한다. 실시간 모델의 변동성을 고려해 동일한 스캔을 다시 수행하거나 문구를 조정할 때는 각각의 결과를 분리해 기록한다.

게시한 콘텐츠, 스캔 실행, `carlos` 삭제 확인 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/llm-attacks/ai-powered-scanner-vulnerabilities/lab-indirect-prompt-injection-via-ai-powered-scan)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
