'use client';

import Header from "@/components/Header";
import PackageCard from "@/components/PackageCard";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles/carousel.css';
import { FaSearch } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';

interface Image {
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
  Images: Image[];
  CategoryId: {
    CategoryName: string;
  };
}

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
  Image: CategoryImage[];
}

export default function Page() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagesRes, categoriesRes] = await Promise.all([
          fetch('/api/admin/package/fetch'),
          fetch('/api/admin/category/fetch')
        ]);
        
        const packagesData = await packagesRes.json();
        const categoriesData = await categoriesRes.json();
        
        if (packagesData.packages) {
          setPackages(packagesData.packages);
        }
        
        if (categoriesData.categories) {
          setCategories(categoriesData.categories);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPackagesList = packages.filter(pkg =>
    pkg.PackageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.PackageDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.CategoryId.CategoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Categories Section */}
        <section className="mt-16 mb-5 overflow-hidden">
          <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
            {categories.map((category) => (
              <Link 
                href={`/category/${category._id}`} 
                key={category._id}
                className="flex-none group"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-2">
                  {category.Image[0]?.url ? (
                    <Image
                      src={category.Image[0].url}
                      alt={category.CategoryName}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-300 text-4xl">✨</span>
                    </div>
                  )}
                </div>
                <h3 className="text-center text-sm font-medium text-gray-900">
                  {category.CategoryName}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Hero Carousel with Search */}
        <div className="mb-12 relative rounded-3xl overflow-hidden">
          <Carousel
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            className="rounded-xl overflow-hidden"
          >
            <div className="relative h-[50dvh] rounded-xl overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover rounded-xl"
              >
                <source
                  src="/birthday.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="relative h-[50dvh] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d"
                alt="Birthday decorations"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="relative h-[50dvh] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1464349153735-7db50ed83c84"
                alt="Party setup"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </Carousel>

          {/* Centered Search Bar with Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center z-10">
            <div className="w-full max-w-2xl px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={() => setIsSearchOverlayOpen(true)}
                  className="w-full px-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-lg cursor-pointer"
                />
                <FaSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                
                {/* Full Screen Search Results */}
                {isSearchOverlayOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50">
                    <div className="absolute inset-0 flex flex-col items-center pt-12">
                      {/* Search Input in Overlay */}
                      <div className="w-full max-w-2xl px-4 mb-8">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search for experiences..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-lg bg-white/90 backdrop-blur-sm"
                            autoFocus
                          />
                          <FaSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        </div>
                      </div>

                      {/* Search Results Container */}
                      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl mx-4 overflow-hidden">
                        <div className="p-6 border-b border-gray-200/30">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {searchQuery ? 'Search Results' : 'Popular Experiences'}
                          </h2>
                        </div>
                        
                        <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
                          {searchQuery && filteredPackagesList.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                              <p className="text-xl">No packages found</p>
                              <p className="mt-2">Try adjusting your search terms</p>
                            </div>
                          ) : (
                            <div className="p-4">
                              {(searchQuery ? filteredPackagesList : packages).map((pkg) => (
                                <div
                                  key={pkg._id}
                                  className="mb-4 p-4 bg-white/80 rounded-xl hover:bg-white/95 transition-all cursor-pointer"
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="text-xl font-semibold text-gray-900">{pkg.PackageName}</h3>
                                      <p className="text-gray-600 mt-2">{pkg.PackageDesc}</p>
                                      <p className="text-sm text-gray-500 mt-2">Category: {pkg.CategoryId.CategoryName}</p>
                                    </div>
                                    <div className="text-xl font-bold text-purple-600">
                                      ₹{pkg.Price}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Close Button */}
                        <button
                          onClick={() => {
                            setIsSearchOverlayOpen(false);
                            if (!searchQuery) setSearchQuery('');
                          }}
                          className="absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Packages Grid Section */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Experiences</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredPackagesList.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600 mb-4">No packages found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackagesList.map((pkg) => (
              <PackageCard
                key={pkg._id}
                _id={pkg._id}
                PackageName={pkg.PackageName}
                PackageDesc={pkg.PackageDesc}
                Price={pkg.Price}
                Images={pkg.Images[0]?.url}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
