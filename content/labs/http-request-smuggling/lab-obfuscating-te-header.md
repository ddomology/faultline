---
title: "HTTP request smuggling, obfuscating the TE header"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/lab-obfuscating-te-header"
difficulty: Practitioner
note_kind: problem
---

# HTTP request smuggling, obfuscating the TE header

## 문제 조건과 설명

**주어진 조건**

프런트엔드와 백엔드가 중복된 HTTP 요청 헤더를 서로 다르게 처리한다. 프런트엔드는 `GET`·`POST` 이외의 메서드를 거부한다. 실습은 HTTP/2도 받지만 의도된 공격은 HTTP/1에서만 가능한 요청 형식을 사용한다.

**완료 조건**

중복 헤더 처리 차이를 이용해 백엔드가 다음 요청의 메서드를 `GPOST`로 인식하게 한다. 헤더가 수락되었다는 사실과 후속 요청이 바뀌었다는 사실을 구분해야 한다.

**문제 설명과 판단 기준**

요청 길이에 관여하는 헤더가 두 서버에서 서로 다르게 해석되면 같은 바이트를 두고도 본문 끝에 대한 판단이 달라진다. 이 문제는 단순 CL.TE나 TE.CL과 달리 중복 헤더의 우선순위와 정규화가 핵심이다. 정확히 어떤 표기가 통과하는지는 공식 설명에 없다.

정상 헤더와 중복 헤더를 보낸 요청의 반응을 비교해 두 서버가 같은 값을 선택하는지 조사한다. HTTP/1에서 길이 해석 차이가 나타나면 후속 요청의 메서드를 확인한다. `GPOST`가 백엔드 반응으로 재현될 때만 성공으로 기록한다. 아직 통과한 헤더 표기는 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/lab-obfuscating-te-header)

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
