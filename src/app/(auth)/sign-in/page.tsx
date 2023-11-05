import { siteConfig } from "@/config/site";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import EmailSignIn from "./email-signin";
import OAuthSignIn from "./oauth-signin";
import { getCurrentUser } from "@/lib/authOpts";

export const metadata: Metadata = {
  title: "Sign In",
  description: `Sign in to continue to ${siteConfig.name}`,
};

export default async function SignInPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign in to {siteConfig.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          If you sign in via email, we&apos;ll send you a verification link.
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
