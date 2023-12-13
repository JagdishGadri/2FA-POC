// Import modules using destructuring
import { dbInstance } from "@/utils/dbUtil";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const { email, password } = await request.json();

    // Check for empty email or password
    if (!email || !password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Build the path for user data
    const path = `/users/${email}`;

    // Retrieve user data from the database
    const userExists = await dbInstance.exists(path);

    // Return a JSON response with user data
    if (userExists) {
      const userDetails = await dbInstance.getData(path);

      // Use strict comparison for password check
      const isPasswordCorrect = userDetails?.password === password;

      return isPasswordCorrect
        ? NextResponse.json({
            userDetails,
          })
        : NextResponse.json({ error: "Wrong credentials" }, { status: 401 });
    } else {
      return NextResponse.json(
        { error: `No user found. Please create new account. ` },
        { status: 404 }
      );
    }
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
