import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

interface PackageCardProps {
  _id: string;
  PackageName: string;
  Price: number;
  PackageDesc: string;
  Images: string;
  Rating?: number;
  Duration?: string;
}

const PackageCard = ({ _id, PackageName, Price, PackageDesc, Images, Rating = 4.5, Duration = '2 Hrs' }: PackageCardProps) => {
  return (
    <Link href={`/package/${_id}`}>
      <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-auto flex flex-col">
        <div className="relative w-full h-64">
          <Image
            src={Images || '/placeholder-package.jpg'}
            alt={PackageName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h3 className="text-white text-xl font-semibold line-clamp-1">{PackageName}</h3>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center text-yellow-400">
                <FaStar />
                <span className="ml-1 text-gray-700">{Rating}</span>
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">{Duration}</span>
            </div>
            <p className="text-gray-600 text-sm line-clamp-1 mb-3">{PackageDesc}</p>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <div className="text-purple-600 font-semibold">
              ₹{Price.toLocaleString()}
              <span className="text-gray-500 text-sm font-normal">/person</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
