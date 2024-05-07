type Props = {
  name: string;
  oneLiner: string;
  mail: string;
};

export default function Hero({ name, oneLiner, mail }: Props) {
  return (
    <section className="animate-fade-down mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[70%] flex flex-col gap-4 justify-center h-[90vh]">
      <div className="sm:ml-1 lg:ml-2">
        <h1 className="font-mono sm:text-base lg:text-lg xl:text-xl font-light text-[#bd66fffc]">
          Hi, my name is
        </h1>
      </div>
      <h1 className="sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-l from-[#bd66fffc] to-gray-300 bg-clip-text text-transparent tracking-tighter font-semibold">
        {name}
      </h1>
      <h1 className="text-4xl lg:text-5xl md:w-4/5 font-semibold text-gray-400">
        {oneLiner}
      </h1>
      <div className="my-12">
        <a href={`mailto:${mail}`} target="_blank" rel="noreferrer">
          <button className="relative inline-flex overflow-hidden rounded-xl p-px">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1a061a_0%,#0e030370_50%,#bebebe_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[11px] bg-[#bd66ff32] px-8 py-4 text-lg font-semibold text-gray-50 backdrop-blur-3xl">
              Get in Touch!
            </span>
          </button>
        </a>
      </div>
    </section>
  );
}
