'use client';

import Globe from '../utils/globe';
import SectionTitle from '../utils/section-title';
import SectionWrapper from '../utils/section-wrapper';

export default function About({ about }: { about: string }) {
  return (
    <SectionWrapper>
      <div id="about" className="mt-10">
        <SectionTitle title="About" showNumber />
      </div>
      <div className="flex flex-col lg:flex-row lg:max-w-2xl">
        <div className="flex-[1.3] mr-6">
          <p className="my-4 leading-[1.5] tracking-wide text-gray-500">
            {about}
          </p>
        </div>
      </div>
      <Globe />
    </SectionWrapper>
  );
}
