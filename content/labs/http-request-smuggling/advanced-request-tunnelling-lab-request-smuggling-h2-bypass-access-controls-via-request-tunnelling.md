---
title: "Bypassing access controls via HTTP/2 request tunnelling"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/request-tunnelling/lab-request-smuggling-h2-bypass-access-controls-via-request-tunnelling"
difficulty: Expert
note_kind: problem
---

# Bypassing access controls via HTTP/2 request tunnelling

## 문제 조건과 설명

**주어진 조건**

프런트엔드는 HTTP/2를 HTTP/1로 다운그레이드하면서 들어온 헤더 이름을 충분히 정리하지 않는다. 프런트엔드는 백엔드 연결을 재사용하지 않으므로 후속 사용자 요청과 연결을 공유하는 고전적 요청 밀어넣기는 통하지 않는다. 대신 요청 터널링이 가능한 조건이다.

**완료 조건**

관리자 사용자로 `/admin`에 접근해 `carlos`를 삭제한다. 관리자 화면 노출만으로는 삭제가 끝난 것이 아니고, 일반 사용자 권한의 응답과 관리자 권한의 응답도 구별해야 한다.

**문제 설명과 판단 기준**

연결 재사용이 없다는 조건은 공격을 포기할 이유가 아니라 관찰 지점이 한 번의 프런트엔드 요청 내부로 바뀐다는 뜻이다. 다운그레이드된 요청에서 헤더 이름이 백엔드에 어떻게 전달되는지 확인하고, 하나의 외부 요청 안에 숨은 요청이 처리될 여지를 살펴야 한다.

정상 HTTP/2 요청의 헤더와 관리자 접근 차단 반응을 기록한다. 헤더 이름의 변형이 다운그레이드 결과를 바꾸는지 작은 입력으로 검증하고, 같은 외부 요청에서 백엔드의 추가 응답을 관찰한다. 관리자 권한 접근과 삭제 결과를 각각 확인한다. 아직 성공한 터널이나 관리자 응답은 없다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/request-tunnelling/lab-request-smuggling-h2-bypass-access-controls-via-request-tunnelling)

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
