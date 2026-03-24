// proxy.ts
import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  // Redirect /home to /
  if (request.nextUrl.pathname === "/home") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/home"],
};
