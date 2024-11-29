'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AdminLayout from '@/components/AdminLayout';

interface Category {
  _id: string;
  CategoryName: string;
  CategoryDesc: string;
  Images: CategoryImage[];
}

interface CategoryImage {
  name: string;
  contentType: string;
  description?: string;
  url: string;
}

interface PackageImage {
  name: string;
  contentType: string;
  base64Data: string;
  description?: string;
  url: string;
}

interface Package {
  CategoryId: Category;
  PackageName: string;
  PackageDesc: string;
  Price: string;
  DiscountPrice: string;
  PackageReview: string;
  Experience: string;
  Location: string;
  Policy: { point: string }[];
  NeedToKnow: { name: string }[];
  Images: PackageImage[];
}

export default function PackagesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packageCount, setPackageCount] = useState(0);
  const [newPackage, setNewPackage] = useState<Package>({
    CategoryId: {} as Category,
    PackageName: '',
    PackageDesc: '',
    Price: '',
    DiscountPrice: '',
    PackageReview: '',
    Experience: '',
    Location: '',
    Policy: [],
    NeedToKnow: [],
    Images: []
  });
  const [currentPolicy, setCurrentPolicy] = useState('');
  const [currentNeedToKnow, setCurrentNeedToKnow] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/category/fetch');
      const data = await response.json();
      if (response.ok) {
        setCategories(data.categories);
        console.log('Categories fetched successfully:', data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/admin/package/fetch');
      const data = await response.json();
      if (response.ok) {
        setPackages(data.packages);
        setPackageCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast.error('Failed to fetch packages');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchPackages();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImages(prev => [...prev, file]);
    }
  };

  const handleAddPolicy = () => {
    if (currentPolicy.trim()) {
      setNewPackage(prev => ({
        ...prev,
        Policy: [...prev.Policy, { point: currentPolicy.trim() }]
      }));
      setCurrentPolicy('');
    }
  };

  const handleRemovePolicy = (index: number) => {
    setNewPackage(prev => ({
      ...prev,
      Policy: prev.Policy.filter((_, i) => i !== index)
    }));
  };

  const handleAddNeedToKnow = () => {
    if (currentNeedToKnow.trim()) {
      setNewPackage(prev => ({
        ...prev,
        NeedToKnow: [...prev.NeedToKnow, { name: currentNeedToKnow.trim() }]
      }));
      setCurrentNeedToKnow('');
    }
  };

  const handleRemoveNeedToKnow = (index: number) => {
    setNewPackage(prev => ({
      ...prev,
      NeedToKnow: prev.NeedToKnow.filter((_, i) => i !== index)
    }));
  };

  const convertToBase64 = async (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const imagePromises = selectedImages.map(async (file) => {
        const base64 = await convertToBase64(file);
        return {
          name: file.name,
          contentType: file.type,
          url: base64,
          description: ''
        };
      });

      const images = await Promise.all(imagePromises);
      
      const packageData = {
        ...newPackage,
        Images: images
      };

      const response = await fetch('/api/admin/package/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packageData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add package');
      }

      toast.success('Package added successfully');
      setNewPackage({
        CategoryId: {} as Category,
        PackageName: '',
        PackageDesc: '',
        Price: '',
        DiscountPrice: '',
        PackageReview: '',
        Experience: '',
        Location: '',
        Policy: [],
        NeedToKnow: [],
        Images: []
      });
      setSelectedImages([]);
      fetchPackages();
    } catch (error) {
      console.error('Error adding package:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      toast.error(error instanceof Error ? error.message : 'Failed to add package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Manage Packages</h1>

        {/* Add Package Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Package</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                id="category"
                value={newPackage.CategoryId._id || ''}
                onChange={(e) => {
                  const category = categories.find(c => c._id === e.target.value);
                  setNewPackage({ ...newPackage, CategoryId: category || {} as Category });
                }}
                className="mt-1 block w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.CategoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="packageName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Package Name
              </label>
              <input
                type="text"
                id="packageName"
                value={newPackage.PackageName}
                onChange={(e) => setNewPackage({ ...newPackage, PackageName: e.target.value })}
                className="mt-1 block w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="packageDesc" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Package Description
              </label>
              <textarea
                id="packageDesc"
                value={newPackage.PackageDesc}
                onChange={(e) => setNewPackage({ ...newPackage, PackageDesc: e.target.value })}
                rows={3}
                className="mt-1 block w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  value={newPackage.Price}
                  onChange={(e) => setNewPackage({ ...newPackage, Price: e.target.value })}
                  className="mt-1 block w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Discount Price
                </label>
                <input
                  type="text"
                  id="discountPrice"
                  value={newPackage.DiscountPrice}
                  onChange={(e) => setNewPackage({ ...newPackage, DiscountPrice: e.target.value })}
                  className="mt-1 block w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Experience
              </label>
              <input
                type="text"
                id="experience"
                value={newPackage.Experience}
                onChange={(e) => setNewPackage({ ...newPackage, Experience: e.target.value })}
                className="mt-1 block w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Review
              </label>
              <input
                type="text"
                id="packagereview"
                value={newPackage.PackageReview}
                onChange={(e) => setNewPackage({ ...newPackage, PackageReview: e.target.value })}
                className="mt-1 block w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={newPackage.Location}
                onChange={(e) => setNewPackage({ ...newPackage, Location: e.target.value })}
                className="mt-1 block w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            {/* Single Image Upload with Multiple Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Package Images
              </label>
              <div className="flex flex-col gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-50 file:text-purple-700
                    hover:file:bg-prurple-100"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                      <span className="text-sm text-gray-500">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Policy Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Policies
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentPolicy}
                  onChange={(e) => setCurrentPolicy(e.target.value)}
                  className="mt-1 block w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 border-gray-300 shadow-sm focus:border-blue-500"
                  placeholder="Add a policy"
                />
                <button
                  type="button"
                  onClick={handleAddPolicy}
                  className="mt-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {newPackage.Policy.map((policy, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span>{policy.point}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePolicy(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Need to Know Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Need to Know
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentNeedToKnow}
                  onChange={(e) => setCurrentNeedToKnow(e.target.value)}
                  className="mt-1 block w-full rounded-md p-3 bg-gray-200 dark:bg-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add need to know item"
                />
                <button
                  type="button"
                  onClick={handleAddNeedToKnow}
                  className="mt-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {newPackage.NeedToKnow.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span>{item.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveNeedToKnow(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Package'}
            </button>
          </form>
        </div>

        {/* Packages List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.PackageName}
              className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                {pkg.Images?.[0]?.url ? (
                  <img
                    src={pkg.Images[0].url}
                    alt={pkg.PackageName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {pkg.PackageName}
                </h3>
                {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {pkg.PackageDesc}
                </p> */}
                <div className="mt-2">
                  <span className="text-lg font-semibold text-purple-600">
                    ${pkg.Price}
                  </span>
                  {pkg.DiscountPrice && (
                    <span className="ml-2 text-lg font-semibold text-purple-600">
                      ${pkg.DiscountPrice}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Experience: {pkg.Experience}</p>
                  <p>Location: {pkg.Location}</p>
                  <p>Category: {categories.find((cat:any)=> cat._id === pkg.CategoryId)?.CategoryName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
