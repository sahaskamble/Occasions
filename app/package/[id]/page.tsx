'use client';

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/package.css';
import Header from '@/components/Header';

interface Point {
  IconName?: string;
  Point: string;
}

interface Inclusion {
  PackageId: string;
  Points: Point[];
}

interface Policy {
  point: string;
}

interface NeedToKnow {
  name: string;
}

interface Category {
  _id: string;
  CategoryName: string;
}

interface Package {
  _id: string;
  CategoryId: string;
  PackageName: string;
  PackageDesc: string;
  Price: string;
  DiscountPrice: string;
  PackageReview: string;
  Experience: string;
  Location: string;
  Policy: Array<{ point: string }>;
  NeedToKnow: Array<{ name: string }>;
  Images: Array<{
    name: string;
    contentType: string;
    description?: string;
    url: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
}

export default function PackageDetails() {
  const [packageItem, setPackageItem] = useState<Package | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [inclusions, setInclusions] = useState<Inclusion | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isInclusionModalOpen, setIsInclusionModalOpen] = useState(false)
  const [newInclusion, setNewInclusion] = useState<Point>({ IconName: '', Point: '' })
  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  })
  const params = useParams()

  useEffect(() => {
    if (packageItem && !selectedImage && packageItem.Images.length > 0) {
      setSelectedImage(packageItem.Images[0].url);
    }
  }, [packageItem]);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        setLoading(true)

        // Fetch package details
        const response = await fetch(`/api/admin/package/${params.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) throw new Error('Failed to fetch package')
        const data = await response.json()
        setPackageItem(data)
        console.log('Package data:', data)

        // Fetch category if we have a categoryId
        if (data.CategoryId) {
          const categoryResponse = await fetch(`/api/admin/category/${data.CategoryId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })

          if (!categoryResponse.ok) throw new Error('Failed to fetch category')
          const categoryData = await categoryResponse.json()
          setCategory(categoryData)
        }

        // Fetch inclusions
        const inclusionsResponse = await fetch(`/api/admin/inclusions/${params.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })

        if (inclusionsResponse.ok) {
          const inclusionsData = await inclusionsResponse.json()
          setInclusions(inclusionsData)
        }

      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error instanceof Error ? error.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPackageData()
  }, [params.id])

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your booking submission logic here
    console.log('Booking submitted:', bookingForm);
    setIsBookingModalOpen(false);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">Loading...</h3>
        </div>
      </>
    )
  }

  if (!packageItem) {
    return (
      <>
        <Header />
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">Package not found</h3>
          <p className="p-regular-14">Sorry, the package you're looking for doesn't exist</p>
          <button className="px-4 py-2 bg-purple-500 active:bg-purple-400">
            <Link href="/" className="flex-center text-primary-500 p-medium-16">
              Go back home
            </Link>
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <section className="flex justify-center bg-gray-100 bg-dotted-pattern bg-contain p-5 md:p-10">
        <div className="flex flex-col md:flex-row gap-10 2xl:max-w-7xl mt-16 w-full">
          {/* Left side - Images */}
          <div className="md:w-[40%] md:h-[50%] sticky top-16 flex flex-col gap-4 bg-white pt-6 p-4 shadow-md shadow-gray-300 rounded-md">
            {/* Main Image */}
            <motion.div
              className="w-full aspect-square relative rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={selectedImage || packageItem.Images[0].url}
                alt={packageItem.PackageName}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Horizontal Scrollable Thumbnails */}
            <div className="relative">
              <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar smooth-scroll">
                {packageItem.Images.map((image) => (
                  <motion.div
                    key={image.url}
                    className={`flex-shrink-0 w-24 aspect-square relative cursor-pointer rounded-md overflow-hidden border-2 
                    ${selectedImage === image.url ? 'border-purple-500' : 'border-transparent'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <Image
                      src={image.url}
                      alt={image.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Product Info */}
          <div className="md:w-1/2 flex flex-col gap-6">
            <div className="border-b bg-white p-6 shadow-md shadow-gray-300 rounded-md">
              <h1 className="text-3xl font-bold mb-2">{packageItem.PackageName}</h1>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-gray-400 line-through">${packageItem.Price}</span>
                {packageItem.DiscountPrice && (
                  <span className="text-2xl font-bold text-purple-600">${packageItem.DiscountPrice}</span>
                )}
                {category && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {category.CategoryName}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className='bg-white p-6 shadow-md shadow-gray-300 rounded-md'>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{packageItem.PackageDesc}</p>
              </div>

              <div className='bg-white p-6 shadow-md shadow-gray-300 rounded-md'>
                <h2 className="text-xl font-semibold mb-2">Location</h2>
                <p className="text-gray-600">{packageItem.Location}</p>
              </div>

              <div className='bg-white p-6 shadow-md shadow-gray-300 rounded-md'>
                <h2 className="text-xl font-semibold mb-2">Experience</h2>
                <p className="text-gray-600">{packageItem.Experience}</p>
              </div>

              <div className='bg-white p-6 shadow-md shadow-gray-300 rounded-md'>
                <h2 className="text-xl font-semibold mb-2">Package Review</h2>
                <p className="text-gray-600">{packageItem.PackageReview}</p>
              </div>

              {/* Policy Section */}
              <div className='bg-white p-6 shadow-md shadow-gray-300 rounded-md'>
                <h2 className="text-xl font-semibold mb-2">Policy</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {packageItem?.Policy?.map((policy, index) => (
                    <li key={index} className="text-gray-600">
                      {policy.point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Need to Know Section */}
              <div className='bg-white p-6 shadow-md shadow-gray-300 rounded-md'>
                <h2 className="text-xl font-semibold mb-2">Need to Know</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {packageItem?.NeedToKnow?.map((item, index) => (
                    <li key={index} className="text-gray-600">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='bg-white p-6 shadow-md shadow-gray-300 rounded-md'>
              <h2 className="text-xl font-semibold mb-2">What's Included</h2>
              <div className="space-y-2">
                {inclusions?.Points.map((point, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {point.IconName && (
                      <span className="text-purple-600">
                        <i className={point.IconName}></i>
                      </span>
                    )}
                    <p className="text-gray-600">{point.Point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        <AnimatePresence>
          {isBookingModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-lg p-6 max-w-md w-full"
              >
                <h2 className="text-2xl font-bold mb-4">Book {packageItem.PackageName}</h2>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                    <input
                      type="date"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      rows={3}
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Submit Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBookingModalOpen(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inclusion Modal */}
        <AnimatePresence>
          {isInclusionModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-lg p-6 max-w-md w-full"
              >
                <h2 className="text-2xl font-bold mb-4">Add New Inclusion</h2>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const response = await fetch(`/api/admin/inclusions/${params.id}`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ point: newInclusion }),
                    });

                    if (response.ok) {
                      const updatedInclusions = await response.json();
                      setInclusions(updatedInclusions);
                      setIsInclusionModalOpen(false);
                      setNewInclusion({ IconName: '', Point: '' });
                    }
                  } catch (error) {
                    console.error('Error adding inclusion:', error);
                  }
                }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Icon Name (Optional)</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={newInclusion.IconName}
                      onChange={(e) => setNewInclusion({ ...newInclusion, IconName: e.target.value })}
                      placeholder="e.g., fa-check"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Point</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={newInclusion.Point}
                      onChange={(e) => setNewInclusion({ ...newInclusion, Point: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Add Inclusion
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsInclusionModalOpen(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
