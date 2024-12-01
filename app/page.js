'use client'  // Add this directive at the top

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const [user, setUser] = useState(null);  // Example of a client-side state
  const router = useRouter();  // Using the router from next/router

  // useEffect to mimic client-side behavior (e.g., fetching data)
  useEffect(() => {
    // Example: Check if the user is logged in
    const loggedInUser = localStorage.getItem('user');  // Example localStorage check
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);  // Empty dependency array runs it once on mount

  const handleLogin = () => {
    // Handle user login and redirect to a different page
    setUser({ name: 'John Doe' });
    localStorage.setItem('user', JSON.stringify({ name: 'John Doe' }));
    router.push('/dashboard');  // Redirect after login
  };

  return (
    <div>
      <h1>Welcome to the Hope of Israel</h1>
      {user ? (
        <p>Welcome back, {user.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
