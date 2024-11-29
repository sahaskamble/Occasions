import { NextResponse } from 'next/server';
import Categories from '@/lib/models/Categories';

export async function GET(
  request: Request,
  context: any,
) {
  try {

    const { id } = await context.params;

    const category = await Categories.findById(id);

    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { message: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}
