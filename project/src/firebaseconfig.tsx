// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5iV_4MxGa9UI8M2hcCQ8hVevawkQKy-g",
  authDomain: "tech-tetris.firebaseapp.com",
  projectId: "tech-tetris",
  storageBucket: "tech-tetris.firebasestorage.app",
  messagingSenderId: "119902732535",
  appId: "1:119902732535:web:c4bb255d0214259d8c13f2",
  measurementId: "G-GKL3EZSRKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);