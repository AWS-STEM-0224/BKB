---
sidebar_position: 4
---
# QnA

---

### 주의할 점 및 문제해결

슬랙에 설치한 챗봇에 질문 후 에러 발생 시 아래를 참고해주세요.

#### 타임아웃 문제
```
    "operation_timeout" 에러시
   - SlackAIResponder Lambda 제한 시간을 60초로 설정
```

#### 권한 문제
```
   "AccessDeniedException" 에러시
   - Bedrock 권한 추가
   - SlackInvokeLambda 호출 권한 확인
```