import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env.mjs";
import {
  DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import { prisma } from "./db";
import { siteConfig } from "@/config/site";
import { resend } from "./resend";
import WelcomeEmail from "@/components/emails/welcome";
import { toast } from "sonner";

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
  secret: env.NEXTAUTH_SECRET,
  events:{
    async signIn(message) {
      //? Show a welcome message when a new user gets in
      if(message.isNewUser){
        const {name,email}= message.user
        //TODO Send welcome email from Resend.
        try{
          await resend.emails.send({
            from: siteConfig.name,
            to: email!,
            subject:`Welcome to Forklifter`,
            react: WelcomeEmail({
              fromEmail:env.EMAIL_FROM_ADDRESS,
              firstName: name?.split(' ')[0],
            })
          })
          }catch(err:any){
console.log("RESEND",err)
          }
      }
    },
  },
  callbacks: {
    session: async ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.username,
      },
    }),
    redirect() {
      return "/dashboard";
    },
  },
  debug: env.NODE_ENV === "development",
};

export const getAuthSession = () => getServerSession(authOptions);
export async function getCurrentUser() {
  const session = await getAuthSession();
  return session?.user;
}
