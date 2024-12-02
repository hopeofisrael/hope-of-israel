// pages/signup.js
import { useState } from "react";
import { emailSignUp } from "../firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const user = await emailSignUp(email, password);
      console.log("Sign-up successful:", user);
      alert("Sign-up successful!");
    } catch (error) {
      console.error("Sign-up failed:", error.message);
      alert("Sign-up failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleEmailSignUp}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
