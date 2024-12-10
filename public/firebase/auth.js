// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js"; // Adjust the path to firebaseConfig.js if necessary

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

// Sign up function
export const signUp = async (email, password, battalion) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    const userRef = doc(firestore, "users", user.uid);
    await setDoc(userRef, {
      email: user.email,
      battalion: battalion,
      completedNames: 0,
      createdAt: serverTimestamp(),
    });

    console.log("User signed up successfully");
    return true; // Indicate success
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error; // Propagate error
  }
};

// Observe authentication state
export const observeAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user); // Pass the user object to the callback function
  });
};

// Export auth and firestore for use in other modules
export { auth, firestore };
