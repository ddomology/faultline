---
title: "HTTP request smuggling, basic CL.TE vulnerability"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/lab-basic-cl-te"
difficulty: Practitioner
note_kind: problem
---

# HTTP request smuggling, basic CL.TE vulnerability

## 문제 조건과 설명

**주어진 조건**

프런트엔드는 청크 인코딩을 지원하지 않고 `GET`과 `POST` 이외의 메서드를 거부한다. 실습은 HTTP/2도 받지만 공식 설명의 의도된 방식은 HTTP/1 전용 기술을 사용한다. 제목은 CL.TE 길이 해석 차이를 단서로 준다.

**완료 조건**

백엔드가 다음 요청의 메서드를 `GPOST`로 인식하게 한다. 프런트엔드가 잘못된 메서드를 직접 허용하거나 첫 요청에 오류가 나는 것과 후속 요청의 메서드 변형은 다르다.

**문제 설명과 판단 기준**

이 실습의 `GPOST`는 실제 기능 호출보다 요청 경계가 어긋났다는 관찰 가능한 신호다. 프런트엔드는 정상적인 `GET` 또는 `POST`를 검사하지만 백엔드가 본문 일부를 다음 요청의 앞부분으로 읽으면 다른 메서드 문자열이 만들어질 수 있다.

먼저 정상 요청과 프런트엔드의 메서드 거부 반응을 기록한다. HTTP/1에서 본문 길이와 청크 경계를 바꾼 요청을 보내고 뒤이은 요청의 메서드가 어떻게 해석되는지 비교한다. 실제 백엔드 반응에서 `GPOST`가 확인될 때만 완료로 적는다. 아직 성공한 요청 구성은 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/lab-basic-cl-te)

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
