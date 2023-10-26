import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type User,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env.mjs";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User {
    id: string;
  }
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user, profile }) {
      console.log(">>>>>> signInCB", profile);
      let dbUser: User | null = null;
      const email = user.email;
      if (email) {
        dbUser = await db.user.findUnique({ where: { email } });
      }
      console.log(">>>>>>>>>", dbUser);
      if (!dbUser) {
        function generateRandomUsername(name: string) {
          // Remove spaces and convert the name to lowercase
          const cleanedName = name.replace(/\s/g, "").toLowerCase();
          // If the name is less than 7 characters, pad it with random characters
          if (cleanedName.length < 7) {
            const additionalChars = 7 - cleanedName.length;
            const randomChars = Array.from(
              { length: additionalChars },
              () => String.fromCharCode(Math.floor(Math.random() * 26) + 97), // Generate random lowercase letters
            ).join("");
            return cleanedName + randomChars;
          }

          // If the name is 7 characters or longer, take the first 7 characters
          return cleanedName.substring(0, 7);
        }
        const username = generateRandomUsername(
          user.name ?? Math.random().toString(),
        );

        dbUser = await db.user.create({
          data: {
            email: user.email!,
            name: user.name!,
            image: user.image,
            username,
          },
        });
      }
      return dbUser ? true : false;
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/signout",
  },
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  debug: env.NODE_ENV === "development",
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // GithubProvider({
    //   clientId: env.GITHUB_CLIENT_ID,
    //   clientSecret: env.GITHUB_CLIENT_SECRET,
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
