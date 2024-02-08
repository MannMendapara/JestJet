import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2TlBOX69GLCahpWYRQHlR9w422nzgnTU",
  authDomain: "memas-69fe5.firebaseapp.com",
  projectId: "memas-69fe5",
  storageBucket: "memas-69fe5.appspot.com",
  messagingSenderId: "334449453773",
  appId: "1:334449453773:web:c1771b43c8e9b9153c1784",
  measurementId: "G-8QM3MS40PR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
