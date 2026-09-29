---
title: "Reflected XSS in a JavaScript URL with some characters blocked"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-url-some-characters-blocked"
difficulty: Expert
note_kind: problem
---

# Reflected XSS in a JavaScript URL with some characters blocked

## 문제 조건과 설명

**주어진 조건**

사용자 입력이 JavaScript URL에 반사되며 애플리케이션은 일부 문자를 차단한다. 겉으로는 단순한 URL 문맥처럼 보일 수 있지만, 어떤 문자가 막히고 반사된 값이 어떤 요소에 들어가는지는 직접 확인해야 한다.

**완료 조건**

`alert()`를 호출하되 경고 메시지 어딘가에 `1337`이 포함되어야 한다. 경고창만 표시되거나 `1337`이 페이지에 단순 출력되는 것은 목표와 다르다.

**문제 설명과 판단 기준**

JavaScript URL은 일반 텍스트 URL과 달리 브라우저가 해당 링크를 사용하는 순간 코드로 해석될 수 있다. 그런데 문자 차단이 있으면 스크립트 문법뿐 아니라 URL 인코딩과 속성 렌더링도 영향을 준다. 차단된 문자가 요청 단계에서 거절되는지, 응답에서 변형되는지, DOM에서 바뀌는지를 구별해야 한다.

먼저 입력이 놓인 URL의 전체 속성과 실행 계기를 확인한다. 짧은 문자별 실험으로 서버 응답과 최종 DOM을 비교하고, 브라우저 동작을 검증한다. 마지막에는 `alert()` 인수의 실제 값에 `1337`이 들어 있는지 확인한다. 차단 목록이나 통과한 입력은 아직 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-url-some-characters-blocked)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
