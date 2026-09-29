---
title: "DOM XSS in document.write sink using source location.search inside a select element"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink-inside-select-element"
difficulty: Practitioner
note_kind: problem
---

# DOM XSS in document.write sink using source location.search inside a select element

## 문제 조건과 설명

재고 확인 기능에서 브라우저 스크립트가 URL의 `location.search` 값을 읽어 `document.write`로 페이지에 쓴다. 출처와 출력 함수는 21번과 같지만, 이번에는 그 데이터가 **`select` 요소 안에 놓인다**는 조건이 추가된다. 같은 문자열을 써도 주변 HTML 요소에 따라 브라우저가 만드는 DOM은 달라질 수 있다.

### `select` 안이라는 제약

`select`는 선택 항목을 담는 요소다. 입력이 그 안에만 머무르면 의도한 코드가 일반 문서 영역에서 실행되지 않을 수 있다. 공식 완료 조건은 단순히 `document.write`에 값을 전달하는 것이 아니라, **`select` 요소의 문맥을 벗어나 `alert` 함수를 호출하는 것**이다. 따라서 입력 문자열의 표면적인 반사보다, 브라우저가 실제로 어떤 DOM 트리를 만들었는지 확인해야 한다.

문제 설명은 쿼리 파라미터 이름, `document.write`에 붙는 앞뒤 HTML, `select` 안에서 입력이 들어가는 정확한 위치를 알려 주지 않는다. 먼저 정상 재고 확인 요청으로 선택 항목이 어떻게 생성되는지 본 뒤, 표시용 문자열이 DOM의 어느 노드에 들어가는지 확인해야 한다. 그다음 입력을 바꿔도 여전히 `select` 안에만 남는지, 바깥 요소가 만들어지는지, 실제 스크립트가 실행되는지를 나누어 관찰한다.

성공 판정은 선택 목록이 깨지거나 문자열이 표시되는 것만으로 하지 않는다. **`alert`의 실제 호출**과 실습 완료 상태를 확인해야 한다. 아래에는 URL 입력, 실행 후 DOM, 함수 호출 여부를 직접 확인한 결과만 적는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink-inside-select-element)

## 탐색 및 풀이 기록

아직 이 실습의 재고 확인 URL이나 `select` 안팎의 DOM 변화, `alert` 실행을 직접 기록하지 않았다. 확인한 내용을 같은 파일에 이어서 적는다.
