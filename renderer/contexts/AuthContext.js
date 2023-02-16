import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../pages/_app";

// context api 사용, 로그인한 유저 확인
export const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    // 현재 로그인된 사용자 정보 관찰
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    // cleanup fn
    return () => {
      unsub();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
