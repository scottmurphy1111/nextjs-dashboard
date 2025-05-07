import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("auth", auth);
      console.log("nextUrl", nextUrl.pathname);
      const isLoggedIn = !!auth?.user;

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      console.log("isOnDashboard", isOnDashboard);
      console.log("isLoggedIn", isLoggedIn);
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
