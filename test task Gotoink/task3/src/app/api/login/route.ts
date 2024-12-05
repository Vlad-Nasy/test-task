import { NextResponse } from "next/server";
import { generateToken } from "@/lib/utilis";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === "admin" && password === "1234") {
      const token = await generateToken({ email: "test@gmail.com" });
      const response = NextResponse.json({ message: "Login successful" });

      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 3, // 3 days
        sameSite: "strict",
        path: "/",
      });
      return response;
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Error logging in" }, { status: 500 });
  }
}
