import Users from "@/lib/models/Users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Define the request body type
interface RegisterRequestBody {
	Email: string;
	Password: string;
	Type: string;
}

export async function POST(req: NextRequest) {
	try {
		const data: RegisterRequestBody = await req.json();
		const email: string = data['Email'];
		const pass: string = data['Password'];
		const type: string = data['Type'];

		const existinguser = await Users.findOne({ Email: email });
		
		if (existinguser) {
			const match = await bcrypt.compare(pass, existinguser.HashedPass);

			if (match) {
				if (type === existinguser.Type) {
					// Create response with session token
					const response = NextResponse.json(
						{
							message: "User authenticated",
							output: existinguser
						},
						{ status: 200 }
					);

					// Set session cookie
					response.cookies.set('admin-token', existinguser._id.toString(), {
						httpOnly: true,
						secure: process.env.NODE_ENV === 'production',
						sameSite: 'lax',
						path: '/',
						maxAge: 60 * 60 * 24 // 24 hours
					});

					return response;
				} else {
					return NextResponse.json(
						{ message: "This User is not Authenticated for this Operation" },
						{ status: 401 }
					)
				}
			} else {
				return NextResponse.json(
					{ message: "Invalid Email or Password!" },
					{ status: 400 }
				)
			}
		} else {
			return NextResponse.json(
				{ message: "User not found!" },
				{ status: 404 }
			)
		}
	} catch (error: unknown) {
		return NextResponse.json(
			{ message: error },
			{ status: 500 }
		)
	}
}
