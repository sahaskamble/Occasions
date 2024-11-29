import { NextRequest, NextResponse } from "next/server";
import Inclusions from "@/lib/models/Inclusions";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Inclusion ID is required" },
        { status: 400 }
      );
    }

    const deletedInclusion = await Inclusions.findByIdAndDelete(id);

    if (!deletedInclusion) {
      return NextResponse.json(
        { error: "Inclusion not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Inclusion deleted successfully" });
  } catch (error) {
    console.error("Error deleting inclusion:", error);
    return NextResponse.json(
      { error: "Failed to delete inclusion" },
      { status: 500 }
    );
  }
}