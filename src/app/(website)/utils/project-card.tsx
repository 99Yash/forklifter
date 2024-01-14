import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import * as Icons from '@/components/ui/icons';

type Props = {
  project: {
    name: string;
    githubUrl: string;
    description: string;
    webUrl: string;
    techStack: string[];
  };
  isLast: boolean;
  idx: number;
};

export default function ProjectCard({ project, isLast, idx }: Props) {
  return (
    <div
      className={`flex mt-12 w-full justify-between ${
        idx % 2 === 0 ? 'flex-row text-left' : 'flex-row-reverse text-right'
      } ${isLast ? 'mb-20' : 'mb-28'}`}
    >
      <div className="w-full 2xl:w-[50%]">
        <div className="space-y-3 hidden 2xl:block">
          <h1 className="font-mono text-base font-semibold text-[#bd66fffc]">
            Featured Project
          </h1>
          <h1 className="mb-2 text-3xl font-bold text-gray-300 transition-all duration-200 ease-in-out hover:text-[#bd66fffc] cursor-pointer">
            {project.name}
          </h1>
        </div>

        <Card className="my-0 2xl:my-2 border border-gradient rounded-none shadow-2xl shadow-purple-400/20 bg-transparent opacity-90">
          <CardHeader className="block 2xl:hidden text-3xl font-bold text-gray-300 transition-all duration-200 ease-in-out hover:text-[#bd66fffc] cursor-pointer">
            <CardTitle>{project.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 py-2 text-muted-foreground">
            <p className="my-2 text-muted-foreground">{project.description}</p>
          </CardContent>
        </Card>
        <div className="my-2 ml-1 flex gap-2 items-center flex-wrap">
          {project.techStack.map((tech, idx) => (
            <p
              key={idx}
              className="text-xs hover:transition-none text-[#bd66fffc] font-mono"
            >
              {tech}
            </p>
          ))}
        </div>
        <div className="flex gap-3">
          <Link
            className="flex gap-2 items-center text-[#bd66fffc]"
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.Code2 className="w-5 h-5 hover:transition-none cursor-pointer" />{' '}
            <p className="text-xs font-semibold">Code</p>
          </Link>
          <Link
            className="flex gap-2 items-center text-[#bd66fffc]"
            href={project.webUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.ArrowUpRight className="w-5 h-5 hover:transition-none cursor-pointer" />{' '}
            <p className="text-xs font-semibold">Visit</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
