import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserNav } from "@/components/user-nav";
import Link from "next/link";
import * as Icons from "@/components/ui/icons";
import { User } from "@clerk/nextjs/server";

export default function Header({ user }: { user: User }) {
  const initials = `${user?.firstName?.charAt(0) ?? ""} ${
    user?.lastName?.charAt(0) ?? ""
  }`;
  return (
    <header className="m-4 flex items-center justify-between gap-2 md:pl-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Link href={"/"}>
            <Icons.Logo className="mr-2 h-7 w-7 font-bold" />
          </Link>
          <span className="text-xl font-semibold text-muted-foreground ">
            /
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-5 w-5">
            {user?.hasImage && <AvatarImage src={user?.imageUrl} />}
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold ">
            {user?.firstName} {user?.lastName}
          </span>
        </div>
      </div>
      <UserNav user={user} />
    </header>
  );
}
