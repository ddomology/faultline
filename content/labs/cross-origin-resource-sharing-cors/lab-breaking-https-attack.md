---
title: "CORS vulnerability with trusted insecure protocols"
tags:
  - portswigger
  - cross-origin-resource-sharing-cors
lab_url: "https://portswigger.net/web-security/cors/lab-breaking-https-attack"
difficulty: Practitioner
note_kind: problem
---

# CORS vulnerability with trusted insecure protocols

## 문제 조건과 설명

**주어진 조건**

사이트는 프로토콜을 구별하지 않은 채 모든 하위 도메인을 CORS에서 신뢰한다. 자기 계정 `wiener:peter`로 API 흐름을 살펴볼 수 있고, 공격 JavaScript는 exploit server에 올려야 한다.

**완료 조건**

CORS 허용 관계를 이용해 관리자의 API 키를 읽어 확보하고 그 키를 실습에 제출한다. 하위 도메인 이름이 허용 목록에 들어간다는 사실만으로는 관리자 응답을 읽었다고 볼 수 없다.

**문제 설명과 판단 기준**

origin에는 호스트뿐 아니라 스킴과 포트도 포함된다. 프로토콜을 무시하는 허용 판단은 HTTPS 자원에 대한 신뢰 경계를 약하게 만들 수 있다. 다만 어떤 하위 도메인에서 공격 코드를 실행할 수 있는지, 브라우저가 보낸 origin과 서버의 허용 헤더가 어떻게 대응하는지는 직접 관찰해야 한다.

자기 계정으로 API 키 요청과 CORS 헤더를 기록한다. 스킴·하위 도메인을 하나씩 바꾸어 서버의 허용 범위를 확인하고, 실제 브라우저가 인증된 응답을 JavaScript에서 읽을 수 있는지 검증한다. 관리자 키를 확보한 경우에만 제출한다. 아직 사용 가능한 출처나 키는 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cors/lab-breaking-https-attack)

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
