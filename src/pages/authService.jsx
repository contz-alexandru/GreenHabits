auth
import { auth } from "../firebase/firebase_config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

// Email/Password register
export const registerWithEmail = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Email/Password login
export const loginWithEmail = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Google login
const provider = new GoogleAuthProvider();
export const loginWithGoogle = async () => {
  return signInWithPopup(auth, provider);
};

// Logout
export const logout = async () => {
  return signOut(auth);
};