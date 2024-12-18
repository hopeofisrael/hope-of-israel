// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Ensure user session persists
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence mode set to 'local'—users will stay signed in.");
  })
  .catch((error) => {
    console.error("Error setting persistence mode:", error);
  });

// Sign up function
export const signUp = async (email, password, name, battalion) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    const userRef = doc(firestore, "users", user.uid);
    await setDoc(userRef, {
      email: user.email,
      name: name,
      battalion: battalion,
      createdAt: serverTimestamp(),
    });

    console.log("User signed up successfully");
    return true; // Indicate success
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// Sign in function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed in successfully:", user.email);
    return true; // Indicate success
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

// Observe authentication state
export const observeAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export { auth, firestore };
