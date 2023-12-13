import { dbInstance } from "@/utils/dbUtil";
import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import { v4 as uuidv4 } from "uuid";

export async function POST(request, response) {
  const id = uuidv4();
  const body = await request.json();
  const { email, password } = body;
  try {
    // Build the path for user data
    const path = `/users/${email}`;

    // Retrieve user data from the database
    const userExists = await dbInstance.exists(path);

    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 403 }
      );
    } else {
      // Store user data in DB with temp_secret and QR code URL
      const temp_secret = speakeasy.generateSecret();
      dbInstance.push(path, {
        id,
        email,
        password,
        temp_secret: temp_secret?.base32,
        otpAuthURL: temp_secret?.otpauth_url,
      });
    }
    return NextResponse.json({
      body,
    });
  } catch (err) {
    return new NextResponse(response);
  }
}
