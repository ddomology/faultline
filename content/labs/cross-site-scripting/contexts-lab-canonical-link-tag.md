---
title: "Reflected XSS in canonical link tag"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-canonical-link-tag"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS in canonical link tag

## 문제 조건과 설명

**주어진 조건**

입력값이 `canonical` 링크 태그에 반사되며 꺾쇠괄호는 이스케이프된다. 모의 사용자는 `ALT+SHIFT+X`, `CTRL+ALT+X`, `Alt+X` 중 하나를 누르고 Chrome을 사용한다.

**완료 조건**

홈페이지의 속성 문맥에 입력을 넣어 `alert` 함수를 호출한다.

**문제 설명**

링크 태그의 속성과 지정된 키 입력이 실행 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-canonical-link-tag)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
