# 정형 데이터 실습하기 🗄️


Bedrock Knowledge Bases with Structured Retrieval 실습에서는 정형 데이터를 s3 버킷에 업로드한 뒤, 이를 Glue와 Redshift를 활용하여 조회합니다. 이후, Bedrock Knowledge Bases를 활용하여 해당 데이터를 참고하여 자연어 쿼리를 SQL 쿼리로 변환하는 작업을 거칩니다. 최종적으로, 이를 통해 원하는 데이터를 조회할 수 있는 과정을 소개합니다.

![architecture](img/structured-architecture.png)

### 실습 가이드 영상

실습 내용을 확인하실 수 있는 가이드 영상입니다. 참고 부탁드립니다.

[**AWS Bedrock Knowledge Bases with Structured Retrieval Practice**](https://www.youtube.com/watch?v=C8lKtQVM47k)



### 실습 데이터

실습에서 활용될 CSV 파일입니다. 링크를 클릭하여 다운로드해주시길 바랍니다.

- [**application.csv**](data/application.csv)  
- [**credit.csv**](data/credit.csv)





## 기타 서비스

### Amazon S3
Amazon S3(Simple Storage Service)는 데이터를 저장하고 검색할 수 있는 객체 스토리지 서비스입니다. 업계 최고 수준의 확장성, 데이터 가용성, 보안 및 성능을 제공하며, 모든 규모의 고객이 Amazon S3를 데이터 레이크, 웹사이트, 모바일 애플리케이션, 백업 및 복원, 아카이브, 엔터프라이즈 애플리케이션, IoT 디바이스, 빅데이터 분석 등 다양한 용도로 활용할 수 있습니다.

[**Amazon S3 공식 문서**](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/Welcome.html)


### Glue
AWS Glue는 다양한 데이터 소스를 쉽게 통합하고 관리할 수 있는 서버리스 데이터 통합 서비스입니다. 이 서비스는 데이터 검색, ETL(추출, 변환, 로드) 작업, 중앙 집중식 카탈로그 관리 등 주요 데이터 통합 기능을 단일 플랫폼에서 제공하여 복잡한 데이터 처리 과정을 간소화합니다. 서버리스 아키텍처를 채택하고 있어 사용자는 인프라 관리에 대한 부담 없이 데이터 통합에 집중할 수 있으며, 다른 AWS 분석 서비스와의 원활한 연동을 통해 데이터의 가치를 극대화할 수 있습니다.

[**Glue 공식 문서**](https://docs.aws.amazon.com/ko_kr/glue/latest/dg/what-is-glue.html)


### Redshift
Amazon Redshift Serverless는 데이터 웨어하우스 인프라를 직접 관리할 필요 없이 데이터 분석을 수행할 수 있는 서비스입니다. AI 기반 기술을 활용하여 워크로드 패턴을 학습하고, 자동으로 리소스를 프로비저닝하며 용량을 조정하여 다양한 규모와 복잡성의 워크로드에 대해 최적의 성능을 제공합니다. 사용한 만큼만 비용을 지불하는 방식으로, 데이터 웨어하우스가 유휴 상태일 때는 요금이 발생하지 않아 비용 효율적입니다. 

[**Amazon Redshift 개념 알아보기**](https://docs.aws.amazon.com/ko_kr/redshift/latest/gsg/getting-started.html)

### Redshift Query Editor v2
AWS Query Editor v2는 Amazon Redshift 데이터 웨어하우스를 위한 웹 기반 SQL 클라이언트 애플리케이션입니다. Query Editor v2는 데이터베이스, 스키마, 테이블, 사용자 정의 함수(UDF) 등을 생성할 수 있는 기능을 제공하며, 트리 뷰 패널을 통해 데이터베이스 구조를 쉽게 탐색할 수 있습니다. 

[**Redshift Query Editor v2**](https://docs.aws.amazon.com/redshift/latest/mgmt/query-editor-v2.html)


