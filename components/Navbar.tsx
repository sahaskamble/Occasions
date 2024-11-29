'use client';

import Image from "next/image";
import Link from "next/link";
import '@/styles/navbar.css';
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contactNumber, setContactNumber] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check localStorage on component mount
    const storedContact = localStorage.getItem('contactNumber');
    if (storedContact) {
      setIsLoggedIn(true);
      setContactNumber(storedContact);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogin = (number: string) => {
    localStorage.setItem('contactNumber', number);
    setContactNumber(number);
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('contactNumber');
    setContactNumber(null);
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href={'/'} className="flex items-center gap-3">
              <Image
                width={40}
                height={40}
                src={'/occasions.png'}
                alt="Occasions Logo"
                className="rounded-full shadow-gray-300 shadow-md"
              />
              <span className="text-xl font-bold hidden sm:block">Occasions</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink href="/" text="Home" />
              <NavLink href="/about" text="About" />
              <NavLink href="/contact" text="Contact" />
              {isLoggedIn ? (
                <>
                  <span className="text-gray-600"> {contactNumber}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="auth-button"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLoginModalOpen(true)}
                  className="auth-button"
                >
                  Login
                </motion.button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className={`md:hidden overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" text="Home" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="/about" text="About" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="/contact" text="Contact" onClick={() => setIsOpen(false)} />
            {isLoggedIn ? (
              <>
                <div className="text-gray-600 px-3 py-2"> {contactNumber}</div>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="auth-button"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                }}
                className="auth-button"
              >
                Login
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </motion.nav>
  );
}

// Desktop Navigation Link Component
const NavLink = ({ href, text }: { href: string; text: string }) => (
  <Link href={href} className="nav-button">
    {text}
  </Link>
);

// Mobile Navigation Link Component
const MobileNavLink = ({
  href,
  text,
  onClick,
}: {
  href: string;
  text: string;
  onClick: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
  >
    {text}
  </Link>
);
