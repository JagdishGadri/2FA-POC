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

    // Extract email and password from the request body
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
    const user = await db.exists(path);
    // Return a JSON response with user data
    if (user) {
      const userDetails = await db.getData(path);
      console.log(
        "userDetails?.password === password",
        userDetails?.password,
        password
      );
      return userDetails?.password === password
        ? NextResponse.json({
            userDetails,
          })
        : NextResponse.json({ error: "Wrong credentials" }, { status: 401 });
    } else {
      return NextResponse.json(
        { error: "Please create a account first." },
        { status: 404 }
      );
    }
  } catch (err) {
    // Handle errors and return an error response
    console.error("Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
