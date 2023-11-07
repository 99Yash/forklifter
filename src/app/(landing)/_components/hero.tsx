import { data } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import ReactWrapBalancer from "react-wrap-balancer";
import { Particles } from "../../../components/ui/particles";
import Badge from "./top-badge";
import * as Icons from "@/components/ui/icons";

const Hero = () => {
  return (
    <section
      className={` relative z-10 flex h-screen max-w-6xl flex-col items-center gap-4 pt-20 md:pt-36`}
    >
      <Particles ease={20} color="#ddd9e1" className="absolute inset-0 -z-10" />
      <div
        className="mb-6 animate-fade-down"
        style={{
          animationDelay: "0.35s",
          animationFillMode: "forwards",
        }}
        data-aos="fade-down"
      >
        <Badge />
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
        className="mt-8 flex animate-fade-up flex-col gap-2 sm:w-full md:w-fit md:flex-row"
        style={{ animationDelay: "0.40s", animationFillMode: "forwards" }}
      >
        <Link
          href={"/sign-in"}
          className="flex items-center justify-center gap-2 rounded-md bg-gray-300 px-6 py-2 font-medium text-gray-900 hover:bg-slate-300/90 sm:mx-6 md:mx-0"
        >
          Get going <Icons.ArrowRight className="h-4 w-4" />
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