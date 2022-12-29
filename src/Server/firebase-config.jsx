import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDk4ZdasHY_4IVhPJdMnri9KC5e7w5K7Tw",
  authDomain: "wishlist-abcc4.firebaseapp.com",
  projectId: "wishlist-abcc4",
  storageBucket: "wishlist-abcc4.appspot.com",
  messagingSenderId: "272560133677",
  appId: "1:272560133677:web:5000eac3bf249b93398aa4",
  measurementId: "G-2EVHD08M3F",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
