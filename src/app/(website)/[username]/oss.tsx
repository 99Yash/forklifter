import { Badge } from '@/components/ui/badge';
import SectionTitle from '../utils/section-title';
import SectionWrapper from '../utils/section-wrapper';

type Props = {
  contributions: {
    description: string;
    orgName: string;
    orgUrl: string;
    tags: string[];
    url: string;
  }[];
};

export default function OSS({ contributions }: Props) {
  return (
    <SectionWrapper>
      <div className="mb-16">
        <SectionTitle title={'Open Source'} number={4} showNumber />
      </div>
      <div className="mb-40">
        {contributions.map((contribution, idx) => (
          <div
            key={idx}
            className={`w-full flex flex-col-reverse justify-between text-left ${
              idx % 2 === 0
                ? 'xl:flex-row'
                : 'xl:flex-row-reverse xl:text-right'
            } ${idx === contributions.length - 1 ? 'mb-20' : 'mb-28'}`}
          >
            <div className="w-full 2xl:w-[50%]">
              <div className="none 2xl:block space-y-2">
                <div
                  className={`flex gap-2 flex-wrap cursor-default ${
                    idx % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {contribution.tags.map((tag, idx) => (
                    <p
                      key={idx}
                      className={`text-xs font-semibold rounded-md px-2 py-1 hover:transition-none ${
                        tag === 'Feature'
                          ? 'bg-green-300/30 text-green-200'
                          : tag === 'Bug'
                          ? 'bg-red-300/70 text-red-900'
                          : tag === 'Documentation'
                          ? 'bg-blue-300/70 text-blue-900'
                          : tag === 'Fix'
                          ? 'bg-yellow-300/70 text-yellow-900'
                          : tag === 'Test'
                          ? 'bg-purple-300/70 text-purple-900'
                          : tag === 'Chore'
                          ? 'bg-gray-300/70 text-gray-900'
                          : tag === 'Enhancement'
                          ? 'bg-pink-300/70 text-pink-900'
                          : 'bg-gray-300/70 text-gray-900'
                      }`}
                    >
                      {tag === 'Feature' && '✨'}
                      {tag}
                    </p>
                  ))}
                </div>
                <h1 className="text-3xl mb-2 font-bold text-gray-300 transition-all duration-200 ease-in-out hover:text-[#bd66fffc] cursor-pointer">
                  {contribution.orgName}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
