# 실습 ① - BKB Structured Retrieval

## 1. [S3] Upload Dataset

a. S3 버킷을 생성합니다.   
이때 주의해야 할 점으로는 S3 버킷은 교유 이름이 필요하기 때문에 같은 이름을 사용하실 경우 생성이 안 될 수   도 있습니다. 따라서, 생성이 안 된다면 이름을 다르게 해보시는 걸 추천해 드립니다.  
![u1](../../static/img/u-s3-1.png)  
![u2](../../static/img/u-s3-2.png)  
![u3](../../static/img/u-s3-3.png)  


b. 제공받은 csv 파일을 업로드합니다.
![u4](../../static/img/u-s3-4.png)

b1. `application` 폴더와 `credit` 폴더를 각각 생성해 줍니다. 이는 두개 csv의 스키마 차이를 구분하기 위해서입니다.  
![u5](../../static/img/u-s3-5.png)  
![u6](../../static/img/u-s3-6.png)  
![u7](../../static/img/u-s3-7.png)  
![u8](../../static/img/u-s3-8.png)  

b2. `application` 폴더에는 `application.csv` 파일을 업로드합니다.  
![u9](../../static/img/u-s3-9.png)
![u10](../../static/img/u-s3-10.png)   
![u11](../../static/img/u-s3-11.png)   
![u12](../../static/img/u-s3-12.png)  
![u13](../../static/img/u-s3-13.png)

위 과정을 똑같이 `credit` 폴더에 들어가서 `credit.csv` 업로드합니다.
![u14](../../static/img/u-s3-14.png)

모든 과정을 무사히 마쳤을 시, `application` 폴더에는 `application.csv`가 있어야 하며, `credit` 폴더에는 `credit.csv`가 있어야 합니다.  


## 2. [Glue] Create DB, Crawler

a. Glue Database를 생성합니다.

a1. AWS Glue를 검색해서 콘솔으로 간 후, 왼쪽 사이드바에 `Databases`를 선택합니다.
![u15](../../static/img/u-g-1.png)  

a2. `financedb` Glue DB를 생성합니다.  
![u16](../../static/img/u-g-3.png)  


b. Glue Crawler을 생성하여 S3 버킷으로부터 데이터를 DB에 테이블로 넣어줍니다.  

b1. 왼쪽 사이드바에서 `Crawlers`를 선택합니다.  
![u17](../../static/img/u-g-4.png)    

b2. `Create Crawler` 선택합니다.  
![u18](../../static/img/u-g-5.png)  

b3. `financecrawler`를 생성합니다.  
![u19](../../static/img/u-g-6.png)  
![u20](../../static/img/u-g-7.png)  
![u21](../../static/img/u-g-8.png)    
![u22](../../static/img/u-g-9.png)   
![u23](../../static/img/u-g-10.png)  
![u24](../../static/img/u-g-11.png)  
![u25](../../static/img/u-g-12.png)   
![u26](../../static/img/u-g-13.png)   
![u27](../../static/img/u-g-14.png)   
![u28](../../static/img/u-g-15.png)   
![u29](../../static/img/u-g-16.png)   

b4. `Run crawler`를 실행합니다.
![u30](../../static/img/u-g-17.png)

## 3. [Redshift] Workgroup/Namespace

a. Workgroup과 Namespace를 생성합니다.

## 4. [Knowledge Base] Structured KB

a. Structured Knowledge Base를 생성합니다.

## 5. [IAM] Role Permissions

a. 다음 IAM 권한들을 추가합니다.

```yaml
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "glue:GetDatabases",
                "glue:GetDatabase",
                "glue:GetTables",
                "glue:GetTable",
                "glue:GetPartitions",
                "glue:GetPartition",
                "glue:SearchTables"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetObject"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Statement2",
            "Effect": "Allow",
            "Action": [
                "lakeformation:GetDataAccess",
                "lakeformation:GrantPermissions"
            ],
            "Resource": "*"
        }
```


## 6. [Redshift Query Editor v2] DB Permissions

a. Redshift Query Editor에서 다음 명령어들을 추가하여 권한을 부여합니다.
이때, IAMR 위치에 본인의 KnowledgeBase IAMR을 추가하면 됩니다.

```
CREATE USER "IAMR:AmazonBedrockExecutionRoleForKnowledgeBase_YOURROLENAME" WITH PASSWORD DISABLE;

GRANT USAGE ON DATABASE "awsdatacatalog" TO "IAMR:AmazonBedrockExecutionRoleForKnowledgeBase_YOURROLENAME";
```


# Practice

위의 설정을 다 완료한 뒤 다음 실습을 진행합니다.

a. Sync 진행합니다.

b. Model을 하나 선택합니다.

c. 데이터를 조회할 수 있는 자연어 쿼리들을 제안합니다.

예: 가장 높은 연봉은 몇인가요?
