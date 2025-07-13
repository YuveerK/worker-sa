// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrkUoTzj1n_6ob-8ScwK_2vNbLAcj8LAI",
  authDomain: "work-sa-staging.firebaseapp.com",
  projectId: "work-sa-staging",
  storageBucket: "work-sa-staging.firebasestorage.app",
  messagingSenderId: "1039900071280",
  appId: "1:1039900071280:web:692eac03ab9a9a4d3aebb5",
  measurementId: "G-QHKLHE8DTY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
const analytics = getAnalytics(app);
