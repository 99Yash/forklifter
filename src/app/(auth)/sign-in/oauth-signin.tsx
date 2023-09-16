"use client";

import { Button } from "@/components/ui/button";
import * as Icons from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/server";

import { useState } from "react";

export function OAuthSignIn() {
  const [isLoading, setIsLoading] = useState<OAuthStrategy | null>(null);
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { toast } = useToast();

  const oauthSignIn = async (provider: OAuthStrategy) => {
    if (!signInLoaded) return null;
    try {
      setIsLoading(provider);
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (cause) {
      console.error(cause);
      setIsLoading(null);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong, please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        className="bg-background"
        onClick={() => oauthSignIn("oauth_github")}
      >
        {isLoading === "oauth_github" ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.GitHub className="mr-2 h-4 w-4" />
        )}
        Github
      </Button>
      <Button
        variant="outline"
        className="bg-background"
        onClick={() => oauthSignIn("oauth_google")}
      >
        {isLoading === "oauth_google" ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
      <Button
        variant="outline"
        className="bg-background"
        onClick={() => oauthSignIn("oauth_github")}
      >
        {isLoading === "oauth_linkedin" ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.LinkedIn className="mr-2 h-4 w-4" />
        )}
        LinkedIn
      </Button>
    </div>
  );
}
