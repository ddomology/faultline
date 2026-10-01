---
title: "HTTP request smuggling, confirming a TE.CL vulnerability via differential responses"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/finding/lab-confirming-te-cl-via-differential-responses"
difficulty: Practitioner
note_kind: problem
---

# HTTP request smuggling, confirming a TE.CL vulnerability via differential responses

## 문제 조건과 설명

**주어진 조건**

프런트엔드와 백엔드 서버가 있으며 백엔드는 청크 인코딩을 지원하지 않는다. 제목의 TE.CL은 앞선 CL.TE와 길이 해석의 방향이 다름을 나타낸다. 실습은 HTTP/2도 지원하지만 의도된 방법은 HTTP/1 요청을 사용한다.

**완료 조건**

백엔드로 요청을 밀어 넣어 그다음 웹 루트 `/` 요청의 응답이 `404 Not Found`가 되게 한다. 청크 구문이 거절되거나 첫 요청에만 오류가 나는 현상과 후속 요청 오염을 구별해야 한다.

**문제 설명과 판단 기준**

두 서버가 서로 다른 길이 정보를 채택하면 한 서버가 끝냈다고 생각한 본문을 다른 서버는 이어서 읽을 수 있다. TE.CL 유형에서는 어느 쪽이 청크 표기를 해석하는지가 CL.TE와 반대이므로, 앞 문제의 반응을 그대로 예상하지 말고 실제 응답을 기준으로 판단한다.

정상 `/` 요청의 응답을 확보하고 HTTP/1에서 길이와 청크 경계를 바꿔 시험한다. 매 시도마다 앞 요청과 뒤이은 `/` 요청의 응답을 짝지어 기록하고, 바이트 수와 연결 상태를 함께 확인한다. 후속 요청의 `404`가 재현될 때만 목표 달성으로 적는다. 아직 성공한 요청은 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/finding/lab-confirming-te-cl-via-differential-responses)

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
