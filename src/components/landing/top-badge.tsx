import { siteConfig } from "@/config/site";

const Badge = () => {
  return (
    <h6 className="inline-flex h-full animate-background-shine cursor-pointer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] px-3 py-1 text-sm font-medium text-slate-300 backdrop-blur-3xl">
      {siteConfig.name} is currently in Progress
      <span className="text-primary-500 ml-1 tracking-normal transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
        -&gt;
      </span>
    </h6>
  );
};

export default Badge;
