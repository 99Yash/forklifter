import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getCurrentUser } from '@/lib/auth-opts';
import { prisma } from '@/lib/db';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import ProjectForm from '../_components/forms/add-project';
import UpdateProject from '../_components/forms/update-project';
import { ProjectCard } from '../_components/project-card';

export const metadata: Metadata = {
  title: 'Projects',
  description: `List of projects.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect('/');

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold font-title">Projects</h2>
          <p className="text-muted-foreground">
            All your projects show up here.
          </p>
        </div>
        {/* //? includes the create Project button */}
        <ProjectForm />
      </div>

      {projects.length === 0 ? (
        <div className="relative">
          <ul className="grid select-none grid-cols-1 gap-4 opacity-40 md:grid-cols-3">
            <ProjectCard.Skeleton pulse={false} />
            <ProjectCard.Skeleton pulse={false} />
            <ProjectCard.Skeleton pulse={false} />
          </ul>
          <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="text-2xl font-bold">
              <Balancer>You have no projects yet.</Balancer>
            </h2>
            <p className="text-md text-muted-foreground">
              <Balancer>Create your first project to get started.</Balancer>
            </p>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <Dialog>
                <DialogTrigger asChild>
                  <ProjectCard
                    id={project.id}
                    primaryText={project.name}
                    secondaryText={project.description}
                  />
                </DialogTrigger>
                <DialogContent className="max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit this Project</DialogTitle>
                    <DialogDescription>
                      Change details for this project.
                    </DialogDescription>
                  </DialogHeader>
                  <UpdateProject project={project} />
                </DialogContent>
              </Dialog>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default page;
