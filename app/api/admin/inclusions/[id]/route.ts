import { NextRequest, NextResponse } from "next/server";
import Inclusions from "@/lib/models/Inclusions";

export async function GET(
  request: NextRequest,
  context: any
) {
  try {

    const { id} = await context.params;
    const inclusion = await Inclusions.findById(id).populate('PackageId');

    if (!inclusion) {
      return NextResponse.json(
        { error: "Inclusion not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(inclusion);
  } catch (error) {
    console.error("Error fetching inclusion:", error);
    return NextResponse.json(
      { error: "Failed to fetch inclusion" },
      { status: 500 }
    );
  }
}