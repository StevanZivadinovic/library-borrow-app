// auth.ts
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, auth) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) {
          console.error("Login failed:", res.statusText);
          return null;
        }

        const data = await res.json();

        if (!data.user) {
          console.error("No user found in response:", data);
          return null;
        }

        return {
          id: data.user.id.toString(),
          email: data.user.email,
          name: data.user.fullName || data.user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/log-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        //@ts-ignore
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
  },
});
