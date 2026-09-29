---
title: "2FA bypass using a brute-force attack"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-bypass-using-a-brute-force-attack"
difficulty: Expert
note_kind: problem
---

# 2FA bypass using a brute-force attack

## 문제 조건

이중 인증 코드를 무차별 대입할 수 있다. 피해자 자격 증명은 `carlos:montoya`지만 2FA 코드는 알 수 없다. 시도 중 코드가 재설정될 수 있다.

## 완료 조건

2FA 코드를 알아내 Carlos의 계정 페이지에 접근한다.

## 문제 설명

비밀번호를 통과한 뒤 인증 코드 검증이 충분히 제한되는지 확인한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-bypass-using-a-brute-force-attack)
