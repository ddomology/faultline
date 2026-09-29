---
title: "Exploiting blind XXE to exfiltrate data using a malicious external DTD"
tags:
  - portswigger
  - xml-external-entity-xxe-injection
lab_url: "https://portswigger.net/web-security/xxe/blind/lab-xxe-with-out-of-band-exfiltration"
difficulty: Practitioner
note_kind: problem
---

# Exploiting blind XXE to exfiltrate data using a malicious external DTD

## 문제 조건과 설명

**주어진 조건**

`Check stock` 기능은 XML 입력을 파싱하지만 처리 결과는 표시하지 않는다. 실습에서는 제공된 exploit server와 Burp Collaborator 기본 공개 서버 중 하나 또는 둘 다를 외부 상호작용에 사용할 수 있다. 제목은 외부 DTD를 이용한 유출을 단서로 준다.

**완료 조건**

서버의 `/etc/hostname` 파일 내용을 외부로 유출한다. 단순한 DNS 조회나 HTTP 접속은 XXE 실행의 증거일 수 있지만 파일 내용 유출의 증거는 아니다.

**문제 설명과 판단 기준**

응답 본문에 파싱 결과가 없는 환경에서는 파일 읽기와 외부 전송을 별도로 연결해야 한다. 외부 DTD를 가져올 수 있는지, 파일 값이 파서 내부에서 사용되는지, 그 값이 외부 요청에 실려 도착하는지를 순서대로 확인하는 편이 정확하다. 어떤 서버를 DTD 제공과 수신에 쓸지는 관찰 결과로 정한다.

정상 XML 요청을 확인한 뒤 외부 DTD 로딩과 외부 요청을 독립적으로 시험한다. 이후 수신 기록에 `/etc/hostname`의 실제 내용이 포함되는지 확인한다. 현재 DTD 처리 결과나 파일 유출 기록은 없다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/blind/lab-xxe-with-out-of-band-exfiltration)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
