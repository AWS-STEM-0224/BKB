# 실습 ① - BKB Structured Retrieval

## 1. [S3] Upload Dataset

a. **S3 버킷을 생성합니다.**   


이때 주의해야 할 점으로는 S3 버킷은 고유 이름이 필요하기 때문에 같은 이름을 사용하실 경우 생성이 안 될 수도 있습니다. 따라서, 생성이 안 된다면 이름을 다르게 해보시는 걸 추천해 드립니다.  

- 버킷 생성을 위해 `Create bucket`을 클릭합니다.  

![u1](img/u-s3-1.png)  

- 버킷명을 작성한 뒤, `Create bucket`을 클릭합니다. 예시에서는 `finance-client-data`라고 작성했으나, 중복된 이름으로 생성이 불가능하기 때문에 생성이 안되는 경우에는 중복을 예방하기 위해 `finance-client-data-1` 등으로 시도해주시면 됩니다.  

![u2](img/u-s3-2.png)  

- 정상적으로 생성된 것을 확인하실 수 있습니다.

![u3](img/u-s3-3.png)  




b. **제공받은 csv 파일을 업로드합니다.**

- 생성하신 버킷을 클릭합니다.  

![u4](img/u-s3-4.png)

b1. `application` 폴더와 `credit` 폴더를 각각 생성해 줍니다. 이는 두 개 csv의 스키마 차이를 구분하기 위해서입니다.  

- `Create folder`를 클릭합니다.  

![u5](img/u-s3-5.png)  

- 폴더명을 `application`으로 작성한 뒤, `Create folder`를 클릭합니다.  

![u6](img/u-s3-6.png)  

- 폴더명을 `credit`으로 작성한 뒤, `Create folder`를 클릭합니다.  

![u7](img/u-s3-7.png)  

- 두 개의 폴더가 정상적으로 생성된 화면을 확인하실 수 있습니다.  

![u8](img/u-s3-8.png)  


b2. `application` 폴더에는 `application.csv` 파일을 업로드합니다.  

- `application` 폴더를 클릭합니다.  

![u9](img/u-s3-9.png)

- `Add files`를 클릭합니다.  

![u10](img/u-s3-10.png)   

- 사전에 다운로드 받으신 `application.csv`를 선택합니다.  

![u11](img/u-s3-11.png)   

- `Upload` 버튼을 클릭합니다.  

![u12](img/u-s3-12.png)  

- 무사히 `application.csv`가 업로드 된 것을 확인합니다.  

![u13](img/u-s3-13.png)

위 과정을 똑같이 `credit` 폴더에 들어가서 `credit.csv` 업로드합니다.
![u14](img/u-s3-14.png)

모든 과정을 무사히 마쳤을 시, `application` 폴더에는 `application.csv`가 있어야 하며, `credit` 폴더에는 `credit.csv`가 있어야 합니다.  


## 2. [Glue] Create DB, Crawler

a. **Glue Database를 생성합니다.**

a1. AWS Glue를 검색해서 콘솔에 접속한 뒤, 왼쪽 사이드바에 `Databases`를 선택합니다.
![u15](img/u-g-1.png)  

a2. `financedb` Glue DB를 생성합니다.  
🔥 **`이후 단계에서 DB 이름이 활용될 예정이니 따로 복사해주세요`**. 🔥 

![u16](img/u-g-3.png)  


b. **Glue Crawler를 생성하여 S3 버킷으로부터 데이터를 DB에 테이블로 넣어줍니다.**  

b1. 왼쪽 사이드바에서 `Crawlers`를 선택합니다.  

![u17](img/u-g-4.png)    

b2. `Create Crawler` 선택합니다.  

![u18](img/u-g-5.png)  

b3. `financecrawler`를 생성합니다.  

- Crawler 이름을 정의하고 `Next`를 클릭합니다.  

![u19](img/u-g-6.png)  

- `Add a data source`를 클릭합니다.  

![u20](img/u-g-7.png)  

- `Browse S3`를 클릭합니다.

![u21](img/u-g-8.png)    

- 이전에 생성하신 S3 버킷을 선택한 뒤, `Choose`를 클릭합니다.  

![u22](img/u-g-9.png)   

- `Add an S3 data source`를 클릭합니다.  

![u23](img/u-g-10.png)  

- `Next`를 클릭합니다.  

![u24](img/u-g-11.png)  

- `Create new IAM role`를 선택합니다.  

![u25](img/u-g-12.png)   

- 새로 생성하실 IAM role의 이름을 작성하고 `Create`를 클릭합니다.  

![u26](img/u-g-13.png)   

- `Next`를 클릭합니다.  

![u27](img/u-g-14.png)   

- 이전에 생성한 Glue DB를 선택한 뒤, `Next`를 클릭합니다.  

![u28](img/u-g-15.png)   

- `Create crawler`를 클릭합니다.  

![u29](img/u-g-16.png)   

b4. `Run crawler`를 실행합니다.
![u30](img/u-g-17.png)

## 3. [Redshift] Workgroup/Namespace

a. **Workgroup과 Namespace를 생성합니다.**  

a1. s3 버킷이 접근 가능한 IAM role을 생성합니다.  

