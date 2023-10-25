import { cn, extractInitials } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import * as Icons from "../ui/icons";
import { siteConfig } from "@/config/site";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getServerAuthSession } from "@/server/auth";

const Nav = async () => {
  const session = await getServerAuthSession();
  const user = session?.user;
  if (!user)
    return (
      <nav
        className={`z-10 mx-auto flex items-center justify-between self-center p-2 lg:w-2/3`}
      >
        <Link href={"/"} className="flex list-none items-center">
          <Icons.Logo className="mx-3 my-2 transform text-muted-foreground duration-300 hover:text-foreground " />
          <span className="font-semibold text-muted-foreground duration-300 hover:text-foreground">
            {siteConfig.name}
          </span>
        </Link>
        <Link
          href={"/sign-in"}
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "text-sm font-medium text-gray-300 duration-300 hover:text-gray-200",
          )}
        >
          Sign in
          <Icons.ChevronRight className="h-4 w-4" />
        </Link>
      </nav>
    );

  return (
    <nav
      className={`z-10 mx-auto flex items-center justify-between self-center p-2 lg:w-2/3`}
    >
      <Link href={"/"} className="flex list-none items-center">
        <Icons.Logo className="mx-3 my-2 transform text-muted-foreground duration-300 hover:text-foreground " />
        <span className="font-semibold text-muted-foreground duration-300 hover:text-foreground">
          {siteConfig.name}
        </span>
      </Link>
      <Link
        href={"/dashboard"}
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
          "text-sm font-medium text-gray-300 duration-300 hover:text-gray-200",
        )}
      >
        <Avatar className="mr-2 h-5 w-5">
          <AvatarImage src={user.image!} />
          <AvatarFallback className="text-xs">
            {extractInitials(user.name!)}
          </AvatarFallback>
        </Avatar>
        Dashboard
        <Icons.ChevronRight className="w4 h-4" />
      </Link>
    </nav>
  );
};

export default Nav;
