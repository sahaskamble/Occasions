import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin/auth/check', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          router.push('/admin');
          alert('You are not authorized to access this page.');
        }
      } catch (error) {
        router.push('/admin');
      }
    };

    checkAuth();
  }, [router]);
}
