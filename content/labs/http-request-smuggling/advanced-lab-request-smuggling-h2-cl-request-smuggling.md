---
title: "H2.CL request smuggling"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-h2-cl-request-smuggling"
difficulty: Practitioner
note_kind: problem
---

# H2.CL request smuggling

## 문제 조건과 설명

**주어진 조건**

프런트엔드는 길이가 모호한 HTTP/2 요청을 HTTP/1로 다운그레이드한다. 모의 피해자는 10초마다 홈 페이지를 방문한다. 제목은 H2.CL 요청 경계 차이를 단서로 준다.

**완료 조건**

피해자 브라우저가 exploit server의 악성 JavaScript 파일을 불러와 실행하고 `alert(document.cookie)`를 호출하게 한다. 외부 파일 요청만 발생하거나 내 브라우저에서만 실행되는 것은 목표와 다르다.

**문제 설명과 판단 기준**

문제가 되는 길이 정보는 HTTP/2 프런트엔드가 백엔드용 HTTP/1 요청으로 변환할 때 경계를 모호하게 만들 수 있다. 그 결과가 피해자의 정기적인 홈 페이지 응답에 영향을 주는지 확인해야 한다. 요청 밀어넣기 성공, 피해자 응답 변경, 외부 스크립트 로드, 쿠키 경고창 실행은 단계별 증거가 필요하다.

먼저 정상 홈 페이지 응답과 H2 요청의 다운그레이드 반응을 기록한다. exploit server에 테스트용 스크립트를 준비하고 10초 간격의 피해자 방문을 고려해 응답 변화를 관찰한다. 최종적으로 피해자 측 `alert(document.cookie)` 실행을 확인한다. 아직 성공한 경계나 피해자 실행 기록은 없다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-h2-cl-request-smuggling)

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
