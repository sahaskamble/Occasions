import { NextResponse } from 'next/server';
import Packages from '@/lib/models/Packages';
import Categories from '@/lib/models/Categories';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        let query = {};
        if (category && category !== 'all') {
            // First find the category ID
            const categoryDoc = await Categories.findOne({ CategoryName: category });
            if (categoryDoc) {
                query = { CategoryId: categoryDoc._id };
            }
        }

        // Fetch packages with the query
        const packages = await Packages.find(query).lean();

        // Transform the data to match the frontend expectations
        const transformedPackages = packages.map(pkg => ({
            _id: pkg._id,
            name: pkg.PackageName,
            description: pkg.PackageDesc,
            price: pkg.Price,
            discountPrice: pkg.DiscountPrice,
            category: pkg.CategoryId,
            image: pkg.Images?.[0]?.url || '/placeholder.jpg',
            review: pkg.PackageReview,
            experience: pkg.Experience,
            location: pkg.Location
        }));

        return NextResponse.json(transformedPackages);

    } catch (error) {
        console.error('Error fetching packages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch packages' },
            { status: 500 }
        );
    }
}
