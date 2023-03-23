// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from   "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzMbWbbkoOnZ9G5liJE0XuoxXXsdwpXCI",
  authDomain: "chat-app-c3c25.firebaseapp.com",
  projectId: "chat-app-c3c25",
  storageBucket: "chat-app-c3c25.appspot.com",
  messagingSenderId: "175425742413",
  appId: "1:175425742413:web:ce6c417f4944df5f265e04",
  measurementId: "G-SCCCME37B2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export {auth, db}