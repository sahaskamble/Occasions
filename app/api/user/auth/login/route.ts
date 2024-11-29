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
					return NextResponse.json(
						{
							message: "User authenticated",
							output: existinguser
						},
						{ status: 200 },
					)
				} else {
					return NextResponse.json(
						{ message: "This User is not Authenticated for this Operation" },
						{ status: 401 }
					)
				}
			} else {
				return NextResponse.json(
					{ message: "Invalid Email or Passwor !" },
					{ status: 400 }
				)
			}
		}

	} catch (error: unknown) {
		return NextResponse.json(
			{ message: error },
			{ status: 500 }
		)
	}
}
