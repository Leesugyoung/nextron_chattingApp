import main from "../styles/login_signup.module.css";
import Seo from "../components/Seo";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

// ----------------------------- 회원가입 페이지
function Signup() {
  const router = useRouter();

  // 가입 정보
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // 에러처리
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const signup = async () => {
    const auth = getAuth();
    // Firebase 계정 생성
    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        router.push("/home");

        // 계정정보 database - user 에 추가.
        const dbService = getFirestore();
        addDoc(collection(dbService, "users"), {
          email: email,
          uid: user.uid,
        });
      })
      .catch(err => {
        setErr(true);
        if (err.code === "auth/invalid-email") {
          setErrMessage("잘못된 이메일 형식입니다.");
        } else if (
          err.code === "auth/user-not-found" ||
          "auth/wrong-password"
        ) {
          setErrMessage("이메일 혹은 비밀번호가 일치하지 않습니다.");
        } else if (err.code === "auth/email-already-in-use") {
          setErrMessage("이미 사용 중인 이메일입니다.");
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
      <Seo title="회원가입" />
      <div className={main.title}>Nextron Talk</div>
      <div className={main.minititle}>
        반가워요! 아래의 정보를 입력하여 가입해주세요.😀
      </div>
      <div className={main.input_wrap}>
        <div className={main.input}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
          </svg>
          <input
            required
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className={main.input}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
          </svg>
          <input
            required
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className={main.input}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
          </svg>
          <input
            required
            placeholder="Password Check"
            type="password"
            name="signup_pwd_check"
          ></input>
        </div>
        <div style={{ fontSize: "10px", color: "gray", margin: "0 auto" }}>
          비밀번호는 최소 6자리 이상이여야 합니다.
        </div>
        <button onClick={signup}>Sign Up</button>
        {err ? <p className={main.errorMessage}>{errMessage}</p> : null}
        <Link href="/home" legacyBehavior>
          <a className={main.signup}>계정이 있다면 &rarr;</a>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
