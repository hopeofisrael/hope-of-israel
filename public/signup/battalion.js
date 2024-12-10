// battalion.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { firebaseConfig } from "../firebase/firebaseConfig.js"; // Adjust the path if needed
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Check if the user is logged in and has a battalion
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        // If the user is not logged in, redirect to signup.html
        window.location.href = "/signup/signup.html"; // Correct redirection
        return;
    }

    // Check if the user already has a battalion selected in Firestore
    const userDoc = doc(firestore, "users", user.uid);
    const userDocSnap = await getDoc(userDoc);

    if (userDocSnap.exists() && userDocSnap.data().battalion) {
        // If battalion is already selected, redirect to dashboard or next page
        window.location.href = "/signup/dashboard.html"; // Correct redirection
    } else {
        // If no battalion is selected, show the form for selection
        document.getElementById("battalionForm").addEventListener("submit", async (e) => {
            e.preventDefault();

            const battalion = document.getElementById("battalion").value.trim();
            if (!battalion) {
                alert("Please select a battalion.");
                return;
            }

            try {
                // Save the selected battalion in Firestore
                await setDoc(userDoc, {
                    battalion: battalion,
                }, { merge: true });

                // Redirect to the next page after saving
                window.location.href = "/signup/dashboard.html"; // Correct redirection
            } catch (error) {
                console.error("Error saving battalion:", error.message);
                document.getElementById("error-message").style.display = "block";
            }
        });
    }
});
