import { NextRequest, NextResponse } from "next/server";
import Packages from "@/lib/models/Packages";

export async function GET() {
  try {
    const packages = await Packages.find();
    return NextResponse.json(
      { 
        packages,
        count: packages.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { 
        message: "Failed to fetch packages",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
