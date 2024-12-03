import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import getAuth to create the auth instance

const firebaseConfig = {
  apiKey: "AIzaSyDnKHJqHvV5E8m-LIMzBJfb0JK8F2FTfd0",
  authDomain: "hope-of-israel-796fa.firebaseapp.com",
  projectId: "hope-of-israel-796fa",
  storageBucket: "hope-of-israel-796fa.firebasestorage.app",
  messagingSenderId: "626678328925",
  appId: "1:626678328925:web:42dec1dca540ed77e9a7b4",
};

const app = initializeApp(firebaseConfig);

// Initialize the auth instance and export it
const auth = getAuth(app);
export { auth };  // Export auth so it can be used in other files
