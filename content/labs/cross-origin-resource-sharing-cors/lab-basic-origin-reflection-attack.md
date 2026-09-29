---
title: "CORS vulnerability with basic origin reflection"
tags:
  - portswigger
  - cross-origin-resource-sharing-cors
lab_url: "https://portswigger.net/web-security/cors/lab-basic-origin-reflection-attack"
difficulty: Apprentice
note_kind: problem
---

# CORS vulnerability with basic origin reflection

## 문제 조건과 설명

**주어진 조건**

사이트의 CORS 설정이 모든 origin을 신뢰한다. 자기 계정은 `wiener:peter`로 로그인할 수 있다.

**완료 조건**

관리자 API 키를 가져오는 JavaScript를 exploit server에 올리고, 얻은 키를 제출한다.

**문제 설명**

완료 기준은 관리자 API 키 제출이며 교차 출처 접근 허용이 문제의 핵심 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cors/lab-basic-origin-reflection-attack)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
