import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (!user.isAdmin) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  const isProtectedPage =
    pathname.startsWith("/post-ad") ||
    pathname.startsWith("/register-employee") ||
    pathname.startsWith("/register-employer") ||
    pathname.startsWith("/my-posts");

  // 🔒 NOT LOGGED IN → trying to access protected page
  if (!token && isProtectedPage) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 🔁 LOGGED IN → trying to access login/signup
  if (token && isAuthPage) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.redirect(new URL("/", req.url));
    } catch {
      // invalid token → allow access to login/signup
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/post-ad/:path*",
    "/register-employee/:path*",
    "/register-employer/:path*",
    "/my-posts/:path*",
  ],
};
