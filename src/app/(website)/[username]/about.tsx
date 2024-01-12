import SectionWrapper from '../utils/section-wrapper';
import SectionTitle from '../utils/section-title';

export default function About({ about }: { about: string }) {
  return (
    <SectionWrapper>
      <div className="mt-10">
        <SectionTitle title="About" number={1} showNumber />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-[1.3] mr-6">
          <p className="my-4 leading-[1.5] tracking-wide text-gray-500">
            {about}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
