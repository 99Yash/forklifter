import { data, features } from '@/config/marketing';
import Image from 'next/image';
import ReactWrapBalancer from 'react-wrap-balancer';
import GlowTop from '../../../../public/glow-top.svg';

const Features = () => {
  return (
    <div className="flex justify-between max-w-[90vw]">
      <section
        className={`flex flex-col flex-wrap items-center gap-3 px-4 text-center max-w-6xl`}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10">
          <Image
            src={GlowTop}
            className="max-w-none"
            width={1404}
            height={658}
            alt="Glow Top"
          />
        </div>
        <div className="flex max-w-2xl mx-auto mt-16 md:w-5/12 lg:w-1/2 sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="z-10 flex-none max-w-3xl sm:max-w-5xl sm:block md:hidden lg:max-w-none">
            <Image
              src="/image.png"
              alt="App screenshot"
              width={2432}
              height={1442}
              className="w-[76rem] z-10 rounded-xl border border-white/10"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 self-start">
          <p className={`text-lg font-semibold text-blue-400`}>
            {data.middle.highlight}
          </p>
          <h1
            className={`bg-gradient-to-r from-slate-200/70 via-slate-300 to-slate-200/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent`}
          >
            {data.middle.heading}
          </h1>
          <hr className="mx-auto my-4 w-40 border-blue-500" />
          <p className={`max-w-xl text-lg text-gray-400`}>
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
        </div>
      </section>

      <div className="flex max-w-2xl mx-auto mt-16 md:w-5/12  sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
        <div className="z-10 flex-none max-w-3xl sm:max-w-5xl sm:hidden md:block lg:max-w-none">
          <Image
            src="/image.png"
            alt="App screenshot"
            width={2432}
            height={1442}
            className="w-[76rem] z-10 rounded-xl border border-white/10"
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
