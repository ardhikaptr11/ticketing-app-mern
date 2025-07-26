import { NextResponse } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const token: JWTExtended | null = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = request.nextUrl;

    const possibleAuthRoute = [
        "/login",
        "/register",
        "/auth/login",
        "/auth/register",
    ];

    // If the user is not authenticated, redirect to the login page
    if (possibleAuthRoute.includes(pathname)) {
        if (token) {
            // If the user is authenticated, redirect to the dashboard
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    if (pathname === "/login" || pathname === "/register") {
        if (!token) {
            const target =
                pathname === "/login" ? "/auth/login" : "/auth/register";
            return NextResponse.redirect(new URL(target, request.url));
        }
    }

    if (pathname.startsWith("/admin")) {
        if (!token) {
            const loginUrl = new URL("/auth/login", request.url);
            loginUrl.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(loginUrl);
        }

        if (token?.user?.role !== "admin") {
            return NextResponse.redirect(new URL("/", request.url));
        }

        if (pathname === "/admin") {
            return NextResponse.redirect(
                new URL("/admin/dashboard", request.url),
            );
        }
    }

    if (pathname.startsWith("/member")) {
        if (!token) {
            const loginUrl = new URL("/auth/login", request.url);
            loginUrl.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(loginUrl);
        }

        if (token?.user?.role !== "user") {
            return NextResponse.redirect(new URL("/admin", request.url));
        }

        if (pathname === "/member") {
            return NextResponse.redirect(
                new URL("/member/profile", request.url),
            );
        }
    }
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/auth/:path*",
        "/admin/:path*",
        "/member/:path*",
    ],
};
