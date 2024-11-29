import { NextResponse } from "next/server";
import Inclusions from "@/lib/models/Inclusions";

export async function GET() {
  try {
    const inclusions = await Inclusions.find().populate('PackageId');
    return NextResponse.json(inclusions);
  } catch (error) {
    console.error("Error fetching inclusions:", error);
    return NextResponse.json(
      { error: "Failed to fetch inclusions" },
      { status: 500 }
    );
  }
}