- Redshift에 접속한 뒤, `Try Redshift Serverless free trial`을 클릭합니다.  

![u31](img/u-r-1.png)   

- `Create IAM role`을 클릭합니다.  

![u32](img/u-r-2.png)   

- `Specific S3 buckets`를 선택한 뒤, 본인의 S3 버킷을 선택하고 `Create IAM role as default`를 클릭합니다.  

![u33](img/u-r-3.png)   

- `Save configuration`을 클릭합니다.   

![u34](img/u-r-4.png)  

다음과 같이 생성이 완료됩니다. 만약 Namespaces/Workgroups에서 안 보이신다면 설정 중이기 때문에 조금 기다린 뒤에 새로고침 해보시면 나타나는 것을 확인해 볼 수 있습니다.   

![u35](img/u-r-5.png)   


## 4. [Knowledge Base] Structured KB  

a. **Structured Knowledge Base를 생성합니다.**  

- `Amazon Bedrock` 콘솔로 접속한 뒤, 사이드바에 있는 `Knowledge Bases`에 접속합니다.  

![u-b-1](img/u-b-1.png)   

- `Create`를 클릭한 뒤, `Knowledge Base with structured data store`를 클릭합니다.  

![u-b-2](img/u-b-2.png)   

a1. **Redshift Default Workgroup을 선택합니다.**   

- `Step 1`에서는 변경해야 할 사항이 없는 관계로, `Next`를 클릭합니다.  

![u-b-3](img/u-b-3.png)  

- Workgroup에서 `default-workgroup`을 선택합니다.  

![u-b-4](img/u-b-4.png)  

a2. **Default storage metadata를 `AWS Default Glue Data Catalog`로 변경한 뒤, 연결할 Glue catalog table 추가해야 합니다. 이때, 본인의 Glue Data Table을 포함하고 있는 DB 명을 알아보는 방법은 다음과 같습니다.**  

![u-b-9](img/u-b-9.png)

a2-1. Redshift로 돌아가서 Query Data를 선택합니다. 이후, Redshift Query Editor v2에서 `awsdatacatalog` 아래에 위치한 본인의 DB 명을 알아봅니다. 이는 보통 이전에 설정한 Glue DB 명이랑 동일합니다.

- Amazon Redshift Serverless dashboard에서 `Query data`를 클릭합니다.  

![u-b-5](img/u-b-5.png)  

- `Serverless: default-workgroup`를 클릭합니다.  

![u-b-6](img/u-b-6.png)  

- `Create connection`을 클릭합니다.  

![u-b-7](img/u-b-7.png)  

- `external databases`를 펼쳐보시면 `awsdatacatalog` 아래에 본인의 DB가 위치해 있을 것입니다. 실습의 경우에는 이전에 설정했던 Glue DB 명인 `financedb`와 같습니다.  

![u-b-8](img/u-b-8.png)  

a3. **`Glue catalog tables to connect`에서 `{본인DB}.*`을 작성합니다. 예시의 경우에는 `financedb.*`으로 작성하여, financedb 아래에 있는 모든 테이블을 연결하겠다는 뜻입니다.**  

🔥 본인DB에 이전 단계에서 복사해둔 Glue DB를 붙여넣기하시는 것을 권장드립니다.

![u-b-10](img/u-b-10.png)  

a4. **Knowledge Base를 생성합니다.**  

![u-b-11](img/u-b-11.png)  


## 5. [IAM] Role Permissions

a. **IAM 권한들을 추가합니다.**  

- 생성하신 Bedrock Knowledge Base의 `Service Role`을 클릭합니다.  
  
🔥 이후 권한 부여 단계에서 `Service Role Name`을 사용하기 때문에 따로 복사하시는 것을 권장드립니다.  

![u-i-1](img/u-i-1.png)  

- 본인의 `Permissions policy`를 클릭합니다.  

![u-i-2](img/u-i-2.png)  

- `Edit`을 클릭합니다.  

![u-i-3](img/u-i-3.png)  


아래 권한들을 Statement에 추가하면 됩니다. 즉, 이미 있는 Sid들 이후에 추가하면 됩니다.   

이때 주의하셔야 할 점으로는 마지막을 제외하고 각 Sid를 마무리 할 경우 쉽표 (,)를 추가하셔야 합니다. 따라서, 이전에 있던 마지막 Sid 이후에 쉼표를 추가하시고 아래 Sid들을 붙혀놓으시면 됩니다.  


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


- `Next`를 클릭합니다.  

![u-i-4](img/u-i-4.png)  

- `Save changes`를 클릭합니다.  

![u-i-5](img/u-i-5.png)  


## 6. [Redshift Query Editor v2] DB Permissions

a. **Redshift Query Editor v2에서 다음 명령어들을 추가하여 권한을 부여합니다.**  
**이때, IAMR 위치에 본인의 KnowledgeBase IAMR을 추가하면 됩니다.**  

🔥 이전 BKB 생성 단계에서 복사해둔 IAMR를 붙여넣기하시는 것을 권장드립니다.  

