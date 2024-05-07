import Link from 'next/link';
import SectionTitle from '../utils/section-title';
import SectionWrapper from '../utils/section-wrapper';

type Props = {
  testimonials: {
    message: string;
    author: string;
    authorUrl: string;
    designation: string;
  }[];
};

export default function Testimonials({ testimonials }: Props) {
  return (
    <SectionWrapper>
      <div id="testimonials" className="mb-16">
        <SectionTitle title="Testimonials" showNumber />
      </div>
      {testimonials.map((testimonial, index) => (
        <div key={index} className="flex gap-10 flex-col mb-10">
          <div className="flex flex-col gap-10 justify-between">
            <p className="text-xl lg:text-2xl font-normal leading-[1.4] text-gray-400">
              {testimonial.message}
            </p>
            <div className="flex flex-col gap-2 font-semibold">
              <Link
                href={testimonial.authorUrl}
                target="_blank"
                rel="noreferrer"
                className="underline w-fit"
              >
                {testimonial.author}
              </Link>
              <p className="text-[#bd66fffc] italic font-semibold text-sm">
                {testimonial.designation}
              </p>
            </div>
          </div>
        </div>
      ))}
    </SectionWrapper>
  );
}
