// lib/firebase.js
import firebase from "firebase/app";
import "firebase/auth"; // Import Firebase Authentication
import "firebase/firestore"; // Import Firestore
import { firebaseConfig } from "./firebaseConfig"; // Adjust path if necessary

// Initialize Firebase only if it hasn't been initialized already
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use the already initialized app
}

export default firebase;
