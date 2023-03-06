import { useContext, useRef, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../pages/_app";
import { AuthContext } from "../contexts/AuthContext";

function Search({ chats }) {
  // 검색한 이메일
  const [inputemail, setInputemail] = useState("");
  // 검색 후 출력된 이메일
  const [resultuser, setRsultUser] = useState(null);
  // 현재 접속중인 유저
  const { currentUser } = useContext(AuthContext);
  const inputRef = useRef(null);
  const [errMsg, setErrMsg] = useState("");

  // 유저 검색기능
  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("email", "==", inputemail));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(user => {
        setRsultUser(user.data());
      });
    } catch (err) {
      alert("유저 찾기 실패! 이메일을 확인해 주세요");
      console.log(err);
    }
  };
  // 엔터키 클릭 감지 및 검색기능 실행
  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  };

  // 채팅방 존재여부 확인
  const chatExists = email =>
    chats?.find((chat: { users: string[] }) => {
      if (!chat.users) return false; // chat.users가 undefined이면 false를 반환
      return (
        chat.users.includes(resultuser?.email) && chat.users.includes(email)
      );
    });

  // 선택한 유저와의 1:1 채팅방 추가,생성(chatlist)
  const handleAddList = async () => {
    if (
      !chatExists(resultuser.email) &&
      resultuser.email !== currentUser.email
    ) {
      await addDoc(collection(db, "chats"), {
        users: [currentUser.email, resultuser.email],
      });
    } else {
      setErrMsg("이미 생성된 채팅방 입니다!");
      setTimeout(() => {
        setErrMsg("");
      }, 1000); //1초 후에 errMsg를 지움
    }
  };

  return (
    <div className="search-container">
      <div className="search_Form">
        <input
          type="text"
          placeholder="유저검색 후 1:1 채팅 생성하기"
          onChange={e => setInputemail(e.target.value)}
          onKeyDown={handleKey}
          ref={inputRef}
        />
        {errMsg && <p className="errMsg">{errMsg}</p>}
      </div>
      {/* 검색 결과 */}
      {resultuser && (
        <div className="userList">
          <div
            onClick={() => {
              handleAddList();
            }}
          >{`🟡 ${resultuser.email} `}</div>
        </div>
      )}
      <style jsx>{`
        .search-container {
          padding: 5px;
          margin-top: 7vh;
        }
        .search_Form {
          padding: 6px;
          font-size: 10px;
          width: 98%;
        }
        input {
          padding: 5px;
          width: 90%;
          border: none;
          border-bottom: 1.5px solid #777777;
          font-size: 13px;
        }
        input::placeholder {
          font-size: 11px;
          color: #373737;
        }
        .title {
          padding: 10px 5px;
          font-size: 13px;
          font-weight: 700;
          color: #000000;
        }
        .userList {
          padding: 10px;
          font-size: 13px;
          color: #000000;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .userList:hover {
          background-color: #ffc6c6;
        }
        .errMsg {
          font-size: 10px;
          color: #f92f2f;
        }
      `}</style>
    </div>
  );
}

export default Search;
