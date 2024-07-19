// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGphNYGLdPl99NJbvkipoZl-Nb8iUnIk8",
  authDomain: "reactchat-1a08c.firebaseapp.com",
  projectId: "reactchat-1a08c",
  storageBucket: "reactchat-1a08c.appspot.com",
  messagingSenderId: "125791226745",
  appId: "1:125791226745:web:85c7105a8785464e5fbda8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };