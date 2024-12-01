import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "./firebaseConfig";

// Initialize Firebase Auth
const auth = getAuth(app);

// Function to send user data to Google Sheets
const sendUserDataToSheet = async (email, provider) => {
  const response = await fetch("https://script.google.com/macros/s/AKfycbwYocoIFMtQEN8sHbkH7HxR-UqwiiFi9QLaQQQT6Sjhqls1ovpzmwR7p68440_MlGJC2w/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, provider }),
  });

  const result = await response.json();
  if (!result.success) {
    console.error("Failed to send data to Google Sheets:", result.error);
  } else {
    console.log("Data successfully sent to Google Sheets!");
  }
};

// Function for Email/Password Sign-Up
export const emailSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendUserDataToSheet(userCredential.user.email, "Email/Password");
    console.log("Sign-Up successful!");
  } catch (err) {
    console.error("Error during sign-up:", err.message);
    throw err;
  }
};

// Function for Email/Password Sign-In
export const emailSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await sendUserDataToSheet(userCredential.user.email, "Email/Password");
    console.log("Sign-In successful!");
  } catch (err) {
    console.error("Error during sign-in:", err.message);
    throw err;
  }
};

// Function for Google Sign-In
export const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await sendUserDataToSheet(result.user.email, "Google");
    console.log("Google Sign-In successful!");
  } catch (err) {
    console.error("Error during Google sign-in:", err.message);
    throw err;
  }
};
