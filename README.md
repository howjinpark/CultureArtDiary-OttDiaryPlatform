# CultureArtDiary

## 소개
'CultureArtDiary'는 문화예술(OTT) 활동을 기록하고 공유하는 플랫폼입니다. 이 플랫폼은 자신의 문화예술 활동을 다이어리 형태로 기록하고, 이를 다른 사람들과 공유할 수 있는 기능을 제공합니다.

## 주요 기능
✔ **회원가입 및 로그인**: 회원 가입 및 로그인을 통해 개인 웹사이트를 이용할 수 있습니다. <br>
✔ **개인 다이어리 작성 및 수정**: 다른 사람들의 감상 후기를 확인하고 내 후기도 다른 사람과 공유할 수 있습니다. <br>
✔ **문화 예술 콘텐츠 탐색**: 추천하는 다양한 OTT 콘텐츠를 탐색하고 정보를 제공 받을 수 있습니다. <br>
✔ **캘린더 관리**: 캘린더를 통해 원하는 콘텐츠 알림을 받고 일정 관리를 할 수 있습니다. <br>
✔ **개인 프로필 관리**: 개인 프로필을 만들고 관심사를 설정할 수 있습니다. <br>
✔ **문화 예술 콘텐츠 맞춤 추천**: 키워드 검색을 통해 맞춤 OTT 콘텐츠를 추천 받을 수 있습니다. (ChatGPT 활용)

## server 설명
✔ server/config/dev.js은 MongoDB URI를 설정합니다. (해당 파일은 .gitignore파일로 가려져있음) <br>
✔ server/middleware/auth.js은 사용자 인증을 위한 미들웨어입니다. <br>
✔ server/models/Diary.js은 다이어리 모델을 정의하는 파일입니다. <br>
✔ server/models/User.js은 유저 모델을 정의하는 파일입니다. <br>
✔ server/routes/diary.js은 다이어리 관련 API 엔드포인트를 정의하는 파일입니다. <br>
✔ server/routes/users.js은 유저 관련 API 엔드포인트를 정의하는 파일입니다. <br>
✔ server/index.js은 서버의 엔트리 포인트 파일입니다. 

**서버**는 Node.js와 Express를 사용하여 사용자 인증, 파일 업로드 및 다이어 관리 기능을 제공합니다.

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
|김형민|
|:---:|
|프론트엔드장|


### 🔨 백엔드
|<b>박호진</b>|
|:---:|
|백엔드장|

|앙현우|
|:---:|
|백엔드|

## 사용된 기술 스택

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
