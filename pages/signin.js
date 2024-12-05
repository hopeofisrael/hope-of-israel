// pages/signin.js
import { useState } from 'react';
import { useRouter } from 'next/router';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Making GET request to the Vercel API Proxy
      const response = await fetch('/api/proxy', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), 
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Signin successful!');
        setError('');
        // Optionally redirect to a dashboard or another page
        router.push('/dashboard'); // Redirect after successful signin
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
      <h1>Sign In</h1>
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;

