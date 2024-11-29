import Users from "@/lib/models/Users";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const user = await Users.find();
		return NextResponse.json(
			{
				message: "Fetched All Users",
				output: user
			},
			{ status: 201 }
		)
	} catch (error: unknown) {
		return NextResponse.json(
			{ message: "Failed to fetch users" },
			{ status: 500 }
		);
	}
}
