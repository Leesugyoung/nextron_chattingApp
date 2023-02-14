import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const auth = getAuth();
  // 현재 로그인된 사용자 정보
  const { currentUser } = useContext(AuthContext);

  // 로그아웃 기능
  const router = useRouter();
  const onClick = () => {
    signOut(auth)
      .then(() => {
        router.push("/home");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="navbar">
      <span className="username">
        🟢 {currentUser ? currentUser.email : ""}
      </span>
      <button onClick={onClick}>Logout</button>
      <style jsx>{`
        .navbar {
          position: fixed;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          height: 6vh;
          width: 17.7%;
          box-sizing: border-box;
          background-color: #13677e;
          border-right: 1px solid rgb(249, 249, 249);
        }
        .username {
          font-weight: 600;
          color: #f1f1f1;
          font-size: 12px;
        }
        button {
          background-color: #22a1c4;
          border: none;
          font-size: 11px;
          padding: 2px 10px;
          cursor: pointer;
          border-radius: 10px;
          color: #f6f6f6;
          font-weight: 600;
          height: 20px;
        }
      `}</style>
    </div>
  );
}

export default Navbar;
