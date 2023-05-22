// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp_3jU6VklFJa7rl9jHWEdjNq72DhB5j4",
  authDomain: "tutor-student-aaba2.firebaseapp.com",
  projectId: "tutor-student-aaba2",
  storageBucket: "tutor-student-aaba2.appspot.com",
  messagingSenderId: "811107985232",
  appId: "1:811107985232:web:02855c03f30eb1f3b92e55",
  measurementId: "G-G723K9XTFZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
