"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import * as Icons from "@/components/ui/icons";

export default function LogOutButtons() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <SignOutButton
        signOutCallback={() =>
          startTransition(() => {
            router.push("/");
          })
        }
      >
        <Button className="w-full" disabled={isPending}>
          {isPending && <Icons.Spinner className="mr-2 h-4 w-4" />}
          Sign Out
        </Button>
      </SignOutButton>
      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        className="w-full"
        onClick={() => router.back()}
      >
        Cancel
      </Button>
    </>
  );
}
