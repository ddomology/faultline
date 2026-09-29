---
title: "Basic SSRF against another back-end system"
tags:
  - portswigger
  - server-side-request-forgery-ssrf
lab_url: "https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-backend-system"
difficulty: Apprentice
note_kind: problem
---

# Basic SSRF against another back-end system

## 문제 조건과 설명

**주어진 조건**

재고 확인 기능이 서버 측에서 내부 시스템에 요청한다. 관리 화면은 내부 `192.168.0.X` 범위의 어떤 호스트에서 8080 포트로 제공되지만, 정확한 호스트 번호는 주어지지 않는다.

**완료 조건**

재고 확인 기능으로 해당 범위를 탐색해 관리 화면을 찾고 `carlos` 사용자를 삭제한다. 응답 차이로 내부 호스트를 추정하는 단계와 삭제 완료는 구분해서 기록한다.

**문제 설명과 판단 기준**

이 문제는 알려진 `localhost` 주소로 바로 가는 앞선 유형과 달리 내부 주소를 먼저 찾아야 한다. 서버가 접근할 수 있는 주소의 응답 상태·내용·오류를 비교하면 관리 화면이 있는 호스트를 좁힐 수 있다. 다만 단순 연결 가능성만으로 관리 기능이 있다는 결론을 내리면 안 된다.

정상 재고 확인 요청에서 URL 필드를 찾고, `192.168.0.X:8080` 범위를 일정한 방식으로 시험해 응답을 기록한다. 관리 화면을 확인한 주소에서 삭제 경로를 파악한 뒤 `carlos` 삭제 결과를 검증한다. 아직 내부 호스트 번호나 성공 요청은 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-backend-system)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
