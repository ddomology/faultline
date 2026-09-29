---
title: "CL.0 request smuggling"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/browser/cl-0/lab-cl-0-request-smuggling"
difficulty: Practitioner
note_kind: problem
---

# CL.0 request smuggling

## 문제 조건과 설명

**주어진 조건**

일부 엔드포인트에서 백엔드가 `Content-Length`를 무시한다. 이 때문에 CL.0 요청 밀어넣기가 가능하지만, 취약한 엔드포인트의 경로는 주어지지 않았다. 공식 설명은 이 실습이 실제 연구 사례에 기반한다고 밝힌다.

**완료 조건**

취약한 엔드포인트를 찾은 뒤 백엔드에 `/admin` 요청을 밀어 넣어 `carlos` 사용자를 삭제한다. 특정 경로가 길이를 무시한다는 신호를 찾는 것과 관리자 기능을 실행하는 것은 별개의 단계다.

**문제 설명과 판단 기준**

백엔드가 일부 요청 본문을 읽지 않는다면 공격자가 본문으로 보낸 바이트가 다음 요청의 시작으로 해석될 수 있다. 어떤 경로에서 이런 일이 생기는지 모르는 상태이므로, 여러 엔드포인트의 정상 응답과 본문을 덧붙인 요청의 후속 반응을 비교해야 한다.

정상 요청을 기준으로 후보 경로를 정리하고, 길이가 명시된 본문을 보낸 뒤 이어지는 요청의 반응을 살핀다. 경계 차이가 재현되는 경로에서만 관리자 접근을 시험하고, 삭제 결과까지 확인한다. 아직 취약 경로나 성공 요청은 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/browser/cl-0/lab-cl-0-request-smuggling)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
