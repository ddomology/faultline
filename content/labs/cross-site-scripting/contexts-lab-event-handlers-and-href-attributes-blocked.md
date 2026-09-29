---
title: "Reflected XSS with event handlers and href attributes blocked"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-event-handlers-and-href-attributes-blocked"
difficulty: Expert
note_kind: problem
---

# Reflected XSS with event handlers and href attributes blocked

## 문제 조건

반사형 XSS 입력에서 일부 태그만 허용되며 이벤트 속성과 앵커의 `href`는 차단된다. 모의 사용자의 클릭을 유도하려면 보이는 문구에 `Click`이 있어야 한다.

## 완료 조건

클릭했을 때 `alert` 함수를 호출하는 입력을 표시한다.

## 문제 설명

자동 실행보다 지정된 클릭 문구와 사용자 동작이 핵심 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-event-handlers-and-href-attributes-blocked)
