// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnKHJqHvV5E8m-LIMzBJfb0JK8F2FTfd0",
  authDomain: "hope-of-israel-796fa.firebaseapp.com",
  databaseURL: "https://hope-of-israel-796fa-default-rtdb.firebaseio.com",
  projectId: "hope-of-israel-796fa",
  storageBucket: "hope-of-israel-796fa.firebasestorage.app",
  messagingSenderId: "626678328925",
  appId: "1:626678328925:web:42dec1dca540ed77e9a7b4",
  measurementId: "G-8NRCSXW6S8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = firebase.auth();
const firestore = firebase.firestore();

// Function to handle user sign-up
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const battalion = document.getElementById('battalion').value;

  try {
    // Sign up with Firebase Auth (using the existing flow)
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    const userRef = firestore.collection('users').doc(user.uid); // Use UID as document ID
    await userRef.set({
      email: user.email,
      battalion: battalion,
      completedNames: 0,  // Initialize completed names count as 0
      createdAt: firebase.firestore.FieldValue.serverTimestamp()  // Timestamp for when user was created
    });

    // Redirect to the dashboard page (or show success message)
    alert('User signed up successfully!');
    window.location.href = '/dashboard.html'; // Redirect to a new page with user dashboard

  } catch (error) {
    console.error("Error signing up:", error);
    alert("Error signing up. Please try again.");
  }
});
