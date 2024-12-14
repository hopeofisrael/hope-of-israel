// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

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

    // Create achievements subcollection
    await createAchievementsSubcollection(user.uid);

    console.log("User signed up successfully");
    return true; // Indicate success
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// Function to create achievements subcollection
const createAchievementsSubcollection = async (userId) => {
  try {
    const achievementDocRef = doc(firestore, "users", userId, "achievements", "first_name_counter");

    // Create the initial achievement document
    await setDoc(achievementDocRef, {
      unlocked: false,
      icon: "first-name-icon.png", // Update this path to your actual icon location
    });

    console.log("Achievements subcollection created for user:", userId);
  } catch (error) {
    console.error("Error creating achievements subcollection:", error);
  }
};

// Observe authentication state
export const observeAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export { auth, firestore };
