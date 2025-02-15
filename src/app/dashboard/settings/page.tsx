import { getCurrentUser } from '@/lib/auth-opts';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import DeleteWorkspace from './delete-workspace';

export const metadata: Metadata = {
  title: 'Account',
  description: `Manage your account details here.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect('/');

  return (
    <section className="space-y-4 lg:container">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold font-title">Account</h2>
        <p className="text-muted-foreground">
          Manage your account details here.
        </p>
      </div>

      <DeleteWorkspace />
    </section>
  );
};

export default page;
