# CultureArtDiary

## 소개
**'CultureArtDiary'는 문화예술(OTT) 활동을 기록하고 공유하는 플랫폼입니다. <br> 'CultureArtDiary'는 자신의 문화예술 활동을 다이어리 형태로 기록하고, 이를 다른 사람들과 공유할 수 있는 기능을 제공합니다.**
<br> <br>
요즘 NETFLIX, Disney+ 등 OTT의 발전으로 인해 많은 문화 콘텐츠를 감상할 수 있지만 **감상평을 공유하고 소통할 수 있는 심화된 플랫폼이 부족합니다.** <br>
이에 저희는 영화나 드라마 등 **다양한 문화 콘텐츠를 경험하고 경험한 것을 다른 사람들과 공유하고 소통할 공간이 필요하다고 생각하여 'CultureArtDiary'를 개발**하게 되었습니다.

## 주요 기능
✔ **회원가입 및 로그인**: 회원 가입 및 로그인을 통해 개인 웹사이트를 이용할 수 있습니다. <br> <br>
|<img src="https://github.com/user-attachments/assets/310d2de6-dd0c-4d46-81ae-850ed263000c" width="300" style="float:left; margin-right:10px;"/>| 
|:---:|
|회원가입|

|<img src="https://github.com/user-attachments/assets/a65ff3f5-d600-4d2c-afe8-069e43735ec4" width="300"/>|
|:---:|
|로그인|

✔ **개인 다이어리 작성 및 수정**: 다른 사람들의 감상 후기를 확인하고 내 후기도 다른 사람과 공유할 수 있습니다. <br>
✔ **문화 예술 콘텐츠 탐색**: 추천하는 다양한 OTT 콘텐츠를 탐색하고 정보를 제공 받을 수 있습니다. <br>
✔ **캘린더 관리**: 캘린더를 통해 원하는 콘텐츠 알림을 받고 일정 관리를 할 수 있습니다. <br>
✔ **개인 프로필 관리**: 개인 프로필을 만들고 관심사를 설정할 수 있습니다. <br>
✔ **문화 예술 콘텐츠 맞춤 추천**: 키워드 검색을 통해 맞춤 OTT 콘텐츠를 추천 받을 수 있습니다. (ChatGPT 활용)

## server 파일 설명
✔ server/config/dev.js은 MongoDB URI를 설정합니다. (해당 파일은 .gitignore파일로 가려져있음) <br>
✔ server/middleware/auth.js은 사용자 인증을 위한 미들웨어입니다. <br>
✔ server/models/Diary.js은 다이어리 모델을 정의하는 파일입니다. <br>
✔ server/models/User.js은 유저 모델을 정의하는 파일입니다. <br>
✔ server/routes/diary.js은 다이어리 관련 API 엔드포인트를 정의하는 파일입니다. <br>
✔ server/routes/users.js은 유저 관련 API 엔드포인트를 정의하는 파일입니다. <br>
✔ server/index.js은 서버의 엔트리 포인트 파일입니다. 

**서버**는 Node.js와 Express를 사용하여 사용자 인증, 파일 업로드 및 다이어 관리 기능을 제공합니다.

## server 주요 기능 
**사용자 관련 기능 (routes/users.js)**
회원 가입:
사용자 정보를 데이터베이스에 저장.
비밀번호는 bcrypt를 이용해 해싱 후 저장. <br>

로그인:
사용자가 입력한 비밀번호와 데이터베이스에 저장된 해싱된 비밀번호 비교.
성공 시 JWT 토큰을 생성하여 쿠키에 저장. <br>

로그아웃:
데이터베이스에서 사용자 토큰을 제거하여 로그아웃 처리. <br>

프로필 업데이트:
사용자의 프로필 정보(닉네임, 성별, 출생 연도, 선호 장르) 업데이트. <br>

프로필 사진 업로드:
Multer를 이용해 프로필 사진을 서버에 저장.
저장된 파일 경로를 데이터베이스에 업데이트. <br>
 
<br> **일기 관련 기능 (routes/diary.js)** 
이미지 업로드:
Multer를 이용해 이미지 파일을 서버에 저장. <br>

일기 업로드:
일기 정보를 데이터베이스에 저장. <br>

일기 상세 정보 조회:
일기 ID를 통해 일기 상세 정보를 조회하여 반환. <br>

일기 수정:
일기 정보를 업데이트. <br>

일기 삭제:
일기 ID를 통해 일기 삭제. <br>

