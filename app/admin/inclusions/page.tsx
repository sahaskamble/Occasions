'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { FaPlus, FaTrash } from 'react-icons/fa';
import AddInclusionForm from '@/components/AddInclusionForm';
import toast from 'react-hot-toast';

interface Point {
  IconName?: string;
  Point: string;
}

interface Inclusion {
  _id: string;
  PackageId: {
    _id: string;
    PackageName: string;
  };
  Points: Point[];
  createdAt: string;
  updatedAt: string;
}

export default function InclusionsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [inclusions, setInclusions] = useState<Inclusion[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInclusions = async () => {
    try {
      const response = await fetch('/api/admin/inclusions/fetch');
      if (!response.ok) throw new Error('Failed to fetch inclusions');
      const data = await response.json();
      setInclusions(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch inclusions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInclusions();
  }, []);

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    fetchInclusions();
    toast.success('Inclusion added successfully');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Inclusions</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FaPlus size={16} />
            Add Inclusion
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : inclusions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No inclusions found. Add your first inclusion!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inclusions.map((inclusion) => (
              <div
                key={inclusion._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
              >
                <button
                  onClick={async () => {
                    if (window.confirm('Are you sure you want to delete this inclusion?')) {
                      try {
                        const response = await fetch('/api/admin/inclusions/delete', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ id: inclusion._id }),
                        });

                        if (response.ok) {
                          toast.success('Inclusion deleted successfully');
                          fetchInclusions();
                        } else {
                          const data = await response.json();
                          toast.error(data.error || 'Failed to delete inclusion');
                        }
                      } catch (error) {
                        console.error('Error:', error);
                        toast.error('Failed to delete inclusion');
                      }
                    }
                  }}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                >
                  <FaTrash size={16} />
                </button>
                <h3 className="text-lg font-semibold mb-4">
                  {inclusion.PackageId.PackageName}
                </h3>
                <ul className="space-y-2">
                  {inclusion.Points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      {point.IconName && (
                        <span className="text-purple-600">{point.IconName}</span>
                      )}
                      <span>{point.Point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
              <AddInclusionForm
                onSuccess={handleFormSuccess}
                onCancel={() => setIsFormOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
