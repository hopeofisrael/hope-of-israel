// firebase/auth.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Firebase configuration (ensure this contains the correct API key)
const firebaseConfig = {
  apiKey: "AIzaSyDnKHJqHvV5E8m-LIMzBJfb0JK8F2FTfd0",
  authDomain: "hope-of-israel-796fa.firebaseapp.com",
  projectId: "hope-of-israel-796fa",
  storageBucket: "hope-of-israel-796fa.firebasestorage.app",
  messagingSenderId: "626678328925",
  appId: "1:626678328925:web:42dec1dca540ed77e9a7b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign up function
export const emailSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    throw error;
  }
};

// Sign in function
export const emailSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    throw error;
  }
};
