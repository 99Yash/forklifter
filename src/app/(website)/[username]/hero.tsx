import { Button } from '@/components/ui/button';

type Props = {
  name: string;
  bio: string;
  oneLiner: string;
  mail: string;
};

export default function Hero({}) {
  return (
    <section className="mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[70%] flex flex-col justify-center h-[90vh]">
      <div className="sm:ml-1 lg:ml-2">
        <h1 className="font-mono sm:text-base lg:text-lg xl:text-xl font-light leading-[1.5] text-[#bd66fffc]">
          Hi, my name is
        </h1>
      </div>
      <h1 className="sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-l from-[#bd66fffc] to-white bg-clip-text tracking-tighter font-semibold leading-[1.2]">
        Yash G. Kar
      </h1>
      <h1 className="sm:text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.2] text-gray-400">
        A person who iterates fast
      </h1>
      <div className="my-6 max-w-full md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%]">
        <p className="text-base leading-[1.5] tracking-wide text-gray-400">
          Hi, I&apos;m a software engineer from India having previously worked
          at I{`'`}ve a habit of building sophisticated products & shipping them
          really fast: be it making an internal UI library, or handling
          infrastructure. I truly champion ; having shipped to Formbricks,
          Trigger, Infisical, Twenty, Cal and many more.
        </p>
      </div>
      <div className="my-4">
        <a
          href={`mailto:pandaronit25@gmail.com`}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            className="rounded-lg
								bg-gradient-to-r from-[#bd66fffc] to-white
								text-[#bd66fffc]
								transition-colors duration-200
								hover:from-[#bd66fffc] hover:to-white
								hover:text-[#bd66fffc]"
          >
            Get in touch!
          </Button>
        </a>
      </div>
    </section>
  );
}
