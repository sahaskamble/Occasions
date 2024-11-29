import { NextRequest, NextResponse } from "next/server";
import Packages from "@/lib/models/Packages";
import mongoose from "mongoose";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('Received data:', data);

    // Validate required fields based on the model
    const requiredFields = [
      'CategoryId',
      'PackageName',
      'PackageDesc',
      'Price',
      'DiscountPrice',
      'PackageReview',
      'Experience',
      'Location'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
      console.log('Upload directory verified:', uploadDir);
    } catch (err) {
      console.error('Error with upload directory:', err);
    }

    // Process images
    const processedImages = await Promise.all(data.Images.map(async (img: any) => {
      try {
        // Create unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const extension = img.name.split('.').pop() || 'jpg';
        const fileName = `package-${timestamp}-${randomString}.${extension}`;
        const filePath = path.join(uploadDir, fileName);

        // Extract base64 data
        const base64Data = img.url.split(';base64,').pop();
        if (!base64Data) {
          throw new Error('Invalid base64 data');
        }

        // Save the file
        const buffer = Buffer.from(base64Data, 'base64');
        await writeFile(filePath, buffer);

        // Return image data object
        return {
          name: fileName,
          contentType: img.contentType,
          description: img.description || '',
          url: `/uploads/${fileName}`
        };
      } catch (error) {
        console.error('Error processing image:', error);
        return null;
      }
    }));

    // Filter out any failed image processing
    const validImages = processedImages.filter(img => img !== null);

    // Format the package data according to the model
    const packageData = {
      CategoryId: new mongoose.Types.ObjectId(data.CategoryId._id || data.CategoryId),
      PackageName: data.PackageName,
      PackageDesc: data.PackageDesc,
      Price: data.Price,
      DiscountPrice: data.DiscountPrice,
      PackageReview: data.PackageReview,
      Experience: data.Experience,
      Location: data.Location,
      Policy: data.Policy.map((p: { point: string }) => ({
        point: p.point
      })),
      NeedToKnow: data.NeedToKnow.map((n: { name: string }) => ({
        name: n.name
      })),
      Images: validImages
    };

    const newPackage = await Packages.create(packageData);

    return NextResponse.json({ 
      message: "Package added successfully",
      success: true,
      package: newPackage 
    });

  } catch (error: any) {
    console.error('Error adding package:', error);
    return NextResponse.json(
      { 
        message: error.message || "Failed to add package",
        error: error.toString()
      },
      { status: 500 }
    );
  }
}
