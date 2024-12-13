import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("Authorization");

  if (!authCookie) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/home", "/diary/:path*", "/my/:path*", "/note/:path*"],
};
