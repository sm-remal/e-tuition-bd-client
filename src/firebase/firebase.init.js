// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADq_qwrCSIs77PhD20ZA2ptcQKJZon-U4",
  authDomain: "e-tuition-bd-10b58.firebaseapp.com",
  projectId: "e-tuition-bd-10b58",
  storageBucket: "e-tuition-bd-10b58.firebasestorage.app",
  messagingSenderId: "281312613538",
  appId: "1:281312613538:web:29779e183db5d6ca9a73fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);