---
sidebar_position: 1
---

## Setup Instruction 

Step 1: IAM 역할 생성 및 권한 설정
Amazon Bedrock이 OpenSearch 및 S3에 접근할 수 있도록 IAM 역할을 생성해야함.

Step 1.1: IAM 역할 생성
IAM 좌측 메뉴에서 "역할(Roles)" → "역할 생성(Create Role)"
신뢰할 수 있는 엔터티 유형 선택:
"AWS 서비스(AWS Service)" 선택

사용 사례(Use case) 선택:
EC2 선택 (임시, 이후 수정 예정) 
***Use case에 Bedrock없음
"권한(Policies) 추가" 단계에서 다음 정책을 추가:

* AmazonBedrockFullAccess
* AmazonS3FullAccess
* AmazonOpenSearchServiceFullAccess
* AWSLambdaBasicExecutionRole

역할 이름 설정: AmazonBedrockAccessRole

"역할 생성(Create Role)"
Step 1.2: 신뢰 정책 수정 (Trust Policy)
Amazon Bedrock이 이 역할을 사용할 수 있도록 신뢰 정책을 수정해야함.

IAM 콘솔에서 새로 생성한 역할 클릭
"신뢰 관계(Trust relationships)" → "편집(Edit)"

기존 JSON을 다음 코드로 변경 후 저장:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "bedrock.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
```
이제 Amazon Bedrock이 OpenSearch와 S3 데이터를 사용할 권한이 부여됨
Step 2: OpenSearch Serverless 설정

Step 2.1: OpenSearch Serverless 컬렉션 생성
AWS 콘솔에서 "OpenSearch Serverless" 검색 
"컬렉션(Collections)" → "컬렉션 생성(Create Collection)" 

"데이터 액세스 정책(Data Access Policy)" → "JSON 편집(JSON Editor)" 선택 후 다음 코드 입력:
```
{
    "rules": [
        {
            "resourceType": "collection",
            "resource": ["collection/universityai-embeddings"],
            "permission":[
            "aoss:DescribeCollection",
            "aoss:ReadDocument",
            "aoss:WriteDocument"
            ],
            "principal": ["*"]
        }
    ]
}
```
보안을 강화하려면 "principal": ["*"] 대신, IAM 역할 ARN을 입력


Step 3: Amazon Bedrock Knowledge Base 생성
이제 Amazon Bedrock에 OpenSearch Serverless 및 S3 데이터를 연동할 Knowledge Base를 설정.

Step 3.1: Knowledge Base 생성
좌측 메뉴에서 "Knowledge Bases" 
"Knowledge Base 생성(Create Knowledge Base)"
Step 3.2: 데이터 소스(S3) 설정
"데이터 소스 추가(Add Data Source)"
"Amazon S3"
데이터 소스 이름: UniversityStudyMaterials
S3 위치(URL): 연구 논문 및 강의 슬라이드가 저장된 S3 버킷 경로 입력

파싱 방식(Parsing Strategy): "Amazon Bedrock Managed Parsing" 선택(자동 텍스트 추출)
"다음(Next)" 클릭

Step 3.3: OpenSearch Serverless 연동
벡터 데이터베이스 선택: Amazon OpenSearch Serverless
설정 값 입력:
Collection ARN: Step 2에서 복사한 ARN 입력

Vector Index Name: universityai_vectors
Vector Field Name: embedding
Text Field Name: text
Metadata Field Name: metadata 
*Bedrock이 검색을 더 쉽게하도록 도와줌 (파일이름, 타임스템프, 테그등을 저장함)

Step 3.4: IAM 역할 선택
IAM 역할 선택: AmazonBedrockAccessRole
"다음(Next)" → "Knowledge Base 생성(Create)"


Step 4: 데이터 동기화 및 테스트
Knowledge Base가 제대로 작동하는지 확인해야 함.

Step 4.1: 데이터 수동 동기화
AWS 콘솔에서 "Bedrock" 검색 → 클릭
"Knowledge Bases" 클릭 → UniversityStudyAI_KB 선택
데이터 소스에서 "Sync Now" 
상태(Status)가 Available이 될 때까지 기다림


6. Results ----------------------------------------------------------------------------------------

“Generative Agents: Interactive Simulacra of Human Behavior” 논문에 대한 질문

한글 문서 질문

