// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// ==== note: value object config urung dipindah ke .env.local ================
const firebaseConfig = {
  apiKey: "AIzaSyCMcpLrVhY1iIyJ_Pf4vUvfY5qHFlzw_w0",
  authDomain: "try-firebase-auth-67f58.firebaseapp.com",
  projectId: "try-firebase-auth-67f58",
  storageBucket: "try-firebase-auth-67f58.appspot.com",
  messagingSenderId: "983463829609",
  appId: "1:983463829609:web:ef0755e944e56e4bd842f8",
  measurementId: "G-XDHQKSNF33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);