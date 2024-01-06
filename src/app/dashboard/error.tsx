'use client';

import Balancer from 'react-wrap-balancer';
import { ProjectCard } from './_components/project-card';
import { env } from '@/env.mjs';

export default function ErrorPage({ error }: { readonly error: Error }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-red-400">
            Yash{`'`}s Workspace
          </h2>
          <p className="text-red-100">
            An error occurred while fetching data for this page.
          </p>
        </div>
      </div>

      <div className="relative">
        <ul className="grid select-none grid-cols-1 gap-4 opacity-40 md:grid-cols-3">
          <ProjectCard.Skeleton />
          <ProjectCard.Skeleton />
          <ProjectCard.Skeleton />
        </ul>
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center space-y-2">
          <h2 className="text-2xl font-bold text-red-300">
            <Balancer>Something went wrong</Balancer>
          </h2>
          <p className="text-sm text-red-100 animate-pulse">
            <Balancer>
              {env.NODE_ENV === 'development'
                ? error.message
                : 'There seems to be an error. Please try again later.'}
            </Balancer>
          </p>
        </div>
      </div>
    </div>
  );
}
