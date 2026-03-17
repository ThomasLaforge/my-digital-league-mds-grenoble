import type { NextAuthConfig } from "next-auth";

export default {
  providers: [],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.isOrga = (token.isOrga as boolean) ?? false;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isOrga = user.isOrga;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
