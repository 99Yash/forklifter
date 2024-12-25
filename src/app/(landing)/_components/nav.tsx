import { getAuthSession } from '@/lib/auth-opts';
import { cn, getInitials } from '@/lib/utils';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/ui/avatar';
import { buttonVariants } from '../../../components/ui/button';
import * as Icons from '../../../components/ui/icons';

export async function Nav() {
  const session = await getAuthSession();

  if (!session)
    return (
      <nav
        className={` z-10 mx-auto flex items-center justify-between self-center p-2 lg:w-2/3`}
      >
        <Link href={'/'} className="flex list-none items-center">
          <Icons.Logo className="mx-3 my-2 transform text-muted-foreground duration-300 hover:text-foreground " />
        </Link>
        <Link
          href={'/sign-in'}
          className={cn(
            buttonVariants({
              variant: 'outline',
            }),
            'text-sm font-medium text-gray-300 duration-300 hover:text-gray-200'
          )}
        >
          Sign in
          <Icons.ChevronRight className="h-4 w-4" />
        </Link>
      </nav>
    );

  const initials = getInitials(session.user.name ?? 'Van Heusen');

  return (
    <nav
      className={` z-10 mx-auto flex items-center justify-between self-center p-2 lg:w-2/3`}
    >
      <Link href={'/'} className="flex list-none items-center">
        <Icons.Logo className="mx-3 my-2 transform text-muted-foreground duration-300 hover:text-foreground " />
      </Link>
      <Link
        href={'/dashboard'}
        className={cn(
          buttonVariants({
            variant: 'outline',
          }),
          'text-sm font-medium text-gray-300 duration-300 hover:text-gray-200'
        )}
      >
        <Avatar className="mr-2 h-5 w-5">
          <AvatarImage
            src={
              session.user.image ??
              'https://cdn.vectorstock.com/i/1000x1000/45/79/male-avatar-profile-picture-silhouette-light-vector-4684579.webp'
            }
          />
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        Dashboard
        <Icons.ChevronRight className="w4 h-4" />
      </Link>
    </nav>
  );
}
