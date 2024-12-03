// pages/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [provider, setProvider] = useState('google'); // You can dynamically set this based on the signup method
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Making POST request to the Vercel API Proxy
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, provider }), // Send email and provider to proxy
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Signup successful!');
        setError('');
        // Optionally redirect after signup
        router.push('/signin'); // Redirect to signin page after successful signup
      } else {
        setError('Error: ' + (data.error || 'Something went wrong'));
        setSuccess('');
      }
    } catch (error) {
      setError('Error: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Provider:
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            required
          >
            <option value="google">Google</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            {/* Add more providers as needed */}
          </select>
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

