'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaHome, FaBox, FaList, FaSignOutAlt, FaSun, FaMoon, FaBars, FaTimes, FaClipboardList } from 'react-icons/fa';
import { useTheme } from 'next-themes';

export default function AdminNavbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Panel</h1>
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <div className="px-4 py-4 space-y-2">
              <Link href="/admin/dashboard" className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                <FaHome className="mr-3" />
                <span>Dashboard</span>
              </Link>
              
              <Link href="/admin/categories" className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                <FaList className="mr-3" />
                <span>Categories</span>
              </Link>
              
              <Link href="/admin/packages" className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                <FaBox className="mr-3" />
                <span>Packages</span>
              </Link>

              <Link href="/admin/inclusions" className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                <FaClipboardList className="mr-3" />
                <span>Inclusions</span>
              </Link>
            </div>
          </nav>

          <div className="border-t dark:border-gray-700">
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center w-full px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
              >
                {theme === 'dark' ? <FaSun className="mr-3" /> : <FaMoon className="mr-3" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
              >
                <FaSignOutAlt className="mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
