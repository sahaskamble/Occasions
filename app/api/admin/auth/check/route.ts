import { NextRequest, NextResponse } from "next/server";
import Users from "@/lib/models/Users";
import { Types } from "mongoose";

export async function GET(req: NextRequest) {
  try {
    // Get the token from cookies
    const token = req.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify the token by checking if user exists
    if (!Types.ObjectId.isValid(token)) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    const user = await Users.findOne({
      _id: new Types.ObjectId(token),
      Type: "admin"
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found or not authorized" },
        { status: 401 }
      );
    }

    // User is authenticated
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user._id,
        email: user.Email,
        type: user.Type
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { message: "Authentication check failed" },
      { status: 401 }
    );
  }
}
