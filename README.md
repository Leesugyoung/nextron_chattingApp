# Nextron Chatting App

Nextron + firebase 를 사용한 채팅앱 입니다.

Next.js 를 공부하며 유용한 프로젝트를 만들고 싶어 찾아보던 중,  
데스크탑 App 제작이 가능한 Electron 과 Next.js 가 결합된 프레임워크를 발견하였습니다.  
이에 1:1 채팅이 가능한 데스크탑 App 을 제작하고 싶어 결정 후 제작하게 되었으며,  
백엔드는 firebase 를 사용하였습니다.

(Nextron Github 주소 : https://github.com/saltyshiomix/nextron)

---

###### 개발 서버 실행

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

- 회원가입, 로그인&로그아웃
  - 회원가입, 로그인, 로그아웃 가능
  - `.then` 과 `.catch` 를 사용해 오류가 발생할 경우 화면에 예외 상황에 대한 문구 출력
- Sidebar(좌측 메뉴바)
  - 나를 제외한 유저 리스트 출력(가입된 유저만)
  - 1:1 채팅방이 생성되면 유저 리스트 상단에 생성되며,  
    클릭 시 해당 유저와의 채팅 방으로 이동
- 1:1 채팅
  - 1:1 채팅방 생성
    - 유저 검색 후 출력된 유저를 클릭하면 1:1 채팅방 생성되며,  
      해당 유저와의 채팅방으로 즉시 이동
    - 생성된 채팅방은 Sidebar 에 추가
  - 1:1 채팅
    - firebase database 를 사용하여 유저별 채팅 확인, 발송
    - 내가 아닌 다른 유저들간의 채팅 확인 불가
- 그 외
  - react 의 `Context API`, firebase 의 `getAuth` 를 사용해 전역적으로 로그인된 유저의 정보를 공유하고,  
    로그인된 유저에게만 로그인 이후 화면이 보이도록 설정

### 📝 프로젝트 구조

-📂[renderer]  
├──[components]/  
　　 └── Navbar.tsx 　# 유저 및 로그아웃 컴포넌트.tsx  
　　 └── Search.tsx 　# 유저 검색 컴포넌트.tsx  
　　 └── Seo.tsx 　 　# next/head 컴포넌트.tsx  
　　 └── Sidebar.tsx # 메뉴바 구성 컴포넌트.tsx  
├──[contexts]/  
　　 └── AuthContext.tsx 　# 로그인 유저 전역관리 contexts  
├──[pages]/  
　　 └── \_app.tsx 　 # app 구성 요소 정의 컴포넌트.tsx  
　　 └── \_document.tsx 　# HTML 커스텀 컴포넌트.tsx  
　　 └── chat.tsx 　　# chat 메인 화면 컴포넌트.tsx  
　　 └── home.tsx 　　# 메인, 로그인 화면  
　　 └── signup.tsx 　# 회원가입 화면  
　　 └── [chat]/  
　　 　 └── [...params].tsx 　# 유저별 채팅 리스트  
├──[styles]/\*　# 스타일 컴포넌트

---

#### 📖 배운점? 성과?

- firebase 의 공식문서 내용 외에 추가적인 내용 숙지를 위해 구글에 검색하면  
  아직까지도 8 버전의 사용,해결 방법들이 대부분이였다.
  그래서 공식문서와 함께 직접 해결해가며 firebase 를 심도있게 공부할 수 있었다.
- 1:1 채팅앱은 보안 및 조건설정이 관건이였다.  
  로그인 여부, 로그인된 유저의 여부에 따라 보여지면 안되면 내용들이 있었기에  
  이 또한 로직을 더 많이 고민하고 결정하는 능력을 기를 수 있었다.

---

#### 🤯 디벨롭 예정 리스트

- 채팅방 삭제 기능
- 읽지 않은 메시지 1 출력, 읽을 시 제거
