import { useState } from "react";
import { emailSignIn } from "../firebase/auth"; // Import the email sign-in function

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle sign-in button click
  const handleSignIn = async () => {
    try {
      await emailSignIn(email, password); // Call the sign-in function from auth.js
      alert("Sign in successful!");
    } catch (err) {
      setError(err.message); // Catch any error (e.g., incorrect credentials)
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update email state
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password state
      />
      <button onClick={handleSignIn}>Sign In with Email</button>
      {error && <p>{error}</p>} {/* Display error message if any */}
    </div>
  );
}
