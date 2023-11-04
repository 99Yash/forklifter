"use client";

import * as Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const workspaceItems = [
  {
    title: "Edit Profile",
    href: "/",
    icon: Icons.User,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: Icons.Projects,
  },
  {
    title: "Experiences",
    href: "/experiences",
    icon: Icons.Building,
  },
  {
    title: "Testimonials",
    href: "/testimonials",
    icon: Icons.Quote,
  },
  {
    title: "Contributions",
    href: "/oss",
    icon: Icons.GITMerge,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Icons.Settings,
  },
] as const;

export function SidebarNav() {
  const path = usePathname();

  const items = workspaceItems;
  const pathname = path === "/dashboard" ? "/dashboard/" : path;

  return (
    <nav className="grid w-full items-start gap-2">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          item.href && (
            <Link
              key={index}
              href={item.href === "/" ? "/dashboard" : `/dashboard${item.href}`}
              className={cn(
                "flex items-center gap-2 text-sm font-semibold text-muted-foreground duration-200 hover:text-accent-foreground",
                pathname === `/dashboard${item.href}`
                  ? "text-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
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
