import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGAbTvpmMxW3ODuMWxOHWFTYcyDBe3_GM",
  authDomain: "classroom-registration-ed25d.firebaseapp.com",
  projectId: "classroom-registration-ed25d",
  storageBucket: "classroom-registration-ed25d.firebasestorage.app",
  messagingSenderId: "508577755116",
  appId: "1:508577755116:web:e9850b539a9a827ed0dac9",
  measurementId: "G-7KL1PX6TDC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Set persistence to LOCAL (survives browser restart)
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Persistence error:", error);
});

// Initialize Firestore Database
export const db = getFirestore(app);

export default app;
