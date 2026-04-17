import authConfig from "@/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = !!req.auth?.user?.isOrga;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");
  const isOrganisateurRoute = nextUrl.pathname.startsWith("/organisateur");

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return;
  }

  if (isOrganisateurRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }

    if (!isAdmin) {
      return Response.redirect(new URL("/", nextUrl));
    }
  }

  // Example protection - strictly protect nothing by default for now unless specified
  // if (!isLoggedIn && !isPublicRoute) {
  //   return Response.redirect(new URL("/login", nextUrl));
  // }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
