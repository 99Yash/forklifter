import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  signInUrl: "/sign-in",
  publicRoutes: ["/", "/sign-in(.*)", "/sso-callback(.*)", "/api(.*)"],
  apiRoutes: "/api",
  debug: true,
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      // Don't do anything for public routes
      return NextResponse.next();
    }
    // Redirect to sign in page if user is not signed in
    const url = new URL(req.nextUrl.origin);
    if (!auth.userId && !auth.isPublicRoute) {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
