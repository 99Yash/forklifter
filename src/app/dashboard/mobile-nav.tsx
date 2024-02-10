'use client';

import { Button } from '@/components/ui/button';
import * as Icons from '@/components/ui/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';
import { workspaceItems } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.Columns className="size-6" aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Icons.Logo className="mr-2 size-4" aria-hidden="true" />
            <span className="font-bold">{siteConfig.name}</span>
            <span className="sr-only">Home</span>
          </Link>
        </div>
        <div className="pl-1 pr-7">
          <div className="flex flex-col space-y-2">
            {workspaceItems?.map((item, index) =>
              item.href ? (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'text-foreground/70 transition-colors hover:text-foreground'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ) : null
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
