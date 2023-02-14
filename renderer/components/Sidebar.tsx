import Navbar from "./Navbar";
import { collection, query, getDocs } from "firebase/firestore";
import { db, auth } from "../pages/_app";
import { memo, useCallback, useEffect, useState } from "react";
import Search from "./Search";
import { useRouter } from "next/router";

// 유저 목록
const Sidebar = memo(() => {
  const router = useRouter();
  const loggedinuser = auth.currentUser?.email;
  // 상태 업데이트를 위한
  const [user, setUsers] = useState(null);

  // firestroe > user 컬렉션 가져오기
  const fetchUserData = useCallback(async () => {
    const q = query(collection(db, "users"));
    const data = await getDocs(q);
    const newData = data.docs.map((doc, index) => ({
      ...doc.data(),
      key: index,
    }));
    setUsers(newData);
  }, [db]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const onClick = (uid: number, email: string) => {
    router.push({
      pathname: `/chat/${uid}/${email}`,
    });
  };

  return (
    <div>
      {user ? (
        <div className="sidebar-container">
          <Navbar />
          <div>
            <Search />
          </div>
          <div className="title">🔸USER LIST</div>
          {/* 로그인된 유저를 제외한 나머지 가입자 유저 목록만 출력 */}
          {user
            .filter(e => e.email !== loggedinuser)
            .map(e => (
              <div key={e.uid} className="userlist">
                <span onClick={() => onClick(e.uid, e.email)}>
                  🟡 {e.email}
                </span>
              </div>
            ))}
        </div>
      ) : (
        <h4 className="loading">loding...</h4>
      )}
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
