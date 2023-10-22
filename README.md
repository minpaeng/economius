<div align="center">
  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/1ee42af9-8238-4edd-ad93-ec6e87e8bd24" width="80%"/>
  <br />
</div>

<div align="center">
 <h3><b>Economius</b></h3>

 <strong>게임 속에서 만들어나가는 나만의 경제 포트폴리오</strong><br>
 삼성 청년 SW 아카데미 <strong>최우수상 수상</strong> 🏆<br>

  2023.08.21 ~ 2023.10.06
  <br>

[Notion](https://warm-care-7c5.notion.site/PJT-42d5848006134d259f285d0ba657be2c?pvs=4) | [UCC](https://www.youtube.com/watch?v=Ln1BwLdLknU)

</div>


<br>

# 🖥 **프로젝트 개요**

### 팀원 소개

<table>
    <tr>
        <td height="140px" align="center"> <a href="https://github.com/Dayoung1014">
            <img src="https://avatars.githubusercontent.com/Dayoung1014" width="140px" /> <br><br> 👑 이다영 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/minpaeng">
            <img src="https://avatars.githubusercontent.com/minpaeng" width="140px" /> <br><br> 🎀 권민정 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/uttamapaksa">
            <img src="https://avatars.githubusercontent.com/uttamapaksa" width="140px" /> <br><br> 🐟 김준섭 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/ssh5212">
            <img src="https://avatars.githubusercontent.com/ssh5212" width="140px" /> <br><br> 🐲 신승헌 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/qkdk">
            <img src="https://avatars.githubusercontent.com/qkdk" width="140px" /> <br><br> 🐰 안규보 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/yoon-dh">
            <img src="https://avatars.githubusercontent.com/yoon-dh" width="140px" /> <br><br> 🐯 윤동훈 <br>(Front-End) </a> <br></td>
    </tr>
</table>

<br>

### 서비스 배경
* 경제 교육이 부족하고 개념이 어려워 관심이 많지만 경제를 잘 모르는 사람들이 많습니다.
* '이코노미어스'는 과거 실제 경제적 이슈들을 통해, 어려운 경제를 쉽고 즐겁게 배울 수 있도록 하는 것에 목적을 두고 있습니다. 

<br>

### 서비스 이름 및 설명
* `Econo` (경제) + `mius` (사람) : 경제적인 사람
* `Econo` (경제) + `mius` (천재) : 경제적 천재
* `Economy` (경제) + `us` (함께) : 함께 경제를 배우자!


<br>

# 🔎 프로젝트 설계

### 시스템 구성도
<div align="center">
  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/fccbdbb4-9e64-48b1-871a-663dd1cc6ba6" width="80%"/>
  <br />
</div>

<br>


### ERD

<div align="center">
  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/8d5d1077-97d5-4847-abf2-bf02f3b5a711" width="80%"/>
  <br />
</div>


<br>

### Redis
```javascript
{
  "roomId": 0,
  "bankruptcyPlayers": [
    0
  ],
  "players": [
    0
  ],
  "characters": {},
  "nicknames": {},
  "playerSequence": [
    0
  ],
  "currentPlayerToRoll": 0,
  "gameTurn": 0,
  "maxGameTurn": 0,
  "portfolios": {},
  "tax": {},
  "locations": {},
  "gold": {
    "price": 0,
    "rate": 0,
    "priceHistory": [
      0
    ],
    "rateHistory": [
      0
    ]
  },
  "buildings": {},
  "insurances": {},
  "stocks": {},
  "savings": {},
  "interestRate": {
    "rate": 0.00,
    "rateHistory": [
      0.00
    ]
  },
  "issueIdx": 0,
  "issues": [
    {
      "issueId": 0,
      "name": "",
      "type": "DEPRESSION",
      "country": "",
      "year": "",
      "description": "",
      "url": "",
      "currentAssetChanges": [
        {
          "issueStockId": 0,
          "issueId": 0,
          "issueName": "",
          "type": "DEPRESSION",
          "assetType": "",
          "assetId": 0,
          "stockType": "",
          "changeRate": "LOWER",
          "changeReason": ""
        }
      ]
    }
  ],
  "currentIssue": {
    "issueId": 0,
    "name": "",
    "type": "DEPRESSION",
    "country": "",
    "year": "",
    "description": "",
    "url": "",
    "currentAssetChanges": [
      {
        "issueStockId": 0,
        "issueId": 0,
        "issueName": "",
        "type": "DEPRESSION",
        "assetType": "",
        "assetId": 0,
        "stockType": "",
        "changeRate": "LOWER",
        "changeReason": ""
      }
    ]
  },
  "currentPrevIssues": [
    {
      "prevIssueId": 0,
      "issueId": 0,
      "foretoken": ""
    }
  ],
  "event": {
    "eventMoney": [
      {
        "eventMoneyId": 0,
        "insuranceTypeId": 0,
        "typeCode": "",
        "typeName": "",
        "name": "",
        "description": "",
        "money": 0,
        "url": ""
      }
    ],
    "eventStock": [
      {
        "eventStockId": 0,
        "stockIndustryId": 0,
        "industry": "",
        "name": "",
        "description": "",
        "rate": 0,
        "url": ""
      }
    ]
  }
}
```


# 🔨 개발 환경 및 기술 스택

| FrontEnd                | BackEnd                         | DB            | CI/CD                     | 협업툴    |
| ----------------------- | ------------------------------- | ------------- |-------------------------- | -------- |
| Node 18.16.1            | Java SE Development Kit 11.0.19 | MySQL 5.7.35  | AWS EC2(Ubuntu 20.04 LTS) | GitLab   |
| React 18.2.0            | Spring Boot 2.7.15              | Redis 7.0.12  | Nginx 1.18.0              | Jira     |
| React-Router-Dom 6.16.0 | Gradle 8.0                      |               | Docker 24.0.5             | Notion   |
| Recoil 0.7.7            | Apache Tomcat 9.0.78            |               |                           | figma    |
| Axios 1.5.0             | modelmapper 3.1.1               |               |                           | Postman  |
| sockjs-client 1.6.1     | logstash-logback-encoder 4.1.1  |               |                           | Logstash |
| stompjs 2.3.5           | jjwt-api 0.11.5                 |               |                           |          |
| three 0.156.1           | jjwt-impl 0.11.5                |               |                           |          |
| react-three/fiber 8.14.1| jjwt-jackson 0.11.5             |               |                           |          |


<br>

# 📚 프로젝트 기능

### 1. 소셜 로그인

<div align="center">
  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/1957f4ec-23cb-4642-ae5d-5f68198e075c" width="80%"/>
  <br />

  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/edf1f238-3ee1-4169-afb6-185cb56a7009" width="80%"/>
  <br />
</div>

* 홈 화면에서 카카오 로그인이 가능합니다.
* 로그인이 완료되면 게임 방 생성 및 입장이 가능합니다.


<br>

### 2. 게임 방 생성 및 입장
<div align="center">
  <br />
  <img src="https://github.com/qkdk/economius/assets/86948395/04f5f735-db1b-4b73-9350-9756dd93df92" width="80%"/>
  <br />
</div>

* 방 생성 및 입장 버튼을 눌러 게임 진행을 위한 대기 화면으로 진입합니다.
* 방 입장 시, 방 코드를 입력합니다.
* 4명의 인원이 모두 모이면, 방장이 게임을 시작할 수 있습니다.
* 게임이 준비되는 동안 플레이어들은 로딩 화면에서 대기합니다.

<br>

### 3. 게임 화면
<div align="center">
  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/96a233fe-1e8e-4dd7-8748-7990b239b905" width="80%"/>
  <br />
</div>

* 게임 화면 상단에서 주식 등락 정보를 확인합니다.
* 맵 화면에서 플레이어들의 자산 순위와 플레이 상태를 알 수 있습니다.
* 게임 화면 우측에서 각 플레이어의 포트폴리오, 경제 지표를 확인합니다.

<br>


### 4. 경제 이슈 발생

<div align="center">
  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/493aee3d-83cc-4fda-8dee-4994a11c50bf" width="80%"/>
  <br />
</div>


* 과거에 실제로 일어났던 경제적 이슈들이 게임 진행 과정에서 주기적으로 발생하며 게임 내 플레이어의 자산과 게임 전략에 영향을 미칩니다.
* 과거의 경제적 사건들을 통해 여러 요소들이 경제에 미치는 영향을 파악하여 경제 관념을 정립할 수 있도록 도와 줍니다.

<br>

### 5. 자산 포트폴리오 관리 및 경제 뉴스 확인

<div align="center">
  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/faaf1e37-040c-4b47-8270-1695e16eb9f9" width="80%"/>
  <br />
</div>

<div align="center">
  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/d3817c76-94e0-4de6-ad6d-d8e0d27510fa" width="80%"/>
  <br />
</div>

* 보유한 자산의 비율을 원형 그래프의 형태로 쉽게 파악할수 있습니다.
* 금, 주식, 적금, 보험 자산에 수익률, 변동률 등 자세한 정보를 파악할 수 있습니다.
* 포트폴리오를 통해 자산의 종류를 파악하고 투자 전략을 세워 전략적인 자산 관리를 할 수 있습니다.

<br>

### 6. 보험 및 적금 가입

<div align="center">
  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/4a52ae45-9ae4-4e94-9aee-c5c81a1ba70b" width="80%"/>
  <br />
</div>

* 보험이나 적금 칸에 도착하면 해당 상품을 가입할 수 있습니다.
* 보험에 가입할 시, 찬스 카드를 밟았을 때 발생하는 손실을 일부 보장받을 수 있습니다.
* 적금에 가입할 시, 변동금리 + 고정금리의 가격만큼 이자가 붙은 금액을 정해진 턴을 만기할 시 수익을 얻을 수 있습니다.

<br>

### 7. 주식

<div align="center">
  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/d935941e-8998-44b7-9147-8b23daa2f0b8" width="80%"/>
  <br />
  
  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/19153582-2310-4472-bf5b-e770e95018ea" width="80%"/>
  <br/>
</div>

* 도착한 기업 주식의 등락율을 확인할 수 있고, 이를 바탕으로 수익률을 높이는 방향으로 주식을 매수 또는 매도합니다.
* 기업 칸에서는 해당 기업의 아이템을 소비하게 되며, 이후 주주들이 주식 보유 비율에 비례하여 배당금을 받습니다. 

<br>

### 7. 금

<div align="center">
  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/d923b658-5b78-4d82-b997-32535479c935" width="80%"/>
  <br />
</div>

* 경제 불황 이슈가 발생하고 있는 상황에서도 안정적으로 유지되는 자산입니다.

<br>

### 8. 부동산

<div align="center">
  <br />
  <img src="https://github.com/minpaeng/economius/assets/68097132/bf2233ed-2847-4116-8b43-f4f363919199" width="80%"/>
  <br />
</div>

* 초기 구매 비용이 높지만, 수익률 또한 높은 자산입니다.
* 부동산 소유자의 땅에 다른 플레이어가 방문 시 방문료를 차감하여 소유자에게 돌아갑니다.


