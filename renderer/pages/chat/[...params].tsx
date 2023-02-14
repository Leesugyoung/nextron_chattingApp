import Seo from "../../components/Seo";
import Sidebar from "../../components/Sidebar";
import chat from "../../styles/chat.module.css";

export default function Chat({ uid, email }) {
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
          <div className={chat.middle}>
            <div className={chat.send_msg}>
              <div>
                ㅋㅋㄹㅃㅃ~ㅋㅋㄹㅃㅃ~ㅋㅋㄹㅃㅃ~ㅋㅋㄹㅃㅃ~ㅋㅋㄹㅃㅃ~ㅋㅋㄹㅃㅃ~
                ㅋㅋㄹㅃㅃ~ ㅋㅋㄹㅃㅃ~ ㅋㅋㄹㅃㅃ~
              </div>
              <div className={chat.send_msgTime}>13: 30pm</div>
            </div>
            <div className={chat.receive_msg}>
              <div>이러려고 답장했나 자괴감 들고 괴로워...</div>
              <div className={chat.msgTime}>13: 31pm</div>
            </div>
          </div>
          <div className={chat.msgFormArea}>
            <form>
              <input type="text" placeholder="내용을 입력하세요." />
              <button>전송</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params: { params } }) {
  const uid = params[0];
  const email = params[1];
  return {
    props: {
      uid,
      email,
    },
  };
}
