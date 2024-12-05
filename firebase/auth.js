// Import Firebase app and authentication methods in a modular way
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Get your Firebase config from environment variables
const firebaseConfig = {
  apiKey: "AIzaSyDnKHJqHvV5E8m-LIMzBJfb0JK8F2FTfd0",
  authDomain: "hope-of-israel-796fa.firebaseapp.com",
  databaseURL: "https://hope-of-israel-796fa-default-rtdb.firebaseio.com",
  projectId: "hope-of-israel-796fa",
  storageBucket: "hope-of-israel-796fa.firebasestorage.app",
  messagingSenderId: "626678328925",
  appId: "1:626678328925:web:42dec1dca540ed77e9a7b4",
  measurementId: "G-8NRCSXW6S8"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get authentication instance
const auth = getAuth(app);

// Functions for authentication
export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signout = () => {
  return signOut(auth);
};

export { auth };
