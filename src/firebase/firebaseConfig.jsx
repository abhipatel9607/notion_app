/** @format */

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB06TUtziiIIs9b5yBzqvW4AO_YXoVSDPI",
  authDomain: "notion-app-69b72.firebaseapp.com",
  projectId: "notion-app-69b72",
  storageBucket: "notion-app-69b72.appspot.com",
  messagingSenderId: "852112069093",
  appId: "1:852112069093:web:471c04369bfee550765f0c",
  measurementId: "G-SHZGT37JNY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
