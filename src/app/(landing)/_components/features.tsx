import { data, features } from '@/config/marketing';
import Image from 'next/image';
import GlowTop from '../../../../public/glow-top.svg';
import ReactWrapBalancer from 'react-wrap-balancer';

const Features = () => {
  return (
    <section
      className={`flex flex-col flex-wrap items-center justify-center gap-3 px-4 text-center lg:text-left `}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10">
        <Image
          src={GlowTop}
          className="max-w-none"
          width={1404}
          height={658}
          alt="Features Illustration"
        />
      </div>
      <p className={`text-lg font-medium text-blue-400 lg:self-center `}>
        {data.middle.highlight}
      </p>
      <h1
        className={`bg-gradient-to-r from-slate-200/70 via-slate-300 to-slate-200/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent`}
      >
        {data.middle.heading}
      </h1>
      <hr className="mx-auto my-4 w-40 border-blue-500" />
      <p className={`hidden max-w-xl text-lg text-gray-400 md:flex`}>
        <ReactWrapBalancer>{data.middle.subTitle}</ReactWrapBalancer>
      </p>
      <p className={`max-w-xl text-lg text-gray-400`}>
        <ReactWrapBalancer>{data.middle.text}</ReactWrapBalancer>
      </p>
      <p
        className={`bg-gradient-to-r from-blue-100 via-slate-300 to-blue-100 bg-clip-text text-lg font-bold text-transparent`}
      >
        {data.middle.endText}
      </p>
      <dl className="mt-2 flex flex-col gap-4">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="group rounded px-2 py-1 duration-500 hover:bg-zinc-300"
          >
            <div className="flex items-center space-x-2 ">
              <feature.icon className="h-4 w-4 shrink-0 text-zinc-400 duration-500 group-hover:text-zinc-950" />
              <h4 className="font-medium text-zinc-300 duration-500 group-hover:text-zinc-950">
                {feature.name}
              </h4>
            </div>
            <p className="text-left text-sm text-zinc-400 duration-500 group-hover:text-zinc-950">
              {feature.description}
            </p>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Features;
