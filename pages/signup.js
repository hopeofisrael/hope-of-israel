import { useState } from "react";
import { emailSignUp, googleSignIn } from "../auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      await emailSignUp(email, password);
      alert("Sign-up successful! You can now sign in.");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await googleSignIn();
      alert("Google sign-up successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h1>Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", width: "100%", margin: "10px 0" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", margin: "10px 0" }}
      />
      <button onClick={handleSignUp} style={{ margin: "10px 0", padding: "10px 20px" }}>
        Sign Up with Email
      </button>
      <button onClick={handleGoogleSignUp} style={{ margin: "10px 0", padding: "10px 20px" }}>
        Sign Up with Google
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
