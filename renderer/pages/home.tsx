import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Seo from "../components/Seo";
import main from "../styles/login_signup.module.css";

// 메인페이지, 로그인
function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // 에러처리
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const login = async event => {
    event.preventDefault();
    const auth = getAuth();

    // Firebase 로그인
    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // 인증 받은 사용자만 접근 가능한 페이지로 라우팅
        router.push("/chat");
      })
      .catch(err => {
        setErr(true);
        // 예외 검사
        if (err.code === "auth/invalid-email") {
          setErrMessage("잘못된 이메일 형식입니다.");
        } else if (
          err.code === "auth/user-not-found" ||
          "auth/wrong-password"
        ) {
          setErrMessage("이메일 혹은 비밀번호가 일치하지 않습니다.");
        } else if (err.code === "auth/weak-password") {
          setErrMessage("비밀번호는 6글자 이상이어야 합니다.");
        } else if (err.code === "auth/network-request-failed") {
          setErrMessage("네트워크 연결에 실패 하였습니다.");
        } else if ("auth/internal-error") {
          setErrMessage("잘못된 요청입니다.");
        } else {
          console.log(err.message);
        }
      });
  };

  return (
    <div className={main.container}>
      <Seo title="로그인" />
      <div className={main.title}>Nextron Talk</div>
      <div className={main.minititle}>로그인 후 사용해주세요.✨</div>
      <form onSubmit={login}>
        <div className={main.input_wrap}>
          <div className={main.input}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
            </svg>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className={main.input}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
            </svg>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </div>
          <button>Login</button>
          {err ? <p className={main.errorMessage}>{errMessage}</p> : null}
          <Link href="/signup" legacyBehavior>
            <a className={main.signup}>계정이 없으신가요? &rarr;</a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
