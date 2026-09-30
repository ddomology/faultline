---
title: "Detecting server-side prototype pollution without polluted property reflection"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/server-side/lab-detecting-server-side-prototype-pollution-without-polluted-property-reflection"
difficulty: Practitioner
note_kind: problem
---

# Detecting server-side prototype pollution without polluted property reflection

## 문제 조건과 설명

**주어진 조건**

Node.js·Express 서버가 사용자 입력을 안전하지 않게 객체에 병합하지만 오염된 속성이 응답에 직접 반영되지는 않는다. 자신의 계정은 `wiener:peter`다. 공식 문제는 서버 동작에 눈에 띄고 파괴적이지 않은 변화를 만들어 취약점을 확인하는 연습이며, 권한 상승까지 요구하지 않는다.

**완료 조건**

`Object.prototype` 오염으로 서버 동작이 달라졌다는 비파괴적 근거를 확보한다. 응답에 임의 문자열이 보이지 않는다는 이유만으로 실패라고 판단하지 않는다.

**문제 설명과 판단 기준**

먼저 정상 요청의 상태 코드·헤더·본문을 기준으로 잡고 입력이 병합되는 지점을 찾는다. 속성 자체가 노출되지 않으므로 서버가 상속 속성을 읽을 때만 달라지는 안전한 동작을 비교해야 한다. 일시적인 오류나 세션 변화가 아니라 같은 요청을 반복해 재현되는 차이인지 확인한다.

시험이 서버 기능을 손상시킬 수 있다는 공식 경고를 고려해 변화의 범위를 작게 유지한다. 실습 서버가 멈추면 배너에서 재시작할 수 있다. 기준 응답과 달라진 동작, 재현 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/server-side/lab-detecting-server-side-prototype-pollution-without-polluted-property-reflection)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
