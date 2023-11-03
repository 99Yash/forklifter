import React from "react";
import { Particles } from "../../../components/ui/particles";
import { data } from "@/config/marketing";
import ReactWrapBalancer from "react-wrap-balancer";
import Link from "next/link";
import * as Icons from "@/components/ui/icons";

const Cta = () => {
  return (
    <section
      className={`
          relative z-10 flex h-screen flex-col items-center justify-center gap-4
            `}
    >
      <Particles ease={10} color="#888789" className="absolute inset-0 -z-10" />
      <div className="flex flex-col flex-wrap items-center justify-center gap-3 px-6 text-center lg:px-2">
        <p className={`text-lg font-medium text-pink-400 lg:self-center `}>
          {data.end.highlight}
        </p>
        <h1
          className={`bg-gradient-to-r from-slate-200/60 via-slate-300 to-slate-200/60 bg-clip-text text-4xl font-bold tracking-tight  text-transparent `}
        >
          {data.end.heading}
        </h1>
        <hr className="mx-auto my-2 w-40 border-pink-500 " />
        <p className={`max-w-xl pb-2 text-lg text-gray-400 lg:max-w-none `}>
          <ReactWrapBalancer>{data.end.subheading}</ReactWrapBalancer>
        </p>
      </div>
      <Link
        href={"/sign-in"}
        className="flex items-center justify-center gap-2 rounded-md bg-gray-300/90 px-6 py-2 font-medium text-gray-950 hover:bg-slate-300/90 "
      >
        Click this button <Icons.ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
};

export default Cta;
