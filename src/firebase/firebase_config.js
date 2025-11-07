// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXD3vAEtaKSr6YzDNdTRZfi4pcIAdqWZw",
  authDomain: "greenhabits-627a4.firebaseapp.com",
  projectId: "greenhabits-627a4",
  storageBucket: "greenhabits-627a4.firebasestorage.app",
  messagingSenderId: "189097871019",
  appId: "1:189097871019:web:3bd4f89e7dd71d7cf319ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);