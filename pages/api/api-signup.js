// pages/api/api-signup.js
import { initializeApp, getApp, getApps } from 'firebase/app'; // Import getApp to check for initialization
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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

// Initialize Firebase if it hasn't been initialized yet
if (getApps().length === 0) {
  initializeApp(firebaseConfig); // Initialize only if no apps are already initialized
}

// Firebase authentication service
const auth = getAuth();

const handler = async (req, res) => {
  console.log("Received request:", req.body); // Log the request to check what's being sent
  
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
      // Attempt to create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user); // Log user creation success
      
      // Return success response
      return res.status(200).json({ message: 'User created successfully', user: userCredential.user });
    } catch (error) {
      console.error('Error during signup:', error.message); // Log error to identify issue
      return res.status(500).json({ error: error.message });
    }
  } else {
    // Handle unsupported HTTP methods
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
