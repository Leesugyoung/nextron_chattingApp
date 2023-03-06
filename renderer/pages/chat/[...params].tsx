import { addDoc, collection, orderBy, query } from "firebase/firestore";
import Seo from "../../components/Seo";
import Sidebar from "../../components/Sidebar";
import chat from "../../styles/chat.module.css";
import { db } from "../_app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

export default function Chat() {
  const { params } = useRouter().query;
  const id = params?.[0];
  const email = params?.[1];
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const { currentUser } = useContext(AuthContext);

  //input
  const [input, setInput] = useState("");
  const sendMessage = async e => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: currentUser.email,
      timestamp: new Date(),
    });
    setInput("");
  };

  const getMessages = () => {
    return messages?.map((msg, index) => {
      const sender = currentUser && msg.sender === currentUser.email;
      const timestamp = new Date(
        msg.timestamp.seconds * 1000
      ).toLocaleDateString();

      return (
        <div key={index} className={sender ? chat.send_msg : chat.receive_msg}>
          <div>{msg.text}</div>
          <div>{timestamp}</div>
        </div>
      );
    });
  };

  return (
    <div className={chat.home}>
      <Seo title={`${email}`} />
      <div className={chat.container}>
        <div className={chat.sidebar}>
          <Sidebar />
        </div>
        <div className={chat.chat}>
          <div className={chat.header}>
            <div className={chat.useremail}>{`🗨️ ${email}`}</div>
          </div>
          <div className={chat.middle}>{getMessages()}</div>
          <div className={chat.msgFormArea}>
            <form onSubmit={sendMessage}>
              <input
                onChange={e => setInput(e.target.value)}
                type="text"
                placeholder="내용을 입력하세요."
                value={input}
              />
              <button>전송</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
