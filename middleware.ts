import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = !!req.auth?.user?.isOrga;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");
  const isPublicRoute = nextUrl.pathname === "/";
  const isEventCreationRoute = [
    "/tournois/creation",
    "/tournois/create",
    "/tournois/creer",
  ].some(
    (route) =>
      nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
  );

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return;
  }

  if (isEventCreationRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }

    if (!isAdmin) {
      return Response.redirect(new URL("/tournois", nextUrl));
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
