import { auth } from './firebaseConfig'; // Import the Firebase auth instance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Ensure the URL is constructed correctly, regardless of trailing slash
const PROXY_URL = process.env.NEXT_PUBLIC_PROXY_URL
  ? `${process.env.NEXT_PUBLIC_PROXY_URL}/api/proxy`.replace(/\/\//g, '/')
  : null;

if (!PROXY_URL) {
  console.error('Error: NEXT_PUBLIC_PROXY_URL is not defined. Please check your .env.local file.');
} else {
  console.log('PROXY_URL:', PROXY_URL); // Debug: Check the constructed URL
}

// Function to send user data to Google Sheets through the proxy
const sendUserDataToSheet = async (email, provider) => {
  if (!PROXY_URL) return; // Prevent sending requests if the URL is invalid

  const response = await fetch(PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, provider }),
    mode: 'cors', // Enable CORS
  });

  const result = await response.json();

  if (!result.success) {
    console.error('Error sending data to Google Sheets:', result.error);
  } else {
    console.log('User data successfully sent to Google Sheets.');
  }
};

// Function to fetch user data from Google Sheets through the proxy
const fetchUserDataFromSheet = async (email) => {
  if (!PROXY_URL) return null; // Prevent sending requests if the URL is invalid

  const response = await fetch(`${PROXY_URL}?email=${encodeURIComponent(email)}`, {
    method: 'GET',
    mode: 'cors', // Enable CORS
  });

  const result = await response.json();

  if (!result.success) {
    console.error('Error fetching user data from Google Sheets:', result.error);
    return null;
  } else {
    console.log('User data successfully retrieved:', result.data);
    return result.data;
  }
};

// Function for signing up with email and password
export const emailSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendUserDataToSheet(userCredential.user.email, 'Email/Password');
    console.log('User signed up successfully.');
  } catch (error) {
    console.error('Error signing up:', error.message);
  }
};

// Function for signing in with email and password
export const emailSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userData = await fetchUserDataFromSheet(userCredential.user.email);

    if (userData) {
      console.log('User data:', userData);
    }
  } catch (error) {
    console.error('Error signing in:', error.message);
  }
};

// Function for signing in with Google
export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const userData = await fetchUserDataFromSheet(result.user.email);

    if (userData) {
      console.log('User data:', userData);
    } else {
      await sendUserDataToSheet(result.user.email, 'Google');
      console.log('User data sent to Google Sheets.');
    }
  } catch (error) {
    console.error('Error signing in with Google:', error.message);
  }
};
