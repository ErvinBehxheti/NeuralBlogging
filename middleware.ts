import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload && NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: ["/writearticle"],
};
