import { auth, db } from "../firebase/firebase_config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// Email/Password register
export const registerWithEmail = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;

  // Creăm documentul utilizatorului în Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: "",
    joinedAt: serverTimestamp(),
    points: 0,
    completedHabits: [],
    streak: 0
  });

  return user;
};

// Email/Password login
export const loginWithEmail = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Google login
const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // Dacă nu există deja documentul, îl creăm
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Utilizator nou",
        joinedAt: serverTimestamp(),
        points: 0,
        completedHabits: [],
        streak: 0
      });
    }

    return user;
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
