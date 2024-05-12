import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { siteConfig } from '@/config/site';
import { env } from '@/env.mjs';
import {
  DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from 'next-auth';
import { prisma } from './db';

declare module 'next-auth' {
  interface User {
    username: string;
    id: string;
  }
  interface Session extends DefaultSession {
    user: User & DefaultSession['user'];
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
    signIn: '/sign-in',
    signOut: '/signout',
  },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        email: user.email,
        username: user.username,
      },
    }),
    signIn: async ({ user, email, account, profile, credentials }) => {
      if (typeof user.email !== 'string') return false;

      try {
        const dbUser = await prisma.user.findFirst({
          where: { email: user.email },
        });
        if (dbUser) return true;
        else {
          await fetch(
            `${
              env.NODE_ENV === 'development'
                ? 'http://localhost:3000'
                : siteConfig.url
            }api/email/welcome`,
            {
              method: 'POST',
              body: JSON.stringify({
                email: user.email,
                name: user.name?.split(' ')[0],
                subject: `Welcome ${user.name}.`,
              }),
            }
          );
        }
      } catch (error) {
        return true;
      }
      return true;
    },
    redirect() {
      return '/dashboard';
    },
  },
  debug: env.NODE_ENV === 'development',
};

export const getAuthSession = () => getServerSession(authOptions);
export async function getCurrentUser() {
  const session = await getAuthSession();
  return session?.user;
}
