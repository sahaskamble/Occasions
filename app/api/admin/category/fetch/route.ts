import { NextResponse } from "next/server";
import Categories from "@/lib/models/Categories";

export async function GET() {
  try {
    const categories = await Categories.find({});
    const count = await Categories.countDocuments({});

    return NextResponse.json(
      { 
        categories,
        count
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Fetch categories error:', error);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}