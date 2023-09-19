import { siteConfig } from "@/config/site";
import Link from "next/link";

const Badge = () => {
  return (
    <Link href={"https://devfolio-client.vercel.app/"} target="_blank">
      <h6 className="group inline-flex h-full animate-background-shine cursor-pointer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] px-3 py-1 text-xs font-medium backdrop-blur-3xl md:text-sm">
        <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text px-1 py-px text-xs text-transparent duration-150 ease-in-out group-hover:scale-105 ">
          {siteConfig.name} is currently in Progress. Check out a demo
        </span>
        <span className="ml-1 text-xs tracking-normal text-blue-500 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
          -&gt;
        </span>
      </h6>
    </Link>
  );
};

export default Badge;
