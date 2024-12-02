// Import Firebase library
import { initializeApp } from 'firebase/app';

// Firebase configuration (replace with your Firebase config from Firebase Console)
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

export default app;  // Exporting Firebase app for use in other files
