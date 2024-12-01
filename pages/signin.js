import { useState } from "react";
import { emailSignIn, googleSignIn } from "../firebase/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await emailSignIn(email, password);
      alert("Sign in successful!");
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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Sign In</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "300px",
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "300px",
        }}
      />
      <button
        onClick={handleSignIn}
        style={{
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Sign In with Email
      </button>
      <button
        onClick={handleGoogleSignIn}
        style={{
          padding: "10px",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Sign In with Google
      </button>
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Error: {error}
        </p>
      )}
    </div>
  );
}
