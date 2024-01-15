import Link from 'next/link';
import SectionWrapper from '../utils/section-wrapper';

export default function Contact({ mail }: { mail: string }) {
  return (
    <SectionWrapper>
      <div className="text-center">
        <h3 className="text-lg text-[#bd66fffc] font-mono mb-4">
          What&apos;s next?
        </h3>
        <h1 className="text-5xl font-semibold mb-4">Get in Touch</h1>
        <p className="max-w-full md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] 2xl:max-w-[60%] mx-auto text-gray-400 tracking-wide opacity-90 leading-relaxed">
          I&apos;m currently looking for a full-stack developer role, In a
          pre-series A startup. And work along side a highly focussed team that
          is trying to put a dent in the universe. Sounds familiar? Let&apos;s
          talk.
        </p>
        <div className="mx-auto w-fit mt-10">
          <Link
            className=""
            target="_blank"
            rel="noreferrer"
            href={`mailto:${mail}`}
          >
            <p className="px-10 py-7 font-mono border border-[#bd66fffc] text-[#bd66fffc]">
              Say Hello
            </p>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
