// Import modules using destructuring
import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import uuid from "uuid";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

// Asynchronous function for initializing JsonDB
const initializeDB = async () => {
  return new JsonDB(new Config("myDataBase", true, false, "/"));
};

export async function POST(request, response) {
  try {
    // Initialize JsonDB
    const db = await initializeDB();

    // Extract username and password from the request body
    const { token, userId } = await request.json();

    // Check for empty username or password
    if (!username || !password) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 400 }
      );
    }

    // Build the path for user data
    const path = `/users/${username}`;

    // Retrieve user data from the database
    const user = await db.getData(path);

    const verified = speakeasy.totp.verified({
      secret: user.temp_secret,
      encoding: "base32",
      token: userToken,
    });

    if (verified) {
      db.push(path, { id: userId, secret: user.temp_secret });
      return NextResponse.json({ verified: true });
    } else {
      return NextResponse.json({
        verified: false,
      });
    }
  } catch (err) {
    // Handle errors and return an error response
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
