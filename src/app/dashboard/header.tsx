import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserNav } from '@/components/user-nav';
import Link from 'next/link';
import * as Icons from '@/components/ui/icons';
import { type User } from 'next-auth';
import MobileNav from './mobile-nav';

export default function Header({ user }: { user: User }) {
  const initials = `${user.name?.split(' ')[0]![0]}${
    user.name?.split(' ')[1] ? user.name?.split(' ')[1]![0] ?? '.' : ''
  }`;

  return (
    <header className="m-4 flex items-center justify-between gap-2 md:pl-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Link href={'/'}>
            <Icons.Logo className="mr-2 h-7 w-7 font-bold" />
          </Link>
          <span className="text-xl font-semibold text-muted-foreground">/</span>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-5 w-5">
            <AvatarImage
              src={
                user?.image ??
                'https://cdn.vectorstock.com/i/1000x1000/45/79/male-avatar-profile-picture-silhouette-light-vector-4684579.webp'
              }
            />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold ">{user.name}</span>
          <MobileNav />
        </div>
      </div>
      <UserNav user={user} />
    </header>
  );
}
