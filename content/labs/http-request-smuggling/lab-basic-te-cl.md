---
title: "HTTP request smuggling, basic TE.CL vulnerability"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/lab-basic-te-cl"
difficulty: Practitioner
note_kind: problem
---

# HTTP request smuggling, basic TE.CL vulnerability

## 문제 조건과 설명

**주어진 조건**

백엔드는 청크 인코딩을 지원하지 않고 프런트엔드는 `GET`·`POST` 이외의 메서드를 거부한다. 실습은 HTTP/2도 지원하지만 의도된 방식은 HTTP/1을 사용한다. 제목의 TE.CL은 앞 문제와 길이 해석의 방향이 다름을 나타낸다.

**완료 조건**

백엔드가 뒤따르는 요청의 메서드를 `GPOST`로 인식하게 한다. 첫 요청이 통과한 사실이나 단순 오류만으로 요청 경계가 바뀌었다고 판단하지 않는다.

**문제 설명과 판단 기준**

프런트엔드가 허용된 메서드를 보더라도 백엔드가 다른 본문 끝을 계산하면 이어지는 바이트가 새 요청과 합쳐질 수 있다. 이 문제의 증거는 관리 기능 접근이 아니라 후속 요청이 `GPOST`라는 비정상 메서드로 해석되는 현상이다. CL.TE 문제와 같은 결과를 목표로 하더라도 입력 구성은 관찰에 맞춰 다시 판단해야 한다.

정상 메서드 요청과 거부 반응을 기준으로 둔다. HTTP/1에서 길이·청크 정보를 하나씩 바꾸고 동일 연결의 후속 응답을 비교한다. `GPOST` 반응이 재현되는지와 사용한 바이트 수를 함께 기록한다. 아직 성공한 길이 조합은 없다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/lab-basic-te-cl)

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
