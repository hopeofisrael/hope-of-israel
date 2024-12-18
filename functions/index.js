import { useEffect, useState } from "react";
import firebase from "../lib/firebase"; // Import the initialized Firebase

// Firebase User ID and Battalion ID
const battalionId = "battalion1"; // Replace with your battalion document ID

// Function to update the completed count
function updateCompletedCount(newCount) {
  const userId = firebase.auth().currentUser?.uid; // Safely get the signed-in user's ID
  if (!userId) {
    console.error("No user is signed in. Cannot update the completed count.");
    return;
  }

  const battalionRef = firebase.firestore().collection("battalions").doc(battalionId);

  // Update the user's count and recalculate the total
  firebase.firestore().runTransaction(async (transaction) => {
    const battalionDoc = await transaction.get(battalionRef);
    if (!battalionDoc.exists) {
      throw new Error("Battalion does not exist!");
    }

    const users = battalionDoc.data().users || {};
    users[userId] = newCount; // Update the user's count

    // Calculate the new total
    const totalNames = Object.values(users).reduce((sum, count) => sum + count, 0);

    transaction.update(battalionRef, { users, totalNames });
  })
    .then(() => {
      console.log("User count and battalion total updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating battalion totals:", error);
    });
}

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

// Custom hook to track authentication state
const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        console.log(`User authenticated: ${user.displayName || user.email}`);
      } else {
        console.log("No user authenticated");
      }
    });

    return () => unsubscribe(); // Cleanup listener when the component is unmounted
  }, []);

  return user;
};

// Main component
const HomePage = () => {
  const user = useAuth(); // Get the current user

  useEffect(() => {
    if (user) {
      console.log(`Welcome back, ${user.displayName || user.email}`);
      // Example: Update completed count (replace with actual logic)
      updateCompletedCount(10); // Replace 10 with the desired count or logic
    } else {
      console.log("User is not signed in");
    }
  }, [user]); // Run this effect when the user state changes

  if (!user) {
    return (
      <div>
        <p>Please sign in to access the site.</p>
        {/* Add a sign-in button or redirect logic here */}
      </div>
    );
  }

  return (
    <div>
      <p>Welcome back, {user.displayName || user.email}!</p>
      {/* Include additional functionality or UI here */}
    </div>
  );
};

export default HomePage;
