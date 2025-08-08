import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDy-6ThsxwzO0Xcdacp0mmBOL24OSmzQHs",
  authDomain: "office-management-system-2607f.firebaseapp.com",
  projectId: "office-management-system-2607f",
  storageBucket: "office-management-system-2607f.firebasestorage.app",
  messagingSenderId: "185005298186",
  appId: "1:185005298186:web:83fbb1b3eaee1de5fa05f3"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Exports
export const auth = getAuth(app);      // Authentication
export const db = getFirestore(app);   // Firestore
export const storage = getStorage(app);// Storage
