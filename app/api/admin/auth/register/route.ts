import Users from "@/lib/models/Users";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Define the request body type
interface RegisterRequestBody {
	ContactNum: number;
	Username: string;
	Email: string;
	Password: string;
	Type: string;
}

export async function POST(req: NextRequest) {
	try {

		const body: RegisterRequestBody = await req.json();

		const { ContactNum, Username, Email, Password, Type } = body;

		// check existing user 
		const existinguser = await Users.findOne({ ContactNum });
		if (existinguser) {
			return NextResponse.json(
				{ mmessage: "User already exist!" },
				{ status: 401 }
			);
		}

		// create salt and hash for password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(Password, salt);

		// Create and save user to database
		const user = await Users.create({
			ContactNum: ContactNum,
			Username: Username,
			Email: Email,
			HashedPass: hashedPassword,
			SaltPass: salt,
			Type: Type
		});

		await user.save();

		return NextResponse.json(
			{
				message: "User Registered Successfully",
				output: user
			},
			{ status: 201 }
		)

	} catch (error: unknown) {
		return NextResponse.json(
			{ message: error },
			{ status: 500 },
		);
	}
}
