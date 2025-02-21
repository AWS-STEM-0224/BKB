# 비정형 데이터 실습하기 🚀


Bedrock Knowledge Bases를 활용한 Slack Chatbot 만들기 실습에서는 pdf 등의 비정형 데이터를 s3 버킷에 업로드한 뒤, 이를 OpenSearch, API Gateway, Lambda 등을 활용하여 조회합니다. 이후, Bedrock Knowledge Bases를 활용하여 해당 데이터를 참고하여 답변을 반환하며 참고한 자료 또한 첨부합니다. 이를 간단하게 Slack에서 `/ask` 등의 명령어로 구현하여 사용성을 높입니다.

![architecture](img/AUSG_Architecture_fin2.png)

### Amazon S3
Amazon S3(Simple Storage Service)는 데이터를 저장하고 검색할 수 있는 객체 스토리지 서비스입니다. 업계 최고 수준의 확장성, 데이터 가용성, 보안 및 성능을 제공하며, 모든 규모의 고객이 Amazon S3를 데이터 레이크, 웹사이트, 모바일 애플리케이션, 백업 및 복원, 아카이브, 엔터프라이즈 애플리케이션, IoT 디바이스, 빅데이터 분석 등 다양한 용도로 활용할 수 있습니다.

[**Amazon S3 공식 문서**](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/Welcome.html)


### Amazon API Gateway
Amazon API Gateway는 REST 및 WebSocket API를 위한 완전관리형 서비스로, API의 생성, 게시, 유지관리, 모니터링, 보호 기능을 제공합니다. 백엔드 HTTP 엔드포인트, AWS Lambda 함수, 기타 AWS 서비스와 연동이 가능하며, 트래픽 관리, CORS 지원, 권한 부여, 액세스 제어, 제한, 모니터링을 자동으로 처리합니다. 실시간 양방향 통신이 가능한 RESTful API와 WebSocket API를 구축할 수 있어 컨테이너식 서버리스 워크로드 및 웹 애플리케이션을 효과적으로 지원합니다.

[**Amazon API Gateway 공식 문서**](https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/welcome.html)


### AWS Lambda
AWS Lambda는 서버리스 컴퓨팅 서비스로, 서버 프로비저닝이나 관리 없이 코드를 실행할 수 있게 해줍니다. Lambda는 이벤트에 대한 응답으로 코드를 실행하며, 서버 및 운영체제 유지관리, 용량 프로비저닝, 보안 패치, 로깅 등 모든 컴퓨팅 리소스 관리를 자동으로 처리합니다. 사용자는 Lambda가 지원하는 언어 런타임 중 하나로 작성된 코드만 제공하면 됩니다.

[**Lambda 공식 문서**](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/welcome.html)


### IAM
AWS Identity and Access Management(IAM)은 AWS 리소스에 대한 액세스를 안전하게 제어할 수 있는 웹 서비스로, AWS 계정의 인증 및 권한 부여를 관리하는 인프라를 제공합니다.

[**IAM 공식 문서**](https://docs.aws.amazon.com/ko_kr/IAM/latest/UserGuide/introduction.html)
