import { Badge } from '@/components/ui/badge';
import SectionTitle from '../utils/section-title';
import SectionWrapper from '../utils/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

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
      <div id="contributions" className="mb-16">
        <SectionTitle title={'Open Source'} showNumber />
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
              <div className="hidden 2xl:block space-y-3">
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
                          ? 'bg-red-300/30 text-red-200'
                          : tag === 'Documentation'
                          ? 'bg-blue-300/30 text-blue-200'
                          : tag === 'Fix'
                          ? 'bg-yellow-300/30 text-yellow-200'
                          : tag === 'Test'
                          ? 'bg-purple-300/30 text-purple-200'
                          : tag === 'Chore'
                          ? 'bg-gray-300/70 text-gray-900'
                          : tag === 'Enhancement'
                          ? 'bg-pink-300/30 text-pink-200'
                          : 'bg-gray-300/30 text-gray-200'
                      }`}
                    >
                      {tag === 'Feature' && '✨ '}
                      {tag}
                    </p>
                  ))}
                </div>
                <h1 className="text-3xl mb-2 font-bold text-gray-300 transition-all duration-200 ease-in-out hover:text-[#bd66fffc] cursor-pointer">
                  {contribution.orgName}
                </h1>
              </div>
              <Card className="my-0 2xl:my-2 border border-gradient rounded-none shadow-2xl shadow-purple-400/20 bg-transparent opacity-90">
                <CardHeader className="block 2xl:hidden text-3xl font-bold text-gray-300 transition-all duration-200 ease-in-out hover:text-[#bd66fffc] cursor-pointer">
                  <CardTitle>{contribution.orgName}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 py-2">
                  {contribution.tags.map((tag, idx) => (
                    <p
                      key={idx}
                      className={`2xl:hidden text-xs font-semibold rounded-md px-2 py-1 hover:transition-none ${
                        tag === 'Feature'
                          ? 'bg-green-300/30 text-green-200'
                          : tag === 'Bug'
                          ? 'bg-red-300/30 text-red-200'
                          : tag === 'Documentation'
                          ? 'bg-blue-300/30 text-blue-200'
                          : tag === 'Fix'
                          ? 'bg-yellow-300/30 text-yellow-200'
                          : tag === 'Test'
                          ? 'bg-purple-300/30 text-purple-200'
                          : tag === 'Chore'
                          ? 'bg-gray-300/70 text-gray-900'
                          : tag === 'Enhancement'
                          ? 'bg-pink-300/30 text-pink-200'
                          : 'bg-gray-300/30 text-gray-200'
                      }`}
                    >
                      {tag === 'Feature' && '✨ '}
                      {tag}
                    </p>
                  ))}
                  <p className="my-2 text-muted-foreground">
                    {contribution.description}
                  </p>
                </CardContent>
              </Card>
              <div className="mt-4">
                <Link
                  href={contribution.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold rounded-md hover:underline bg-gradient px-4 py-2 transition-all duration-200 ease-in-out"
                >
                  View Contribution
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
