import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { OAuthSignIn } from "./oauth-signin";
import { EmailSignIn } from "./email-signin";

export const metadata: Metadata = {
  title: "Sign In",
  description: `Sign in to continue to ${siteConfig.name}`,
};

export default function SignInPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign in to {siteConfig.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <EmailSignIn />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs font-medium uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              or continue with
            </span>
          </div>
        </div>
        <OAuthSignIn />
      </div>
      <p className="px-6 text-center text-sm text-muted-foreground">
        Copyright &copy;
        {new Date().getUTCFullYear()} {siteConfig.name} Inc. All rights
        reserved.
      </p>
    </div>
  );
}
