import { NextResponse } from "next/server";
import Inclusions from "@/lib/models/Inclusions";

export async function POST(req: Request) {
  try {
    const { packageId, points } = await req.json();

    const inclusion = await Inclusions.create({
      PackageId: packageId,
      Points: points,
    });

    return NextResponse.json(
      { message: "Inclusion added successfully", inclusion },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding inclusion:", error);
    return NextResponse.json(
      { error: "Failed to add inclusion" },
      { status: 500 }
    );
  }
}