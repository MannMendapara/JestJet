import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA29T4mzkKU08yIX8ghGc2ompKda5yjgY4",
  authDomain: "authentication-17c4a.firebaseapp.com",
  projectId: "authentication-17c4a",
  storageBucket: "authentication-17c4a.appspot.com",
  messagingSenderId: "468265084755",
  appId: "1:468265084755:web:3670695dc973f1ed84a3a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
