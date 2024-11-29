import { useState, useEffect } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';

interface Package {
  _id: string;
  PackageName: string;
}

interface Point {
  IconName?: string;
  Point: string;
}

interface AddInclusionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddInclusionForm({ onSuccess, onCancel }: AddInclusionFormProps) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [points, setPoints] = useState<Point[]>([{ IconName: '', Point: '' }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/admin/package/fetch');
        if (!response.ok) throw new Error('Failed to fetch packages');
        const data = await response.json();
        setPackages(data.packages);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPackages();
  }, []);

  const handleAddPoint = () => {
    setPoints([...points, { IconName: '', Point: '' }]);
  };

  const handleRemovePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  const handlePointChange = (index: number, field: keyof Point, value: string) => {
    const newPoints = [...points];
    newPoints[index] = { ...newPoints[index], [field]: value };
    setPoints(newPoints);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;

    setLoading(true);
    try {
      const response = await fetch('/api/admin/inclusions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: selectedPackage,
          points: points.map(point => ({
            IconName: point.IconName || undefined,
            Point: point.Point,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to add inclusion');
      onSuccess();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Add New Inclusion</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
      </div>

      <div>
        <label htmlFor="package" className="block text-sm font-medium text-gray-700">
          Select Package *
        </label>
        <select
          id="package"
          value={selectedPackage}
          onChange={(e) => setSelectedPackage(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
        >
          <option value="">Select a package</option>
          {packages.map((pkg) => (
            <option key={pkg._id} value={pkg._id}>
              {pkg.PackageName}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">
            Inclusion Points *
          </label>
          <button
            type="button"
            onClick={handleAddPoint}
            className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
          >
            <FaPlus size={14} />
            Add Point
          </button>
        </div>

        {points.map((point, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Icon Name (optional)"
                value={point.IconName}
                onChange={(e) => handlePointChange(index, 'IconName', e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
            </div>
            <div className="flex-[2]">
              <input
                type="text"
                placeholder="Point *"
                value={point.Point}
                onChange={(e) => handlePointChange(index, 'Point', e.target.value)}
                required
                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
            </div>
            {points.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemovePoint(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTimes size={20} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Inclusion'}
        </button>
      </div>
    </form>
  );
}
