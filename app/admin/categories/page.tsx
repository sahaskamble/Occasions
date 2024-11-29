'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AdminLayout from '@/components/AdminLayout';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Image from 'next/image';

interface CategoryImage {
  name: string;
  contentType: string;
  description?: string;
  url: string;
}

interface Category {
  _id: string;
  CategoryName: string;
  CategoryDesc: string;
  Image: CategoryImage[];
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({
    CategoryName: '',
    CategoryDesc: '',
    Image: [] as CategoryImage[]
  });
  const [imageFile, setImageFile] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/category/fetch');
      const data = await response.json();
      if (response.ok) {
        console.log('Category data:', data.categories[0]); // Log first category
        setCategories(data.categories);
        console.log('Categories fetched successfully:', data.categories); 
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setImageFile(file);

    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!newCategory.CategoryName || !newCategory.CategoryDesc) {
        throw new Error('Please fill in all required fields');
      }

      if (!imageFile) {
        throw new Error('Please select an image');
      }

      // Convert image to base64
      const base64Data = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imageFile);
      });

      const categoryData = {
        CategoryName: newCategory.CategoryName,
        Description: newCategory.CategoryDesc,
        Image: {
          name: imageFile.name,
          contentType: imageFile.type,
          base64Data: base64Data,
          description: ''
        }
      };

      const response = await fetch('/api/admin/category/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add category');
      }

      toast.success('Category added successfully');
      setNewCategory({
        CategoryName: '',
        CategoryDesc: '',
        Image: []
      });
      setImageFile(null);
      setImagePreview(null);
      fetchCategories();
    } catch (error: any) {
      console.error('Error adding category:', error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/category/delete?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete category');
      }

      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast.error(error.message || 'Failed to delete category');
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Manage Categories</h1>

        {/* Add Category Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={newCategory.CategoryName}
                onChange={(e) => setNewCategory({ ...newCategory, CategoryName: e.target.value })}
                className="mt-1 block w-full bg-gray-200 p-3 dark:bg-gray-700 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="categoryDesc" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category Description
              </label>
              <textarea
                id="categoryDesc"
                value={newCategory.CategoryDesc}
                onChange={(e) => setNewCategory({ ...newCategory, CategoryDesc: e.target.value })}
                rows={3}
                className="mt-1 block w-full bg-gray-200 p-3 dark:bg-gray-700 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-lg" />
                </div>
              )}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          </form>
        </div>

        {/* Categories List */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  {category.Image[0]?.url ? (
                    <Image
                      src={category.Image[0]?.url}
                      alt={category.CategoryName}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {category.CategoryName}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {category.CategoryDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
