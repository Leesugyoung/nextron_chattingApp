import { useContext } from "react";
import Seo from "../components/Seo";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import chat from "../styles/chat.module.css";

function ChatMainpage() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return null;
  return (
    <div className={chat.home}>
      <Seo title="chat" />
      <div className={chat.container}>
        <div className={chat.sidebar}>
          <Sidebar />
        </div>
        <div className={chat.chat}>
          <div className={chat.titleContainer}>
            <p className={chat.title_1}>
              Hi! There <span>ð</span>
            </p>
            <p className={chat.title_2}>
              Nextron Chatting Appì ì¤ì ê±¸ íìí©ëë¤ :)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMainpage;
