import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function useUserAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Check if contact number exists in localStorage
    const contactNumber = localStorage.getItem('contactNumber');
    
    if (!contactNumber && pathname !== '/') {
      router.push('/');
      setShowLoginModal(true);
      return;
    }

    if (contactNumber) {
      setIsAuthenticated(true);
      setShowLoginModal(false);
    }
  }, [router, pathname]);

  const login = (contactNumber: string) => {
    localStorage.setItem('contactNumber', contactNumber);
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  const logout = () => {
    localStorage.removeItem('contactNumber');
    setIsAuthenticated(false);
    router.push('/');
  };

  return { 
    isAuthenticated, 
    showLoginModal, 
    setShowLoginModal,
    login,
    logout
  };
}
