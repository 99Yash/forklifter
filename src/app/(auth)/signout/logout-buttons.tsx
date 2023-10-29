"use client";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import * as Icons from "@/components/ui/icons";
import { signOut } from "next-auth/react";

export default function LogOutButtons() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Button
        onClick={() =>
          startTransition(async () => {
            try {
              await signOut();
            } catch (error) {
              console.error("Error signing out", error);
            }
          })
        }
      >
        <Button className="w-full" disabled={isPending}>
          {isPending && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign Out
        </Button>
      </Button>
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
