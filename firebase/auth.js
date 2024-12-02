import { auth } from './firebaseConfig'; // Import the Firebase configuration and auth instance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Your Google Apps Script URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx0pB2WlIYM7okYkOwJ8rlsQc1arfCZ6XZSiJ2h5BSjQ2PovP8STdha0ijnCW7peLF9-g/exec";

// Function to send user data to Google Sheets
const sendUserDataToSheet = async (email, provider) => {
  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, provider }),
  });

  const result = await response.json();

  if (!result.success) {
    console.error("Error sending data to Google Sheets:", result.error);
  } else {
    console.log("User data successfully sent to Google Sheets.");
  }
};

// Function to fetch user data from Google Sheets
const fetchUserDataFromSheet = async (email) => {
  const response = await fetch(`${SCRIPT_URL}?email=${encodeURIComponent(email)}`, {
    method: "GET",
  });

  const result = await response.json();

  if (!result.success) {
    console.error("Error fetching user data from Google Sheets:", result.error);
    return null;
  } else {
    console.log("User data successfully retrieved:", result.data);
    return result.data;
  }
};

// Function for signing up with email and password
export const emailSignUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendUserDataToSheet(userCredential.user.email, "Email/Password");
  console.log("User signed up successfully.");
};

// Function for signing in with email and password
export const emailSignIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userData = await fetchUserDataFromSheet(userCredential.user.email);

  if (userData) {
    console.log("User data:", userData);
  }
};

// Function for signing in with Google
export const googleSignIn = async () => {
  const result = await signInWithPopup(auth, new GoogleAuthProvider());
  const userData = await fetchUserDataFromSheet(result.user.email);

  if (userData) {
    console.log("User data:", userData);
  } else {
    await sendUserDataToSheet(result.user.email, "Google");
    console.log("User data sent to Google Sheets.");
  }
};
