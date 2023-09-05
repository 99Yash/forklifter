import { prisma } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env.mjs";
import {
  DefaultSession,
  getServerSession,
  User,
  type NextAuthOptions,
} from "next-auth";
import { randomBytes } from "crypto";
//todo: add default id and username for a new User

declare module "next-auth" {
  interface User {
    username: string;
    id: string;
  }
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn({ user, account, credentials }) {
      console.log(user, account, credentials);
      let dbUser: User | null = null;
      const email = user.email;
      if (email) {
        dbUser = await prisma.user.findUnique({ where: { email } });
      }
      console.log(dbUser);
      if (!dbUser) {
        //? Generate a username based on the user's name and random characters
        let username = user.name ? user.name.substring(0, 7).trim() : "";
        const additionalChars = 7 - username.length;
        username += randomBytes(additionalChars).toString("hex");

        dbUser = await prisma.user.create({
          data: {
            email: user.email as string,
            name: user.name as string,
            image: user.image as string,
            username,
          },
        });
      }
      return dbUser ? true : false;
    },
    session: async ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.username,
      },
    }),
    redirect() {
      return "/";
    },
  },
  debug: env.NODE_ENV === "development",
};

export const getAuthSession = () => getServerSession(authOptions);
