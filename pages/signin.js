import { useState } from "react";
import { emailSignIn } from "../firebase/auth";

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

  return (
    <div>
      <h1>Sign In</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In with Email</button>
      {error && <p>{error}</p>}
    </div>
  );
}
