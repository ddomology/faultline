---
title: "Accessing private GraphQL posts"
tags:
  - portswigger
  - graphql-api-vulnerabilities
lab_url: "https://portswigger.net/web-security/graphql/lab-graphql-reading-private-posts"
difficulty: Apprentice
note_kind: problem
---

# Accessing private GraphQL posts

## 문제 조건과 설명

**주어진 조건**

블로그에 비밀번호가 들어 있는 숨겨진 게시물이 있다. 일반 화면에 보이는 게시물 목록만으로는 그 내용이 드러나지 않으며, 이 문제는 GraphQL을 통해 게시물 데이터를 다루는 흐름을 살피는 실습이다.

**완료 조건**

숨겨진 게시물을 찾아 그 안의 비밀번호를 확인하고 실습에 입력한다. 비공개 게시물의 존재나 식별자만 알아내는 것으로는 완료되지 않는다.

**문제 설명과 판단 기준**

브라우저에서 게시물 목록과 상세 화면을 열 때 어떤 GraphQL 요청이 나가는지 먼저 확인한다. 화면에 표시되는 필드와 API 응답의 필드가 다른지, 목록에 없는 게시물을 조회할 수 있는 입력이 있는지 비교하면 탐색 범위를 좁힐 수 있다. 응답에 비밀번호가 실제로 포함되어야 숨겨진 게시물의 내용을 읽었다고 판단할 수 있다.

확인한 요청, 숨겨진 게시물로 판단한 근거, 제출 결과를 아래에 순서대로 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/graphql/lab-graphql-reading-private-posts)

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
