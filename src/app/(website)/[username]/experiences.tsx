'use client';

import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import SectionWrapper from '../utils/section-wrapper';
import SectionTitle from '../utils/section-title';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

type Props = {
  experiences: {
    description: string;
    orgName: string;
    orgUrl: string;
    position: string;
    startDate: Date;
    endDate: Date | null;
    currentlyWorking: boolean;
  }[];
};

export default function Experience({ experiences }: Props) {
  const [selectedOrg, setSelectedOrg] = useState<string>(
    experiences[0].orgName
  );

  const [parent] = useAutoAnimate();

  return (
    <SectionWrapper>
      <div className="mb-16">
        <SectionTitle title="Past Experiences" number={2} showNumber />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1" ref={parent}>
          <ul className="list-none mx-0 mb-10 lg:mb-0 overflow-auto lg:overflow-hidden flex lg:block">
            {experiences.map((experience) => (
              <li key={experience.orgUrl} className="w-full font-mono">
                <button
                  className={`w-full flex text-left rounded-none border border-b-[1px] lg:border-none ${
                    selectedOrg === experience.orgName
                      ? 'bg-gradient text-[#bd66fffc] border border-gradient border-l-2'
                      : 'text-gray-500 bg-transparent border border-gray-600 border-l-[1px]'
                  }`}
                  onClick={() => setSelectedOrg(experience.orgName)}
                >
                  {experience.orgName}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-[3.5] ml-0 lg:ml-10">
          <div className="flex flex-col">
            <h1 className="text-2xl font-normal text-gray-300 mb-2">
              {`${experiences.find(
                (experience) => experience.orgName === selectedOrg
              )?.position},`}
              <Link
                href={
                  experiences.find(
                    (experience) => experience.orgName === selectedOrg
                  )?.orgUrl ?? ''
                }
                target="_blank"
                rel="noreferrer"
                className="text-[#bd66fffc] ml-2"
              >
                {
                  experiences.find(
                    (experience) => experience.orgName === selectedOrg
                  )?.orgName
                }
              </Link>
            </h1>
            <p className="text-gray-500 font-mono">
              {formatDate(
                experiences.find(
                  (experience) => experience.orgName === selectedOrg
                )?.startDate ?? ''
              )}{' '}
              -{' '}
              {experiences.find(
                (experience) => experience.orgName === selectedOrg
              )?.currentlyWorking
                ? 'Present'
                : formatDate(
                    experiences.find(
                      (experience) => experience.orgName === selectedOrg
                    )?.endDate ?? ''
                  )}
            </p>
          </div>
          <div className="mt-3">
            <p className="mx-0 text-gray-300 tracking-wide">
              {
                experiences.find(
                  (experience) => experience.orgName === selectedOrg
                )?.description
              }
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
