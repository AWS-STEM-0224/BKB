---
sidebar_position: 1
---
# 실습 ① -Knowledge Base 세팅하기

---
먼저, 슬랙봇에서 사용할 Knowledge Base를 생성해봅시다.

모든 실습은 us-west-2 (오레곤) 지역에서 합니다.

---

### Step 1: S3 생성하기
비정형 데이터를 보관할 저장소인 S3를 생성하고 파일을 업로드 해봅시다. 

### Step 2: Bedrock Knowledge Base 생성
이제 Amazon Bedrock에 OpenSearch Serverless 및 S3 데이터를 연동할 Knowledge Base를 설정.

### Step 3.1: Knowledge Base 생성
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

