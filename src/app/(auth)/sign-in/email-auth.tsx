"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Icons from "@/components/ui/icons";
import { useState } from "react";

export default function EmailAuth() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form className="grid gap-2">
      <div className="grid gap-1">
        <Input
          type="email"
          placeholder="name@example.com"
          name="email"
          className="bg-background"
          autoCorrect="off"
          autoComplete="email"
          autoCapitalize="none"
        />
      </div>
      <Button disabled={isLoading}>
        {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
        Sign In with Email
      </Button>
    </form>
  );
}
