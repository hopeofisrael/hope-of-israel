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
      alert("Google Sign-Up successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Sign Up</h1>
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
        onClick={handleSignUp}
        style={{
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Sign Up with Email
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
        Sign Up with Google
      </button>
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Error: {error}
        </p>
      )}
    </div>
  );
}
