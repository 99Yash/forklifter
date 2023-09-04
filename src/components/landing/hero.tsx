import { data } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import ReactWrapBalancer from "react-wrap-balancer";
import { Particles } from "../ui/particles";

const Hero = () => {
  return (
    <section
      className={` relative z-10 flex h-screen max-w-6xl flex-col items-center justify-center gap-4`}
    >
      <Particles ease={20} color="#ddd9e1" className="absolute inset-0 -z-10" />
      <div className=" flex flex-col flex-wrap items-center justify-center gap-6 px-6 text-center lg:gap-3 lg:px-2">
        <h1
          className={` animate-fade-down bg-gradient-to-br from-slate-300/90 via-blue-200/50 to-purple-300/80 bg-clip-text text-6xl font-bold leading-[4.1rem] tracking-tight text-transparent md:bg-gradient-to-r md:from-slate-300/90 md:via-blue-200/60 md:to-purple-300/80 `}
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          <ReactWrapBalancer>{data.opening.heading}</ReactWrapBalancer>
        </h1>
        <p
          className={`text-md animate-fade-down text-gray-400`}
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          <ReactWrapBalancer>{data.opening.subheading}</ReactWrapBalancer>
        </p>
      </div>
      <div
        className="flex animate-fade-up flex-col gap-2 md:flex-row"
        style={{ animationDelay: "0.40s", animationFillMode: "forwards" }}
      >
        <Link
          href={"/sign-in"}
          className="flex justify-center rounded-md bg-gray-300 px-6 py-2 font-medium text-gray-900 hover:bg-slate-300/90"
        >
          Get going -&gt;
        </Link>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 justify-center rounded-md px-4 py-2 text-gray-300"
        >
          Star on GitHub
        </Link>
      </div>
    </section>
  );
};

export default Hero;
