'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

interface Package {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
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

export default function PackagePage() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/admin/category/fetch');
            const data = await response.json();
            if (data.categories) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchPackages = async (category: string) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/packages?category=${category}`);
            if (!response.ok) throw new Error('Failed to fetch packages');
            const data = await response.json();
            setPackages(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchPackages(selectedCategory);
    }, [selectedCategory]);

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 pt-16">
                {/* Categories Section */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
                        <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`flex-none px-6 py-3 rounded-lg ${
                                    selectedCategory === 'all'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-white hover:bg-gray-100'
                                } transition-colors duration-200 shadow-md`}
                            >
                                All Packages
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category._id}
                                    onClick={() => setSelectedCategory(category.CategoryName.toLowerCase())}
                                    className={`flex-none px-6 py-3 rounded-lg ${
                                        selectedCategory === category.CategoryName.toLowerCase()
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-white hover:bg-gray-100'
                                    } transition-colors duration-200 shadow-md`}
                                >
                                    {category.CategoryName}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Packages Grid */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        {loading ? (
                            <div className="flex justify-center items-center min-h-[400px]">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {packages.map((pkg) => (
                                    <div
                                        key={pkg._id}
                                        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div className="relative h-48">
                                            <Image
                                                src={pkg.image || '/placeholder.jpg'}
                                                alt={pkg.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                                            <p className="text-gray-600 mb-4">{pkg.description}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-purple-600 font-bold">
                                                    ₹{pkg.price.toLocaleString()}
                                                </span>
                                                <Link
                                                    href={`/package/${pkg._id}`}
                                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}