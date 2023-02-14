import Seo from "../components/Seo";
import Sidebar from "../components/Sidebar";
import chat from "../styles/chat.module.css";

function ChatMainpage() {
  return (
    <div className={chat.home}>
      <Seo title="chat" />
      <div className={chat.container}>
        <div className={chat.sidebar}>
          <Sidebar />
        </div>
        <div className={chat.chat}>
          <div className={chat.maintitle}>
            <p>안녕하세요 :)</p>
            <p>Nextron Chatting App에 오신걸 환영합니다.✨</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMainpage;
