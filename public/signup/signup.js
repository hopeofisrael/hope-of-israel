// signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getFirestore, setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { firebaseConfig } from "../firebase/firebaseConfig.js"; // Adjust import path
import { signUp } from './auth.js'; // Import the signUp function

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Handle form submission
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const battalion = document.getElementById("battalion").value.trim();

  try {
    // Ensure user is signed out before attempting to sign up
    await signOut(auth);

    // Create user in Firebase Authentication and save to Firestore
    await signUp(email, password, battalion);

    // After successful signup, redirect to battalion selection
    window.location.href = "/signup/battalion.html"; // Ensure this path is correct
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert("Error signing up. Please try again.");
  }
});
