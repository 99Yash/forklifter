"use client";

import { Button } from "@/components/ui/button";
import * as Icons from "@/components/ui/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { workspaceItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const pathname = path === "/dashboard" ? "/dashboard/" : path;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden text-muted-foreground"
        >
          <Icons.Columns className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7 flex flex-col gap-4 h-full">
          <div className="flex gap-2 items-center">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Icons.Logo className="mr-2 h-5 w-5" aria-hidden="true" />
              <span className="font-bold">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {workspaceItems?.map((item, index) => {
              const Icon = item.icon;
              return (
                item.href && (
                  <Link
                    key={index}
                    href={
                      item.href === "/"
                        ? "/dashboard"
                        : `/dashboard${item.href}`
                    }
                    className={cn(
                      "text-foreground/70 transition-colors hover:text-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      className={cn(
                        "flex min-w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === `/dashboard${item.href}`
                          ? "text-primary"
                          : "transparent",
                      )}
                    >
                      <Icon className={`mr-2 h-4 w-4`} />
                      <span>{item.title}</span>
                    </span>
                  </Link>
                )
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
