import { getCurrentUser } from '@/lib/auth-opts';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import LogOutButtons from './logout-buttons';

export const metadata: Metadata = {
  title: 'Sign Out',
  description: 'Sign out of your account',
};

export default async function AuthenticationPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/sign-in');
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign Out</h1>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to sign out?
        </p>
        <LogOutButtons />
      </div>
    </div>
  );
}
