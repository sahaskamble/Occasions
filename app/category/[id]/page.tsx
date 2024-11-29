'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import PackageCard from '@/components/PackageCard';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

interface CategoryImage {
  name: string;
  contentType: string;
  description?: string;
  url: string;
}

interface Category {
  _id: string;
  CategoryName: string;
  Description: string;
  Image?: CategoryImage;
}

interface PackageImage {
  _id: string;
  url: string;
  name: string;
  contentType: string;
}

interface Package {
  _id: string;
  PackageName: string;
  PackageDesc: string;
  Price: number;
  Images: PackageImage[];
  CategoryId: {
    _id: string;
    CategoryName: string;
  };
}

export default function CategoryPage() {
  const params = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryAndPackages = async () => {
      setLoading(true);
      try {
        // Fetch category details
        const categoryRes = await fetch(`/api/admin/category/${params.id}`);
        const categoryData = await categoryRes.json();

        if (!categoryRes.ok) {
          throw new Error(categoryData.message || 'Failed to fetch category');
        }

        setCategory(categoryData.category);

        // Fetch packages for this category
        const packagesRes = await fetch(`/api/admin/package/fetch?categoryId=${params.id}`);
        const packagesData = await packagesRes.json();

        if (!packagesRes.ok) {
          throw new Error(packagesData.message || 'Failed to fetch packages');
        }

        setPackages(packagesData.packages);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCategoryAndPackages();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Category not found'}
            </h1>
            <Link
              href="/"
              className="inline-flex items-center text-purple-600 hover:text-purple-700"
            >
              <FaArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="relative h-[40vh] md:h-[50vh] w-full">
          <div className="absolute inset-0 bg-black/50 z-10" />
          {category.Image?.url ? (
            <Image
              src={category.Image.url}
              alt={category.CategoryName}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-purple-100 flex items-center justify-center">
              <span className="text-purple-300 text-6xl">✨</span>
            </div>
          )}
          <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center text-white hover:text-purple-200 mb-4"
              >
                <FaArrowLeft className="mr-2" />
                Back to Home
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {category.CategoryName}
              </h1>
              {category.Description && (
                <p className="text-lg text-white/90">
                  {category.Description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {packages.length > 0
              ? `Available Experiences in ${category.CategoryName}`
              : `No experiences available in ${category.CategoryName} yet`}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.filter((pkg) => pkg.CategoryId._id === params.id).map((pkg) => (
              <PackageCard 
                key={pkg._id}
                _id={pkg._id} 
                PackageName={pkg.PackageName} 
                Price={pkg.Price} 
                PackageDesc={pkg.PackageDesc} 
                Images={pkg.Images[0]?.url || '/placeholder-package.jpg'}
                Rating={4.5}
                Duration={'2 Hrs'}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
