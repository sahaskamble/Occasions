'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface CategoryFormProps {
  onSuccess?: () => void;
}

interface ImageFile {
  name: string;
  contentType: string;
  base64Data: string;
  description?: string;
}

export default function CategoryForm({ onSuccess }: CategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    CategoryName: '',
    Description: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    try {
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Store image data
      const base64Data = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      setImageFile({
        name: file.name,
        contentType: file.type,
        base64Data: base64Data,
        description: ''
      });
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Error processing image');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/category/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          Image: imageFile
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error creating category');
      }

      toast.success('Category created successfully');
      // Reset form
      setFormData({
        CategoryName: '',
        Description: '',
      });
      setImagePreview(null);
      setImageFile(null);
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Error creating category');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div>
        <label htmlFor="CategoryName" className="block text-sm font-medium text-gray-700">
          Category Name *
        </label>
        <input
          type="text"
          id="CategoryName"
          name="CategoryName"
          required
          value={formData.CategoryName}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          placeholder="Enter category name"
        />
      </div>

      <div>
        <label htmlFor="Description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="Description"
          name="Description"
          value={formData.Description}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          placeholder="Enter category description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category Image
        </label>
        <div className="mt-1 flex items-center gap-4">
          <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              {imagePreview ? 'Change Image' : 'Select Image'}
            </span>
            <input
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          {imagePreview && (
            <div className="relative h-20 w-20 rounded-md overflow-hidden">
              <Image
                src={imagePreview}
                alt="Category preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Creating...' : 'Create Category'}
        </button>
      </div>
    </form>
  );
}
