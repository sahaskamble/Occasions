import { NextRequest, NextResponse } from "next/server";
import Categories from "@/lib/models/Categories";
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: "Category ID is required" },
        { status: 400 }
      );
    }

    // Find the category first to get the image path
    const category = await Categories.findById(id);
    
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // Delete the image file if it exists
    if (category.Image?.url) {
      try {
        const fileName = category.Image.url.split('/').pop();
        if (fileName) {
          const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
          await unlink(filePath);
          console.log('Category image deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting category image:', error);
        // Continue with category deletion even if image deletion fails
      }
    }

    // Delete the category from database
    await Categories.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 500 }
    );
  }
}
