import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebase Auth instance
const auth = getAuth();

// Google Apps Script URL
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx0pB2WlIYM7okYkOwJ8rlsQc1arfCZ6XZSiJ2h5BSjQ2PovP8STdha0ijnCW7peLF9-g/exec";

// Function to send user data to the Google Sheet
const sendUserDataToSheet = async (email, provider) => {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
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
  } catch (error) {
    console.error("Failed to send user data to Google Sheets:", error);
  }
};

// Function to fetch user data from the Google Sheet
const fetchUserDataFromSheet = async (email) => {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?email=${encodeURIComponent(email)}`, {
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
  } catch (error) {
    console.error("Failed to fetch user data from Google Sheets:", error);
    return null;
  }
};

// Function to handle email/password sign-up
export const emailSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);

    // Send user data to Google Sheets
    await sendUserDataToSheet(email, "Email/Password");
  } catch (error) {
    console.error("Error during email sign-up:", error);
  }
};

// Function to handle email/password sign-in
export const emailSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);

    // Fetch user data from Google Sheets
    const userData = await fetchUserDataFromSheet(email);

    if (userData) {
      console.log("User data:", userData);
      // You can add logic here to display or use the user data
    }
  } catch (error) {
    console.error("Error during email sign-in:", error);
  }
};

// Function to handle Google sign-in
export const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in with Google:", result.user);

    // Send user data to Google Sheets
    await sendUserDataToSheet(result.user.email, "Google");

    // Fetch user data from Google Sheets
    const userData = await fetchUserDataFromSheet(result.user.email);

    if (userData) {
      console.log("User data:", userData);
      // You can add logic here to display or use the user data
    }
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }
};
