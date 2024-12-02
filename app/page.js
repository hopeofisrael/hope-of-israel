'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Correct import for Next.js 13+

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect example if user is not authenticated
    const isAuthenticated = false;  // Replace with your actual auth check
    if (!isAuthenticated) {
      router.push('/signin');  // Redirect to sign-in page
    }
  }, [router]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}
