import { NextRequest, NextResponse } from "next/server";
import Packages from "@/lib/models/Packages";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  context: any
): Promise<NextResponse<any>> {
  try {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid package ID" },
        { status: 400 }
      );
    }

    const packageData: any = await Packages.findById(id);

    if (!packageData) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(packageData, { status: 200 });
  } catch (error) {
    console.error('Error fetching package:', error);
    return NextResponse.json(
      {
        message: "Failed to fetch package",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
