// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate-af4b5.firebaseapp.com",
  projectId: "mern-estate-af4b5",
  storageBucket: "mern-estate-af4b5.appspot.com",
  messagingSenderId: "38288500343",
  appId: "1:38288500343:web:7cb726aebf50f6e6270872"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);