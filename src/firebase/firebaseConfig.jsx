/** @format */

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6vGr8XbsxP6i15q_9uPPM5QKBuLO4iR0",
  authDomain: "notion-app-7f185.firebaseapp.com",
  projectId: "notion-app-7f185",
  storageBucket: "notion-app-7f185.appspot.com",
  messagingSenderId: "146997784571",
  appId: "1:146997784571:web:09733688e4c5938ae9255e",
  measurementId: "G-SVRQ41C161",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
