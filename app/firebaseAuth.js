'use client'

import { useState } from 'react';
import { auth, firebase } from './firebaseConfig';  // Import Firebase configuration
import { useRouter } from 'next/router';  // Router for redirection

export default function FirebaseAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();  // To redirect after login

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
      router.push('/dashboard');  // Redirect on successful login
    } catch (error) {
      setError('Google sign-in failed');
    }
  };

  // Handle Email/Password Sign-Up or Sign-In
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push('/dashboard');  // Redirect on successful login
    } catch (error) {
      setError('Email/password sign-in failed');
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      router.push('/dashboard');  // Redirect on successful sign-up
    } catch (error) {
      setError('Sign-up failed');
    }
  };

  return (
    <div>
      <h1>Sign In or Sign Up</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>

      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEmailSignIn}>Sign In with Email</button>
        <button onClick={handleEmailSignUp}>Sign Up with Email</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}
