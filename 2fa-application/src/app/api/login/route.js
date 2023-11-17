// Import modules using destructuring
import { NextResponse } from "next/server";
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
    const { username, password } = await request.json();

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

    // Return a JSON response with user data
    return NextResponse.json({
      user,
    });
  } catch (err) {
    // Handle errors and return an error response
    console.error("Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
