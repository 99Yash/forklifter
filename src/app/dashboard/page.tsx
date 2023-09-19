import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as Icons from "@/components/ui/icons";
import { UserNav } from "@/components/user-nav";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

const page = async () => {
  const user = await currentUser();
  const initials = `${user?.firstName?.charAt(0) ?? ""} ${
    user?.lastName?.charAt(0) ?? ""
  }`;
  if (!user) redirect("/");
  return (
    <div>
      <header className="m-5 flex items-center justify-between gap-2">
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
            <Avatar className="h-6 w-6">
              {user?.hasImage && <AvatarImage src={user?.imageUrl} />}
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        </div>
        <UserNav user={user} />
      </header>
      <hr className="max-w-screen mx-3 h-px border-0 bg-secondary" />
    </div>
  );
};

export default page;
