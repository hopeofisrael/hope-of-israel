// app/page.js

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to signup page automatically
    router.push("/signup");
  }, [router]);

  return <div>Redirecting...</div>;
}
