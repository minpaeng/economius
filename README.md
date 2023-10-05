<div align="center">
  <br />
  <img src="/uploads/6355c0b253718d167c214b81044a5bac/readme.gif" width="80%"/>
  <br />
</div>

<div align="center">
 <h3><b>EconomiuS</b></h3>
  2023.09.21 ~ 2023.10.06
  <br><br>

[Notion](https://warm-care-7c5.notion.site/PJT-42d5848006134d259f285d0ba657be2c?pvs=4) | [UCC]()

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
  <img src="/uploads/b3a2ee53d1f2dc490b099b327d882c1b/시스템구성도.PNG" width="80%"/>
  <br />
</div>

<br>


### ERD

<div align="center">
  <br />
  <img src="/uploads/4a5ef6e34721ba419776d5b6592d05a5/ERD2.png" width="80%"/>
  <br />
</div>


<br>


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
  <img src="/uploads/22965c9a6858e6b3a41432ee24f03470/login.gif" width="80%"/>
  <br />
</div>


* 홈 화면에서 카카오 로그인이 가능합니다.

* 로그인이 완료되면 게임 방 생성 및 입장이 가능합니다.


<br>

### 2. 게임 방 생성 및 입장
* 방 생성 및 입장 버튼을 눌러 게임 진행을 위한 대기 화면으로 진입합니다.
* 방 입장 시, 방 코드를 입력합니다.
* 4명의 인원이 모두 모이면, 방장이 게임을 시작할 수 있습니다.

<br>

### 3. 게임 로딩
<div align="center">
  <br />
  <img src="/uploads/81d4de02d8697bfdc393bfc32276c22a/loading1.gif" width="80%"/>
  <br />
</div>

* 게임이 준비되는 동안 플레이어들은 로딩 화면에서 대기합니다.

<br>


### 4. 게임 화면
<div align="center">
  <br />
  <img src="/uploads/00647ad4440cea8fa65969cb0de88466/image__2_.png" width="80%"/>
  <br />
</div>

* 게임 화면 상단에서 주식 등락 정보를 확인합니다.
* 맵 화면에서 플레이어들의 자산 순위와 플레이 상태를 알 수 있습니다.
* 게임 화면 우측에서 각 플레이어의 포트폴리오, 경제 지표를 확인합니다.

<br>


### 4. 경제 이슈 발생

<div align="center">
  <br />
  <img src="/uploads/03b65b41877407ec15d9f21b6e19f166/경제이슈모달.PNG" width="80%"/>
  <br />
</div>


* 과거에 실제로 일어났던 경제적 이슈들이 게임 진행 과정에서 주기적으로 발생하며 게임 내 플레이어의 자산과 게임 전략에 영향을 미칩니다.
* 과거의 경제적 사건들을 통해 여러 요소들이 경제에 미치는 영향을 파악하여 경제 관념을 정립할 수 있도록 도와 줍니다.

<br>
