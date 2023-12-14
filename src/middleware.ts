import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function middleware(request: NextRequest) {
  // const cookieStore = cookies( );
  const token = request.cookies.get("token")?.value;

  const response = NextResponse.next();
  if (token) {
    const newUrl = new URL("/", request.url);

    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/login",
};