전체 일기 목록 조회:
모든 일기 목록을 조회하여 반환. <br>

## server 보안

비밀번호 해싱: **bcrypt** 라이브러리를 사용해 비밀번호를 해싱하여 저장.  <br>
토큰 기반 인증: **JWT**를 사용해 인증 토큰을 생성 및 검증. <br>
인증 미들웨어: **auth.js** 파일에서 인증 미들웨어를 정의하여, 보호된 경로에 접근하기 전에 사용자의 인증 상태를 확인. 

## server 주요 코드 설명

**index.js** <br>
Express 애플리케이션을 설정하고 MongoDB에 연결. <br>
미들웨어로 body-parser와 cookie-parser 설정. <br>
사용자 관련 라우트와 일기 관련 라우트를 설정. <br>
서버가 5000번 포트에서 요청을 리스닝. 

**auth.js (미들웨어)** <br>
JWT 토큰을 검증하여 사용자의 인증 상태를 확인.<br>
인증된 사용자의 정보와 토큰을 요청 객체에 추가.

**User.js (모델)** <br>
사용자 스키마 정의. <br>
비밀번호 해싱 및 JWT 토큰 생성 메소드 정의. <br>
토큰을 통해 사용자 찾기 메소드 정의. 

**Diary.js (모델)** <br>
일기 스키마 정의. <br>
작성자, 제목, 설명, 프라이버시 설정, 카테고리, 장르, 평점, 파일 경로 등을 필드로 포함.

**users.js (라우트)** <br>
회원 가입, 로그인, 로그아웃, 프로필 업데이트, 프로필 사진 업로드 라우트 정의. <br>
각 라우트는 적절한 미들웨어와 모델 메소드를 사용해 요청을 처리.

**diary.js (라우트)** <br>
이미지 업로드, 일기 업로드, 일기 상세 정보 조회, 일기 수정, 일기 삭제, 전체 일기 목록 조회 라우트 정의. <br>
각 라우트는 적절한 미들웨어와 모델 메소드를 사용해 요청을 처리.  

## sever 흐름도 
[Start] -> [index.js 실행] -> [Express 앱 생성] -> [MongoDB 연결] -> [미들웨어 설정]  <br>
      -> [라우터 설정] -> [포트에서 서버 리스닝] -> [요청 수신] <br> 
          -> [라우터에 따라 요청 처리] <br>
              -> [/api/users 요청] <br>
                  -> [회원 가입 처리] <br>
                  -> [로그인 처리] <br>
                  -> [로그아웃 처리] <br>
                  -> [프로필 업데이트 처리] <br>
                  -> [프로필 사진 업로드 처리] <br>
              -> [/api/diary 요청] <br>
                  -> [이미지 업로드 처리] <br>
                  -> [다이어리 업로드 처리] <br>
                  -> [다이어리 상세 정보 조회] <br>
                  -> [다이어리 수정] <br>
                  -> [다이어리 삭제] <br>
                  -> [전체 다이어리 목록 조회] 


## 누가 만들었나요?
### ✨ 프론트엔드
|김형민, 박호진|
|:---:|
|프론트엔드|


### 🔨 백엔드
|<b>박호진</b>|
|:---:|
|백엔드장|

|앙현우|
|:---:|
|백엔드|

|정지훈, 김상현|
|:---:|
|서류 업무|

## 실행 오류 해결방안
✔ **CalenderPage** 버전 이슈로 실행 오류가 뜰 수 있다. <br>
cd client 후 <br>
npm install @fullcalendar/react @fullcalendar/daygrid <br>
npm install @fullcalendar/interaction <br>
npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps <br>
npm install typescript --legacy-peer-deps <br>

✔ **RecommendedVideoPage** 파일에 js파일을 넣지 않아서 오류가 뜰 수 있다. (Chatgpt 키 값 이슈로 js파일을 가림) <br>
RecommendedVideoPage.js 파일을 직접 만들어서 넣는다. <br>
혹은 RecommendedVideoPage파일을 삭제한다. <br>


## 사용된 기술 스택

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"> <img src="https://img.shields.io/badge/NODEJS-339933?style=for-the-badge&logo=Node.js&logoColor=white"> 
<img src="https://img.shields.io/badge/REACT-61DAFB?style=for-the-badge&logo=React&logoColor=white"> 
<img src="https://img.shields.io/badge/EXPRESSJS-000000?style=for-the-badge&logo=Express&logoColor=white">

