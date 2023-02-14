import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AuthContextProvider } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
  databaseURL: process.env.DATABASEURL,
};

// Initialize Firebase

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
