---
sidebar_position: 2
---
# 실습 ② - Slack 챗봇 만들기

#### STEP1 Slack Workspace 생성

실습으로 생성될 슬랙봇을 설치할 워크스페이스를 만들어야 합니다.
기존 워크 스페이스를 사용해도 되고 새로 만들어도 됩니다.

OPTIONAL Slack Workspace 새로 만들기
[Image: Image.jpg][Image: image.png]

1. 이메일 입력 후 이메일로 온 코드 입력
2. 워크 스페이스 이름 입력 > 나의 이름 입력 > 추가 초대 Skip > Start with the Limited Free Version
    

#### STEP2 Slack 앱 생성 및 권한 받기

1. https://api.slack.com/ 에 접속하여 로그인한다.
2. 우측 상단의 Your app 클릭.
<!-- [Image: image.png]  -->
3. “Create New App”을 클릭한다
<!-- [Image: Image.jpg][Image: Screenshot 2025-02-19 at 4.35.59 PM.png]4.  -->
“From Scratch”를 클릭한 후 App Name에 내가 원하는 챗봇의 이름을 지정해준다. (나중에 변경 가능)
Create App 클릭 


#### STEP3 Lambda 함수 생성

AWS 콘솔에서 Lambda https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions 검색 후 함수 생성
   - 함수 이름: SlackAIResponder
   - 런타임: Python 3.10
   - 아키텍처: x86_64
함수 생성
코드 소스에 해당 코드를 붙여넣기

```
import json
import boto3
import urllib3

# 초기화
http = urllib3.PoolManager()
bedrock_client = boto3.client('bedrock-agent-runtime', region_name='**us-west-2**') # 본인이 환경을 구성한 Region으로 변경

def lambda_handler(event, context):
    try:
        question = event.get('question')
        response_url = event.get('response_url')

        # Bedrock 호출
        response = bedrock_client.retrieve_and_generate(
            input={'text': question},
            retrieveAndGenerateConfiguration={
                'type': 'KNOWLEDGE_BASE',
                'knowledgeBaseConfiguration': {
                    'knowledgeBaseId': '**ABCDEF1G2**', # 본인의 KnowledgeBase Id 로 변경
                    'modelArn': 'arn:aws:bedrock:**us-west-2**::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0'
                }                               
            }
        )
        
        # 응답 처리
        ai_response = response.get('output', '응답을 생성할 수 없습니다.')
        if isinstance(ai_response, dict) and 'text' in ai_response:
            ai_response = ai_response['text']
        
        # Slack으로 응답 전송
        http.request(
            'POST',
            response_url,
            body=json.dumps({
                "response_type": "in_channel",
                "text": f"*답변:*\n{ai_response}"
            }).encode('utf-8'),
            headers={'Content-Type': 'application/json'},
            timeout=5.0
        )

        return {"statusCode": 200}

    except Exception as e:
        return {"statusCode": 500}

```

이때 본인이 생성한 Bedrock 지식 기반의 ID로 변경 https://us-west-2.console.aws.amazon.com/bedrock/home?region=us-west-2#/knowledge-bases/knowledge-base-quick-start-c840m/BXDXBAFGAU/1

다시 SlackAIResponder 람다 함수로 돌아와서https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/SlackAIResponder?newFunction=true&tab=configure 구성 > 편집 클립
제한시간을 1분으로 변경 후 저장
다시 구성에서 권한 > 역할 이름의 링크 클릭
권한 추가 > 정책 연결 클릭
AmazonBedrockFullAccess 검색 후 권한 추가
다시 람다함수 생성으로 돌아와서 두번째 람다함수 SlackInitialResponder 생성 https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions
코스 소스에 해당 코드 붙여넣기

```
import json
import boto3
import base64
from urllib.parse import parse_qs

# Lambda 클라이언트 초기화
lambda_client = boto3.client('lambda')

def lambda_handler(event, context):
    try:
        # Base64 디코딩
        if event.get('isBase64Encoded', False):
            body_str = base64.b64decode(event['body']).decode('utf-8')
        else:
            body_str = event.get('body', '')
        
        # URL 디코딩 및 파싱
        body = parse_qs(body_str)
        
        # 텍스트와 response_url 추출
        text = body.get('text', [''])[0]
        response_url = body.get('response_url', [''])[0]

        if not text:
            return {
                "statusCode": 200,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({
                    "response_type": "ephemeral",
                    "text": "질문을 입력해주세요. 예: /ask 테스트"
                })
            }

        # SlackAIResponder로 전달할 payload
        payload = {
            'question': text,
            'response_url': response_url
        }

        # SlackAIResponder 호출
        lambda_client.invoke(
            FunctionName='**SlackAIResponder**', # 본인이 설정한 Lambda Function 이름으로 변경
            InvocationType='Event',
            Payload=json.dumps(payload)
        )

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "response_type": "in_channel",
                "text": f"'{text}' 에 대한 답변을 생성하고 있습니다..."
            })
        }

    except Exception as e:
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "response_type": "ephemeral",
                "text": "요청 처리 중 오류가 발생했습니다."
            })
        }
```

SlackInitialResponder 람다함수도 동일하게 구성 > 권한 > 역할 이름 링크 클릭
이번에는 권한 추가에서 인라인 정책 생성 클릭

* SlackAIResponder Lambda를 호출하기 위해 필요

JSON 클릭후 해당 코드를 붙여넣기

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "lambda:InvokeFunction"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
```

'다음' 클릭
정책 이름 입력: "SlackAIResponderInvoke"
'정책 생성' 클릭

#### STEP4 API Gateway 설정하기

AWS console에서 api gateway 접속 후 HTTP API 구축 클릭 [https://us-west-2.console.aws.amazon.com/apigateway/main/apis?region=us-west-2#](https://us-west-2.console.aws.amazon.com/apigateway/main/apis?region=us-west-2)
이름 입력후 (AUSG_API) 나머지 단계 모두 스킵
경로생성

* 좌측 메뉴의 Routes 클릭 > 방금 만든 API에 대한 경로 생성 클릭

POST 방식으로 생성
통합 연결 클릭 후 통합 생성 및 연결 클릭
통합 유형을 Lambda 함수로 설정 > SlackInitialResponder 함수 선택 > 생성 클릭
생성한 API의 기본 엔드포인트를 복사
Slack API 페이지로 돌아와서
권한 설정을 위해 좌측 사이드 메뉴 중 OAuth & Permissions 클릭 

[Image: Screenshot 2025-02-19 at 4.35.18 PM.png]
아래의 Redirect URLs에 복사한 엔드포인트를 붙여넣기 후 저장
6. Scopes 섹션에서 Bot Token Scopes의 Add an OAuth Scope 버튼을 누른 후 해당 토큰들을 추가

* commands - 사용할 수 있는 단축키 및/또는 슬래시 명령 추가
* conversations.connect:read
* groups:read
* im:read



같은 페이지의 OAuth Tokens에서 Install to 내 워크플레이스 이름> 클릭 > Allow

Slash Commands 클릭 > Create New Command
Command : ai를 호출할 명령어 입력
- Request URL : API Gateway 엔드포인트 입력
- (Optional) Short Description : 명령어 입력시 뜰 설명 입력


