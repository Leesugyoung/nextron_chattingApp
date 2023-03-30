# Nextron Chatting App

Nextron + firebase 를 사용한 채팅앱 입니다.

Next.js 를 공부하며 유용한 프로젝트를 만들고 싶어 고민하던 중,  
데스크탑 App 제작이 가능한 Electron 과 Next.js 가 결합된 **Nextron** 이라는 프레임워크를 발견하였습니다.  
이에 카카오톡처럼 1:1 채팅이 가능한 데스크탑 App 을 제작해보고 싶어 만들게 되었으며,

백엔드는 실시간 웹 애플리케이션에 최적화된 데이터 베이스 방식을 활용한 **firebase**를 사용했습니다. 🙂

---

### 🚀 개발환경

- 언어 : React, TypeScript
- 백엔드 : firebase
- 배포 : nextron
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

---

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

### 🏴‍☠️ 프로젝트 화면 이미지

<details>
<summary>메인페이지</summary>
<div markdown="1">
<img width="80%" src="https://user-images.githubusercontent.com/109075864/228923746-a1f7caed-1000-481b-82bf-73e8e2fccadf.png"/>
</div>
</details>
<details>
<summary>회원가입</summary>
<div markdown="1">
<img width="80%" src="https://user-images.githubusercontent.com/109075864/228924587-a74b2e1a-2187-4ae2-abdb-ffbab992f212.png"/>
</div>
</details>
<details>
<summary>로그인 후</summary>
<div markdown="1">
<img width="80%" src="https://user-images.githubusercontent.com/109075864/228925234-3762a633-ec53-408a-a753-f2a384247f71.png"/>
</div>
</details>
<details>
<summary>유저 검색</summary>
<div markdown="1">
<img width="80%" src="https://user-images.githubusercontent.com/109075864/228925456-46795520-c1e8-4890-998c-f77e5ffd986f.png"/>
</div>
</details>
<details>
<summary>채팅방 생성 & 채팅창</summary>
<div markdown="1">
<img width="80%" src="https://user-images.githubusercontent.com/109075864/228925764-472ca5f6-e1d5-40ba-83e5-2b5fc8fffa26.png"/>
</div>
</details>
<details>
<summary>답장 화면</summary>
<div markdown="1">
<img width="80%" src="https://user-images.githubusercontent.com/109075864/228926166-e9ea9ba8-0e2d-434f-a89a-7dc84b49342f.png"/>
</div>
</details>
<details>
<summary>채팅방 삭제</summary>
<div markdown="1">
<img width="80%" src="https://user-images.githubusercontent.com/109075864/228926364-26252343-cf68-478a-8409-fcacce461ce0.png"/>
</div>
</details>

---  

#### 📖 배운점? 성과?

- 이 프로젝트를 만들면서 가장 성장한 점은 공식문서를 두려워하지 않게 되었다는 점 입니다.  
  공식문서의 기본 예제와 응용 예제를 보면서 개념을 되짚어 보고,  
  머릿속에서 코드를 직접 실행해보는 등의 방법을 계속 연습하니 공식문서가 더는 두렵지 않고  
  오히려 잘 정리된 국영수 교과서 같은 친근함을 느낄 수 있었습니다.  
  또 과정에서 코드를 머리속에서 시각화 하는 능력도 기를 수 있었습니다.

---

#### 🤯 디벨롭 예정 리스트

- 회원 탈퇴 기능
- 읽지 않은 메시지 1 출력, 읽을 시 제거
