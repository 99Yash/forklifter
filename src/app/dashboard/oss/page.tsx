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
import { getContributions } from '../../_actions/user';
import AddOSS from '../_components/forms/add-oss';
import UpdateOSS from '../_components/forms/update-oss';
import { ProjectCard } from '../_components/project-card';

export const metadata: Metadata = {
  title: 'Open Source',
  description: `Add or edit OSS Contributions by you.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect('/');

  const contributions = await getContributions(user.id);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold font-title">Contributions</h2>
          <p className="text-muted-foreground">
            Enlist your most important Open Source Contributions here.
          </p>
        </div>
        <AddOSS />
      </div>

      {contributions.length === 0 ? (
        <div className="relative">
          <ul className="grid select-none grid-cols-1 gap-4 opacity-40 md:grid-cols-3">
            <ProjectCard.Skeleton pulse={false} />
            <ProjectCard.Skeleton pulse={false} />
            <ProjectCard.Skeleton pulse={false} />
          </ul>
          <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="text-2xl font-bold">
              <Balancer>You&apos;ve Zero open source contributions.</Balancer>
            </h2>
            <p className=" text-muted-foreground">
              <Balancer>Put all your Open Source contributions here.</Balancer>
            </p>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {contributions.map((oss) => (
            <li key={oss.id}>
              <Dialog>
                <DialogTrigger asChild>
                  <ProjectCard
                    id={oss.id}
                    primaryText={oss.orgName}
                    secondaryText={oss.tags.join(', ')}
                  />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit this Contribution</DialogTitle>
                    <DialogDescription>
                      Change details for this contribution.
                    </DialogDescription>
                  </DialogHeader>
                  <UpdateOSS oss={oss} />
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
