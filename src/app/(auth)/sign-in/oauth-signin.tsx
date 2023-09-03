"use client";

import { Button } from "@/components/ui/button";
import * as Icons from "@/components/ui/icons";

import { useState } from "react";

export default function OAuthSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        className="bg-background"
        // onClick={() => oauthSignIn("oauth_github")}
      >
        {isLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.GitHub className="mr-2 h-4 w-4" />
        )}
        Github
      </Button>
      <Button
        variant="outline"
        className="bg-background"
        // onClick={() => oauthSignIn("oauth_google")}
      >
        {isLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  );
}
