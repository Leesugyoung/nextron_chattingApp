import Navbar from "./Navbar";
import {
  collection,
  query,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../pages/_app";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import Search from "./Search";
import { useRouter } from "next/router";
import getOtherEmail from "../untils/getOtherEmail";
import { AuthContext } from "../contexts/AuthContext";

// 채팅, 유저목록
const Sidebar = memo(() => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  // 상태 업데이트를 위한 useCallback 사용
  const [users, setUsers] = useState(null);
  const [chats, setChats] = useState([]);

  // users 컬렉션 가져오기
  const fetchUserData = useCallback(async () => {
    const q = query(collection(db, "users"));
    const data = await getDocs(q);
    const newData = data.docs.map((doc, index) => ({
      ...doc.data(),
      key: index,
    }));
    setUsers(newData);
  }, [db]);

  // chats 컬렉션 가져오기
  const fetchChatData = useCallback(() => {
    const q = query(collection(db, "chats"));
    const unsub = onSnapshot(q, snapshot => {
      const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChats(newData);
    });
    return unsub;
  }, [db]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    fetchChatData();
  }, [fetchChatData]);

  // 해당하는 유저와의 채팅방으로 이동
  const onClick = async (id: number, email: string) => {
    router.push({
      pathname: `/chat/${id}/${email}`,
    });
  };

  // 채팅방 삭제
  const handleChatDel = async (chatId: string) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "chats", chatId));
      router.push({
        pathname: `/chat`,
      });
    }
  };

  return (
    <div>
      <div className="sidebar-container">
        <Navbar />
        <div>
          <Search chats={chats} />
        </div>
        <div className="title">🔸1:1 CHAT</div>
        {/* user.email을 포함하는 채팅방에 대한 객체들만 반환 */}
        {chats &&
          chats
            ?.filter(
              chat => chat.users && chat.users.includes(currentUser?.email)
            )
            .map((chat, index) => (
              <div key={index} className="chatList">
                <span
                  onClick={() => onClick(chat.id, chat.users[1])}
                >{`🗨️ ${getOtherEmail(chat.users, currentUser)}`}</span>
                <button
                  className="chatDelBtn"
                  onClick={() => handleChatDel(chat.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
        <div className="title">🔸USER LIST</div>
        {/* 로그인된 유저를 제외한 나머지 가입자 유저 목록만 출력 */}
        {users
          ? users
              .filter(e => e.email !== currentUser?.email)
              .map(e => (
                <div key={e.uid} className="userlist">
                  <span>🟡 {e.email}</span>
                </div>
              ))
          : ""}
      </div>
      <style jsx>{`
        .sidebar-container {
          width: 100%;
          height: 100vh;
          border-right: 1px solid rgb(150, 151, 151);
          overflow-x: hidden;
        }
        .title {
          padding: 10px 5px;
          font-size: 13px;
          font-weight: 700;
          color: #000000;
        }
        .userlist,
        .chatList {
          padding: 10px;
          font-size: 13px;
          color: #000000;
          font-weight: 600;
        }
        .chatList {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chatList:hover {
          background-color: #ffe9e9;
        }
        .userlist:hover {
          color: #ff3131;
        }
        .chatDelBtn {
          border: none;
          background-color: transparent;
          font-size: 10px;
          border-radius: 10px;
          cursor: pointer;
        }
        .chatDelBtn:hover {
          background-color: #ffc7c7;
        }
        .loading {
          font-size: 14px;
          margin: 0 auto;
          color: gray;
        }
      `}</style>
    </div>
  );
});

export default Sidebar;
