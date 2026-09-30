---
title: "Blind SSRF with out-of-band detection"
tags:
  - portswigger
  - server-side-request-forgery-ssrf
lab_url: "https://portswigger.net/web-security/ssrf/blind/lab-out-of-band-detection"
difficulty: Practitioner
note_kind: problem
---

# Blind SSRF with out-of-band detection

## 문제 조건과 설명

**주어진 조건**

상품 페이지가 열릴 때 분석 소프트웨어가 요청의 `Referer` 헤더에 있는 URL을 가져온다. 이 내부 요청 결과는 상품 페이지 응답에 보이지 않는다. 실습 방화벽 때문에 외부 상호작용에는 Burp Collaborator의 기본 공개 서버를 사용해야 한다.

**완료 조건**

해당 기능이 공개 Burp Collaborator 서버에 HTTP 요청을 보내게 한다. `Referer` 문자열이 요청에 들어갔다는 사실만으로는 분석 서버가 실제로 그 URL을 가져왔다는 증거가 되지 않는다.

**문제 설명과 판단 기준**

일반적인 재고 확인 SSRF와 달리 입력 지점이 상품 페이지 요청 헤더이고, 결과를 읽는 대신 외부 수신 기록으로 서버 측 요청을 확인한다. 브라우저가 보낸 요청과 분석 소프트웨어가 만든 후속 요청을 분리해 보는 것이 중요하다.

상품 페이지를 불러오는 정상 요청과 `Referer` 값을 확인한다. Collaborator에서 고유 주소를 준비해 헤더를 바꾸고, 상품 페이지 응답과 Collaborator의 HTTP 수신 기록을 대조한다. 아직 외부 요청이 관찰되었다고 기록하지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/ssrf/blind/lab-out-of-band-detection)

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
