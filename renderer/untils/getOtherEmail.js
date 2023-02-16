const getOtherEmail = (users, currentUser) => {
  // users : 채팅에 참여중인 두명의 사용자
  // currentUser : 현재 접속중인 사용자
  return users?.filter(user => user !== currentUser.email)[0];
};

export default getOtherEmail;
