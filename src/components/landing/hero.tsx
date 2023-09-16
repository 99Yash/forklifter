import { data } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import ReactWrapBalancer from "react-wrap-balancer";
import { Particles } from "../ui/particles";
import Badge from "./top-badge";

const Hero = () => {
  return (
    <section
      className={` relative z-10 flex h-screen max-w-6xl flex-col items-center gap-4 pt-36`}
    >
      <Particles ease={20} color="#ddd9e1" className="absolute inset-0 -z-10" />
      <div className="mb-6" data-aos="fade-down">
        <div className="relative inline-flex before:absolute before:inset-0 ">
          {/* <Link
            className="group relative inline-flex w-full items-center justify-center rounded-full border border-transparent px-3  py-1 text-sm font-medium text-zinc-300 transition duration-150 ease-in-out [background:linear-gradient(theme(colors.primary.900),_theme(colors.primary.900))_padding-box,_conic-gradient(theme(colors.primary.400),_theme(colors.primary.700)_25%,_theme(colors.primary.700)_75%,_theme(colors.primary.400)_100%)_border-box] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-zinc-800/30 hover:text-white"
            href={siteConfig.links.github}
            target="_blank"
          >
            <span className="relative inline-flex items-center">
              {siteConfig.name} is currently in Progress{" "}
              <span className="text-primary-500 ml-1 tracking-normal transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
                -&gt;
              </span>
            </span>
          </Link> */}
          <Badge />
        </div>
      </div>
      <div className=" flex flex-col flex-wrap gap-6 px-6 text-center lg:gap-3 lg:px-2">
        <h1
          className={` animate-fade-down bg-gradient-to-r from-gray-500/90 via-gray-100/75 to-gray-500/80 bg-clip-text text-7xl font-bold tracking-tight text-transparent md:bg-gradient-to-r md:from-gray-500/90 md:via-gray-100/75 md:to-gray-500/90 md:text-8xl md:leading-[6.1rem] `}
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
