import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getCurrentUser } from '@/lib/auth-opts';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import { getExperiences } from '../../_actions/user';
import { AddExperience } from '../_components/forms/add-experience';
import { UpdateExperience } from '../_components/forms/update-experience';
import { ProjectCard } from '../_components/project-card';

export const metadata: Metadata = {
  title: 'Experiences',
  description: `Add experiences here.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect('/');

  const experiences = await getExperiences(user.id);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold font-title">Experiences</h2>
          <p className="text-muted-foreground">
            Highlight previous work experiences here.
          </p>
        </div>
        <AddExperience />
      </div>

      {experiences.length === 0 ? (
        <div className="relative">
          <ul className="grid select-none grid-cols-1 gap-4 opacity-40 md:grid-cols-3">
            <ProjectCard.Skeleton pulse={false} />
            <ProjectCard.Skeleton pulse={false} />
            <ProjectCard.Skeleton pulse={false} />
          </ul>
          <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="text-2xl font-bold">
              <Balancer>You haven&apos;t added experiences.</Balancer>
            </h2>
            <p className=" text-muted-foreground">
              <Balancer>
                Don&apos;t have any? Head over to the Contributions tab to add
                any Open Source contributions.
              </Balancer>
            </p>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {experiences.map((experience) => (
            <li key={experience.id}>
              <Dialog>
                <DialogTrigger asChild>
                  <ProjectCard
                    id={experience.id}
                    primaryText={experience.position}
                    secondaryText={experience.orgName}
                  />
                </DialogTrigger>
                <DialogContent className="max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Edit this Experience</DialogTitle>
                    <DialogDescription>
                      Change details for this experience
                    </DialogDescription>
                  </DialogHeader>
                  <UpdateExperience experience={experience} />
                </DialogContent>
              </Dialog>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default page;
