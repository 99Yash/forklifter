'use client';

import { workspaceItems } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SidebarNav() {
  const path = usePathname();

  const pathname = path === '/dashboard' ? '/dashboard/' : path;

  return (
    <nav className="flex flex-col items-start gap-2">
      {workspaceItems.map((item, index) => {
        const Icon = item.icon;
        return (
          item.href && (
            <Link
              key={index}
              href={item.href === '/' ? '/dashboard' : `/dashboard${item.href}`}
              className={cn(
                `group flex min-w-full items-center gap-2 text-sm font-semibold text-muted-foreground duration-200 hover:text-accent-foreground ${
                  pathname === `/dashboard${item.href}`
                    ? 'text-accent-foreground'
                    : 'transform hover:scale-105'
                } `
              )}
            >
              <span
                className={cn(
                  'flex min-w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  pathname === `/dashboard${item.href}`
                    ? 'bg-accent'
                    : 'transparent'
                )}
              >
                <Icon
                  className={`mr-2 h-4 w-4 group-hover:animate-spin-once`}
                />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
