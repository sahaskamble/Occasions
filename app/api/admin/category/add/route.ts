import { NextRequest, NextResponse } from "next/server";
import Categories from "@/lib/models/Categories";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

interface CategoryRequestBody {
  CategoryName: string;
  Description: string;
  Image?: {
    name: string;
    contentType: string;
    base64Data: string;
    description?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const data: CategoryRequestBody = await req.json();
    
    // Check if category already exists
    const existingCategory = await Categories.findOne({ 
      CategoryName: { $regex: new RegExp('^' + data.CategoryName + '$', 'i') } 
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Category already exists!" },
        { status: 400 }
      );
    }

    let imageData = null;

    // Process image if provided
    if (data.Image && data.Image.base64Data) {
      // Ensure uploads directory exists
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      try {
        await mkdir(uploadDir, { recursive: true });
        console.log('Upload directory verified:', uploadDir);
      } catch (err) {
        console.error('Error with upload directory:', err);
      }

      try {
        // Create unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const extension = data.Image.name.split('.').pop() || 'jpg';
        const fileName = `category-${timestamp}-${randomString}.${extension}`;
        const filePath = path.join(uploadDir, fileName);

        // Extract base64 data
        const base64Data = data.Image.base64Data.split(';base64,').pop();
        if (base64Data) {
          // Save the file
          const buffer = Buffer.from(base64Data, 'base64');
          await writeFile(filePath, buffer);
          
          // Create image data object
          imageData = {
            name: fileName,
            contentType: data.Image.contentType,
            description: data.Image.description || '',
            url: `/uploads/${fileName}`
          };
          
          console.log('Category image saved successfully');
        }
      } catch (error) {
        console.error('Error processing category image:', error);
      }
    }

    // Create new category
    const newCategory = await Categories.create({
      CategoryName: data.CategoryName,
      Description: data.Description || "",
      Image: imageData
    });

    return NextResponse.json(
      { 
        message: "Category created successfully",
        category: newCategory 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Add category error:', error);
    return NextResponse.json(
      { message: "Failed to create category" },
      { status: 500 }
    );
  }
}