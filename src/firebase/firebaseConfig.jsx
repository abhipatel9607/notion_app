/** @format */

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWUeDvUO7yEB4dEz8IlLfflMCk5AyznyA",
  authDomain: "notion-app-1e1ec.firebaseapp.com",
  projectId: "notion-app-1e1ec",
  storageBucket: "notion-app-1e1ec.appspot.com",
  messagingSenderId: "405361530458",
  appId: "1:405361530458:web:f18b25317fdd433d2c6a63",
  measurementId: "G-N5CNGPW9TZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
