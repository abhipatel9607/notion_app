/** @format */

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBM5tG-_pcBaOII0RajQclQu_3XJU3SGAo",
	authDomain: "notion-app-604ca.firebaseapp.com",
	projectId: "notion-app-604ca",
	storageBucket: "notion-app-604ca.appspot.com",
	messagingSenderId: "1022001565130",
	appId: "1:1022001565130:web:aca2547134c7d1fb105333",
	measurementId: "G-Y44QY5ZBD4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
