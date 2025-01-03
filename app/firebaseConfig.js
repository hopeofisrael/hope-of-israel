import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
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

// Export the auth instance
const auth = getAuth(app);

export { app, auth };
