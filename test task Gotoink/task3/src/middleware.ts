import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/utilis";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("Token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decoded = await verifyToken(token.value);

  if (decoded) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard"],
};
