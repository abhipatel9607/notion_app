/** @format */

import { useContext, createContext, useEffect, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const googleSingIn = async () => {
		await signInWithPopup(auth, provider);
	};

	const logOut = () => {
		signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<AuthContext.Provider value={{ googleSingIn, user, logOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
