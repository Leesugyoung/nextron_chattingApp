import { useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../pages/_app";

function Search() {
  const [useremail, setUseremail] = useState("");
  const [user, setUser] = useState(null);

  // 유저 검색기능
  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("email", "==", useremail));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(user => {
        setUser(user.data());
      });
    } catch (err) {
      console.log("유저 찾기 실패, 이메일을 확인해 주세요", err);
    }
  };
  // 엔터키 클릭 감지 및 검색기능 실행
  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  };

  // 선택한 유저와의 1:1 채팅방 추가,생성(chatlist)
  const handleAddList = async () => {
    await addDoc(collection(db, "chatlist"), {
      uid: user.uid,
      email: useremail,
    });
  };

  return (
    <div className="search-container">
      <div className="search_Form">
        <input
          type="text"
          placeholder="🗨️유저검색 후 1:1 채팅 생성하기"
          onChange={e => setUseremail(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {user && (
        <div className="userList">
          <div onClick={() => handleAddList()}>{`🟡 ${user.email} `}</div>
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
      `}</style>
    </div>
  );
}

export default Search;
