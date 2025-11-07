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

// 🔹 Funcția care face login cu Google
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    // poți accesa datele utilizatorului astfel:
    // console.log("User info:", result.user);
    return result.user;
  } catch (error) {
    console.error("Eroare la login cu Google:", error);
    throw error;
  }
}

// Logout
export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
  }
}
