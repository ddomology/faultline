---
title: "Reflected DOM XSS"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-dom-xss-reflected"
difficulty: Practitioner
note_kind: problem
---

# Reflected DOM XSS

## 문제 조건과 설명

이 실습은 **반사형 DOM 취약점**을 보여 준다. 공식 설명은 요청의 데이터를 서버가 처리해 응답에 되돌려 주고, 페이지의 스크립트가 그 반사된 값을 다시 처리한 뒤 위험한 DOM 출력 지점에 쓴다고 설명한다. 취약한 흐름에는 서버와 브라우저의 단계가 모두 있다.

### 단순한 반사형 XSS와 구별할 점

서버 응답에 입력이 포함되었다는 사실만으로 코드가 실행되는 것은 아니다. 원본 응답에서는 안전한 텍스트처럼 보이더라도, 브라우저 스크립트가 그 값을 읽어 위험한 방식으로 DOM에 넣으면 최종 해석이 달라질 수 있다. 반대로 최종 DOM에서 실행 가능한 내용이 보이더라도, **어느 서버 반사 값이 스크립트의 입력이 되었는지** 확인해야 원인을 설명할 수 있다.

따라서 탐색은 하나의 화면만 보는 방식보다 두 단계를 비교하는 방식이 적합하다. 먼저 일반적인 표시 문자열을 요청에 넣어 **서버 원본 응답**의 반사 위치를 찾는다. 다음으로 페이지 스크립트가 그 값을 어디서 읽고 어떤 DOM 요소에 다시 쓰는지, **실행 후 DOM**에서 확인한다. 문제 설명은 요청 파라미터 이름이나 구체적인 위험 출력 함수는 알려 주지 않는다.

**완료 조건은 이 입력 경로를 이용해 `alert()` 함수를 호출하는 것**이다. 문자열 반사나 DOM 변화만으로 완료를 단정하지 않고 실제 함수 호출과 실습 상태를 확인해야 한다. 아래에는 요청, 원본 응답, 스크립트 처리, 최종 DOM과 실행 결과를 차례대로 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-dom-xss-reflected)

## 탐색 및 풀이 기록

아직 이 실습의 요청이나 원본 응답·실행 후 DOM, `alert()` 결과를 직접 기록하지 않았다. 두 처리 단계를 확인한 뒤 같은 파일에 이어서 적는다.
