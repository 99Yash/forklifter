"use client";

import { useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sign Out",
  description: `Are you sure you want to Sign out of ${siteConfig.name}`,
};

export default function AuthenticationPage() {
  const router = useRouter();

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign Out</h1>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to sign out?
        </p>
        <SignOutButton signOutCallback={() => router.push("/")}>
          <Button>Confirm</Button>
        </SignOutButton>
      </div>
    </div>
  );
}
