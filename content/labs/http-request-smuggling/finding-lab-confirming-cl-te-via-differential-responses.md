---
title: "HTTP request smuggling, confirming a CL.TE vulnerability via differential responses"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/finding/lab-confirming-cl-te-via-differential-responses"
difficulty: Practitioner
note_kind: problem
---

# HTTP request smuggling, confirming a CL.TE vulnerability via differential responses

## 문제 조건과 설명

**주어진 조건**

요청은 프런트엔드와 백엔드 서버를 차례로 통과하며 프런트엔드는 청크 인코딩을 지원하지 않는다. 실습 자체는 HTTP/2도 받지만 공식 설명은 의도된 방법에 HTTP/1 전용 기술이 필요하다고 명시한다. Burp Repeater에서는 요청 속성에서 프로토콜을 바꿀 수 있다.

**완료 조건**

백엔드로 요청을 밀어 넣어 뒤이어 보내는 웹 루트 `/` 요청이 `404 Not Found`를 받게 한다. 첫 요청의 오류나 지연만으로는 후속 요청의 경계가 바뀌었다고 판단하지 않는다.

**문제 설명과 판단 기준**

CL.TE라는 제목은 두 서버가 요청 본문 길이를 서로 다르게 결정하는 경우를 가리킨다. 앞 서버가 본문의 끝으로 본 위치와 뒤 서버가 본 끝이 달라야 다음 요청에 영향이 생긴다. 이 차이는 한 요청의 응답보다 동일한 연결에서 보낸 후속 요청의 응답을 비교할 때 더 분명해진다.

먼저 정상 `/` 요청의 응답을 기준으로 기록한다. HTTP/1 요청에서 길이 헤더와 청크 표기를 바꿔 가며 첫 요청과 후속 `/` 요청의 응답을 한 쌍으로 비교한다. `404`가 안정적으로 재현되는지 확인하고, 실제로 시험한 요청의 바이트 길이도 기록한다. 아직 성공한 경계나 입력은 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/finding/lab-confirming-cl-te-via-differential-responses)

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
