// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-f20c0.firebaseapp.com",
  projectId: "realestate-f20c0",
  storageBucket: "realestate-f20c0.appspot.com",
  messagingSenderId: "826416170311",
  appId: "1:826416170311:web:b548f2ddd51e1f8c233862"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);