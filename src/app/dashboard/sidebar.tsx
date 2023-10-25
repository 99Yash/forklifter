"use client";

import * as Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const workspaceItems = [
  {
    title: "Projects",
    href: "/",
    icon: Icons.Post,
  },
  {
    title: "Pricing",
    href: "/pricing",
    icon: Icons.Billing,
  },
  {
    title: "Danger Zone",
    href: "/danger",
    icon: Icons.Warning,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Icons.Settings,
  },
] as const;

export function SidebarNav() {
  const pathname = usePathname();
  const items = workspaceItems;
  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          item.href && (
            <Link
              key={index}
              href={item.href === "/" ? "/dashboard" : `/dashboard${item.href}`}
              className={
                "flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent-foreground"
              }
            >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === `/dashboard${item.href}`
                    ? "bg-accent"
                    : "transparent",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
