# Nextron Chatting App

Nextron + firebase 를 사용한 채팅앱 입니다.

Nextron 은 Electron 과 Next.js 가 결합된 데스크탑 App 제작 프레임워크 입니다.  
이에 PC 에서도 앱 처럼 구동되는 1:1 채팅 프로그램을 만들고 싶어  
Electron 을 사용해 제작하게 되었습니다.

(Nextron Github 주소 : https://github.com/saltyshiomix/nextron)

---

개발 모드 서버 실행 방법입니다.

```
$npm run dev
```

---

### 🚀 개발환경

- 언어 : React, TypeScript
- 백엔드 : firebase
- 배포 : electron-builder
- 라이브러리 : npm

---

### ⚙️ 기능 설명

- 회원가입, 로그인&로그아웃 기능
  - 회원가입, 로그인, 로그아웃 가능
  - `.then` 과 `.catch` 를 사용해 오류가 발생할 경우 화면에 예외 상황에 대한 문구 출력
- Sidebar(좌측 메뉴바)
  - 나를 제외한 유저 리스트 출력(가입된 유저만)
  - 1:1 채팅방이 생성되면 유저 리스트 상단에 생성되며,  
    클릭 시 해당 유저와의 채팅 방으로 이동
- 1:1 채팅 기능
  - 1:1 채팅방 생성
    - 유저 검색 후 출력된 유저를 클릭하면 1:1 채팅방 생성되며,  
      해당 유저와의 채팅방으로 즉시 이동
    - 생성된 채팅방은 Sidebar 에 추가
  - 1:1 채팅
    - firebase database 를 사용하여 유저별 채팅 확인, 발송
- 그 외
  - react 의 `Context API`, firebase 의 `getAuth` 를 사용해 전역적으로 로그인된 유저의 정보를 공유하고,  
    로그인된 유저에게만 로그인 이후 화면이 보이도록 설정

### 📝 프로젝트 구조

-📂[src]

---

#### 📖 배운점? 성과?

---

#### 🤯 디벨롭 예정 리스트
