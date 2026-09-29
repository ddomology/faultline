---
title: "Stored XSS into onclick event with angle brackets and double quotes HTML-encoded and single quotes and backslash escaped"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-onclick-event-angle-brackets-double-quotes-html-encoded-single-quotes-backslash-escaped"
difficulty: Practitioner
note_kind: problem
---

# Stored XSS into onclick event with angle brackets and double quotes HTML-encoded and single quotes and backslash escaped

## 문제 조건과 설명

**주어진 조건**

블로그 댓글에 저장형 XSS가 있다. 제목은 저장된 입력이 `onclick` 이벤트 문맥에 놓이고 꺾쇠괄호·큰따옴표가 HTML 인코딩되며 작은따옴표·백슬래시가 이스케이프된다고 알려 준다. 댓글 본문 전체가 동일한 문맥으로 처리된다는 뜻은 아니다.

**완료 조건**

댓글을 제출한 뒤 댓글 작성자 이름을 클릭했을 때 `alert()`가 실행되게 한다. 페이지 로드 시 자동 실행되는 입력은 이 실습의 명시적 판정 동작과 구별해서 기록한다.

**문제 설명과 판단 기준**

입력은 저장·재출력 과정을 거친 다음 HTML 속성 내부의 JavaScript 코드로 해석될 수 있다. 그러므로 폼의 어느 필드가 작성자 링크에 쓰이는지, 서버가 저장한 값과 렌더링된 `onclick` 속성이 어떻게 달라지는지 먼저 밝혀야 한다. 문자를 바꿔 가며 실험할 때는 저장 전에 발생한 변환과 출력 시 인코딩을 구분한다.

댓글 작성 요청과 게시된 댓글의 HTML, 최종 DOM에 있는 작성자 이름의 링크를 순서대로 살핀다. 클릭했을 때 문법 오류만 생기는지 실제 `alert()`가 실행되는지도 확인한다. 실제 저장 결과와 성공 입력은 아직 관찰되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-onclick-event-angle-brackets-double-quotes-html-encoded-single-quotes-backslash-escaped)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
