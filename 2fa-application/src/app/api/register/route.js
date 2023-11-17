import { NextResponse } from "next/server";

const speakeasy = require("speakeasy");
const uuid = require("uuid");
const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

const db = new JsonDB(new Config("myDataBase", true, false, "/"));

export async function POST(request, response) {
  const id = uuid.v4();
  const body = await request.json();
  const { username, password } = body;
  try {
    const path = `/users/${username}`;
    const user = await db.exists(path);

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 403 }
      );
    } else {
      const temp_secret = speakeasy.generateSecret();
      db.push(path, {
        id,
        username,
        password,
        temp_secret: temp_secret?.base32,
        qrCodeURL: temp_secret?.otpauth_url,
      });
    }

    return NextResponse.json({
      body,
    });
  } catch (err) {
    return new NextResponse(response);
  }
}
