require("dotenv").config();

import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AuthContextProvider } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "nextron-chatting-app-b0a44.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: "nextron-chatting-app-b0a44.appspot.com",
  messagingSenderId: "1008329057477",
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
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
