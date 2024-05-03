type Props = {
  name: string;
  bio: string;
  oneLiner: string;
  mail: string;
};

export default function Hero({ name, bio, oneLiner, mail }: Props) {
  return (
    <section className="mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[70%] flex flex-col justify-center h-[90vh]">
      <div className="sm:ml-1 lg:ml-2">
        <h1 className="font-mono sm:text-base lg:text-lg xl:text-xl font-light leading-[1.5] text-[#bd66fffc]">
          Hi, my name is
        </h1>
      </div>
      <h1 className="sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-l from-[#bd66fffc] to-gray-700 bg-clip-text text-transparent tracking-tighter font-semibold leading-[1.2]">
        {name}
      </h1>
      <h1 className="sm:text-3xl md:text-4xl lg:text-5xl w-4/5 font-semibold leading-[1.2] text-gray-400">
        {oneLiner}
      </h1>
      <div className="my-6 max-w-full md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%]">
        <p className="text-base leading-[1.5] tracking-wide text-gray-400">
          {bio}
        </p>
      </div>
      <div className="my-4">
        <a href={`mailto:${mail}`} target="_blank" rel="noreferrer">
          <button className="relative inline-flex overflow-hidden rounded-xl p-px">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c4c_0%,#922c2c_50%,#bebebe_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[11px] bg-[#bd66ff87] px-4 py-2 text-sm font-medium text-gray-50 backdrop-blur-3xl">
              Get in Touch!
            </span>
          </button>
        </a>
      </div>
    </section>
  );
}
