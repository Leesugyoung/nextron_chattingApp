import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AuthContextProvider } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_PROJECTID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_MESSAGINGSENDERID}`,
  appId: `${process.env.NEXT_PUBLIC_APPID}`,
  measurementId: `${process.env.NEXT_PUBLIC_MEASUREMENTID}`,
  databaseURL: `${process.env.NEXT_PUBLIC_DATABASEURL}`,
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
