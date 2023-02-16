import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AuthContextProvider } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1DLvXNmUbMwHEo-Mt7TTyDG3LfvIeQkk",
  authDomain: "nextron-chatting-app-b0a44.firebaseapp.com",
  projectId: "nextron-chatting-app-b0a44",
  storageBucket: "nextron-chatting-app-b0a44.appspot.com",
  messagingSenderId: "1008329057477",
  appId: "1:1008329057477:web:a5ff1aa42570e4f6be7cac",
  measurementId: "G-T2WS1TWX7P",
  databaseURL:
    "https://nextron-chatting-app-b0a44-default-rtdb.firebaseio.com/",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth();
export const db = getFirestore();
export const database = getDatabase();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
