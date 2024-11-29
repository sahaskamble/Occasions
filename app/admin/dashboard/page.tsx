'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    categories: 0,
    packages: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch categories count
        const categoriesRes = await fetch('/api/admin/category/fetch');
        const categoriesData = await categoriesRes.json();
        
        // Fetch packages count
        const packagesRes = await fetch('/api/admin/package/fetch');
        const packagesData = await packagesRes.json();

        setStats({
          categories: categoriesData.categories.length,
          packages: packagesData.packages.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Categories Card */}
          <Link href="/admin/categories">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">Categories</h2>
              <p className="text-3xl font-bold text-blue-600">{stats.categories}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Total Categories</p>
            </div>
          </Link>

          {/* Packages Card */}
          <Link href="/admin/packages">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">Packages</h2>
              <p className="text-3xl font-bold text-green-600">{stats.packages}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Total Packages</p>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
