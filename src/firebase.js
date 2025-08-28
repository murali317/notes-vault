// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // if using Firestore for notes
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAirJW78QkiSFjJz91cdVutWk07QDnyctw",
  authDomain: "notes-vault-b65e9.firebaseapp.com",
  projectId: "notes-vault-b65e9",
  storageBucket: "notes-vault-b65e9.firebasestorage.app",
  messagingSenderId: "306096819019",
  appId: "1:306096819019:web:ea5362173933b25d18b6ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth instance
export const auth = getAuth(app);

// Firestore instance (for storing notes)
export const db = getFirestore(app); // ✅ Firestore instance

export default app;