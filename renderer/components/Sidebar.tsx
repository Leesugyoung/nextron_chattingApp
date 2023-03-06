import Navbar from "./Navbar";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../pages/_app";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import Search from "./Search";
import { useRouter } from "next/router";
import getOtherEmail from "../untils/getOtherEmail";
import { AuthContext } from "../contexts/AuthContext";

// 유저 목록
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

  const onClick = async (id: number, email: string) => {
    router.push({
      pathname: `/chat/${id}/${email}`,
    });
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
        }
        .chatList:hover {
          background-color: #ffe9e9;
        }
        .userlist:hover {
          color: #ff3131;
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
