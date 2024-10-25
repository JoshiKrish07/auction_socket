
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '../loader/Loader';

const ProtectedLayout = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (!token) {
        setIsLoading(false); // Set loading to false if no token
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/api/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        console.log("===response===>", response);
        if (response.ok) {
          const data = await response.json();
          setIsValidToken(data.valid);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('handlename');
          router.push('/login');
          throw new Error('Invalid token');
        }
      } catch (error) {
        console.error("error in protected route",error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkTokenValidity();
  }, [token, router]);

  if (isLoading) {
    return <Loader />; // Show the loader while checking the token
  }

  if (!isValidToken) {
    return null; // Optionally return null or a different fallback component
  }

  return <>{children}</>;
};

export default ProtectedLayout;
