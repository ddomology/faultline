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

## 문제 조건과 설명

**주어진 조건**

반사형 XSS가 있지만 허용되는 태그가 일부로 제한되고 모든 이벤트 처리 속성과 앵커의 `href` 속성이 차단된다. 모의 사용자의 클릭을 유도하려면 화면에 보이는 입력에 `Click`이라는 단어를 넣어야 한다. 공식 설명의 링크 예시는 그 문구 형식을 보여 주는 예시이지, 해당 링크가 실행된다는 증거는 아니다.

**완료 조건**

사용자가 표시된 입력을 클릭했을 때 `alert()`가 호출되어야 한다. 이 실습에서는 자동 실행보다 클릭을 일으키는 요소와 표시 문구가 성공 조건에 직접 연결된다.

**문제 설명과 판단 기준**

흔한 `onclick` 속성이나 앵커의 `href`를 사용할 수 없으므로, 태그가 허용되는지와 클릭이 어떤 동작으로 이어지는지를 나눠 관찰해야 한다. 화면에 `Click`이 보이더라도 실제 클릭 가능한 요소로 만들어지지 않거나 실행으로 이어지지 않으면 목표를 만족하지 못한다.

반사 위치를 확인하고 태그·속성별로 차단, 인코딩, DOM 반영을 기록한다. 브라우저가 허용된 요소를 클릭할 때 어떤 기본 동작을 하는지 확인한 다음, 모의 사용자가 클릭할 수 있도록 `Click` 문구가 보이는지도 검사한다. 구체적인 허용 태그나 실행 경로는 아직 관찰되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-event-handlers-and-href-attributes-blocked)

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