```
CREATE USER "IAMR:AmazonBedrockExecutionRoleForKnowledgeBase_YOURROLENAME" WITH PASSWORD DISABLE;

GRANT USAGE ON DATABASE "awsdatacatalog" TO "IAMR:AmazonBedrockExecutionRoleForKnowledgeBase_YOURROLENAME";
```


- 유저를 생성합니다.  

![u-e-1](img/u-e-1.png)  

- 유저에게 `awsdatacatalog`에 대한 권한을 설정합니다.  

![u-e-2](img/u-e-2.png)  



# Practice

위의 설정을 다 완료한 뒤 다음 실습을 진행합니다.  

a. **Redshift Serverless를 선택하고 Sync 진행합니다.**  

![u-p-1](img/u-p-1.png)  


b. **Anthropic Claude 3 Sonnet을 선택합니다.**  

b1. 이때, 모델 권한이 없을 경우 다음과 같이 신청하면 됩니다.   


- `Select model`을 누른 뒤, `Request access`를 클릭합니다.  

![u-b-12](img/u-b-12.png)  

- `Claude 3 Sonnet`을 선택한 뒤, `Request model access`를 클릭합니다.  

![u-b-13](img/u-b-13.png)  

- `Next`를 클릭합니다.  

![u-b-14](img/u-b-14.png)  

- `Claude 3 Sonnet`에 대한 권한이 추가된 것을 확인하실 수 있습니다.  

![u-b-15](img/u-b-15.png)  

b2. 이후, 새로고침을 해보시면 Sonnet을 선택할 수 있게 된 것을 확인할 수 있습니다.  
따라서, Anthropic을 선택하고, Claude 3 Sonnet을 선택한 뒤, `Apply`를 클릭합니다.  

![u-b-16](img/u-b-16.png)  


c. **데이터를 조회할 수 있는 자연어 쿼리들을 제안합니다.**  

예: 가장 높은 연봉은 몇인가요? (*What is the max salary?*)  


- 오른쪽 콘솔에서 결과가 반환된 것을 확인할 수 있습니다.   

![u-b-17](img/u-b-17.png)  

- 또한, `Show details`를 클릭해보시면 사용된 쿼리 또한 확인하실 수 있습니다.  

![u-b-18](img/u-b-18.png) 


## 🎁 BONUS: Bedrock Knowledge Base에 Description 추가하기  
Practice에서 질문한 것처럼 테이블에 대한 추가적인 설명 없이도 BKB가 대답을 잘하는 경우가 있습니다. 하지만, 만약 우리가 만족할 만한 대답을 하지 못한다면 어떻게 해야 할까요?  

우리는 BKB가 테이블에 대해 더 잘 이해할 수 있도록 Description을 추가할 수 있습니다.  

a. **BKB의 Query Engine을 선택합니다.**  
![u-b-19](img/u-b-19.png)  

b. **Edit을 눌러 Description configuration 창을 엽니다.**  
![u-b-20](img/u-b-20.png)  

c. **직접 Description을 추가해 줍니다. (아래 표를 참고해서 작성해 주세요.)**  
![u-b-21](img/u-b-21.png) 


## Description Script  

| Table name         | Column name           | Descriptions                                                                                      |
|--------------------|-----------------------|---------------------------------------------------------------------------------------------------|
| awsdatacatalog     | STATUS                | Loan overdue duration: 0: 1-29 days, 1: 30-59 days, 2: 60-89 days, 3: 90-119 days, 4: 120-149 days, 5: Over 150 days, C: paid off that month, X: No loan for the month |
| awsdatacatalog     | MONTHS_BALANCE        | Record month: The month of the extracted data is the starting point, backwards, 0 is the current month, -1 is the previous month, and so on |
| awsdatacatalog     | FLAG_OWN_CAR          | Is there a car: 'Y': yes, 'N': no                                                                 |
| awsdatacatalog     | CODE_GENDER           | Gender: 'M': male, 'F': Female                                                                    |
| awsdatacatalog     | NAME_FAMILY_STATUS    | Marital status                                                                                    |
| awsdatacatalog     | DAYS_BIRTH            | Count backwards from current day (0), -1 means yesterday, -365 means 1 year old. (you can get how old is the client by abs(DAYS_BIRTH) / 365) |
| awsdatacatalog     | FLAG_OWN_REALTY         | Is there a property |
| awsdatacatalog     | CNT_CHILDREN            | Number of children |
| awsdatacatalog     | AMT_INCOME_TOTAL            | Annual income |
| awsdatacatalog     | NAME_INCOME_TYPE            | Income category |
| awsdatacatalog     | NAME_EDUCATION_TYPE            | Education level |
| awsdatacatalog     | NAME_HOUSING_TYPE            | Way of living |
| awsdatacatalog     | FLAG_MOBIL            | Is there a mobile phone |
| awsdatacatalog     | FLAG_WORK_PHONE            | Is there a work phone |
| awsdatacatalog     | FLAG_PHONE            | Is there a phone |
| awsdatacatalog     | FLAG_EMAIL            | Is there an email |
| awsdatacatalog     | OCCUPATION_TYPE            | Occupation |
| awsdatacatalog     | CNT_FAM_MEMBERS            | Family size |
