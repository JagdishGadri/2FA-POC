import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import { dbInstance } from "@/utils/dbUtil";

export async function POST(request, response) {
  try {
    // Extract username and password from the request body
    const { userToken, email } = await request.json();

    // Build the path for user data
    const path = `/users/${email}`;

    // Retrieve user data from the database
    const user = await dbInstance.getData(path);

    // Verify the time based otp entered by user with stored temp_secret
    const verified = speakeasy.totp.verify({
      secret: user.temp_secret,
      encoding: "base32",
      token: userToken,
      window: 1,
    });
    const userDetailsCloned = { ...user };
    delete userDetailsCloned.password;
    if (verified) {
      dbInstance.push(path, { ...user, isQRCodeScanned: true });
      return NextResponse.json({ ...userDetailsCloned, verified: true });
    } else {
      return NextResponse.json({ ...userDetailsCloned, verified: false });
    }
  } catch (err) {
    // Handle errors and return an error response
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
