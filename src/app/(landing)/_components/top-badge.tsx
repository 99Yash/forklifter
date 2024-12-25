import * as Icons from '@/components/ui/icons';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export function Badge() {
  return (
    <Link href={siteConfig.links.github} target="_blank">
      <h6 className="group inline-flex h-full animate-background-shine cursor-pointer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000,45%,#7a7c7995,55%,#000)] bg-[length:250%_100%] px-3 py-1 text-xs font-medium backdrop-blur-3xl md:text-sm">
        <span className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-clip-text px-1 py-px text-xs font-semibold text-transparent duration-300 hover:text-gray-200">
          {siteConfig.name} is Open Source
        </span>
        <span className="ml-1 text-xs tracking-normal text-gray-200 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
          <Icons.ArrowRight className="h-4 w-4" />
        </span>
      </h6>
    </Link>
  );
}
