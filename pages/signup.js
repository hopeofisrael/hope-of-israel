import { useState } from "react";
import { emailSignUp, googleSignIn } from "../firebase/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      await emailSignUp(email, password);
      alert("Sign up successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      alert("Google Sign-In successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up with Email</button>
      <button onClick={handleGoogleSignIn}>Sign Up with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
}
