import { useState } from "react";
import { emailSignIn, googleSignIn } from "../auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await emailSignIn(email, password);
      alert("Sign-in successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      alert("Google sign-in successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h1>Sign In</h1>
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
      <button onClick={handleSignIn} style={{ margin: "10px 0", padding: "10px 20px" }}>
        Sign In with Email
      </button>
      <button onClick={handleGoogleSignIn} style={{ margin: "10px 0", padding: "10px 20px" }}>
        Sign In with Google
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
