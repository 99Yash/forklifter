import { User } from "@clerk/nextjs/server";
import * as Icons from "@/components/ui/icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export function UserNav({ user }: { user: User }) {
  const initials = `${user?.firstName?.charAt(0) ?? ""} ${
    user?.lastName?.charAt(0) ?? ""
  }`;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="border-none focus-within:border-none hover:cursor-pointer focus:border-none"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.imageUrl as string} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" w-[180px] text-muted-foreground"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.firstName && user.lastName && (
              <p className="text-muted-foreground">
                {user?.firstName} {user?.lastName}
              </p>
            )}

            {user?.emailAddresses.at(0) && (
              <p className="truncate text-xs font-medium text-muted-foreground">
                {user?.emailAddresses.at(0)?.emailAddress ?? ""}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <Icons.User className="mr-2 h-4 w-4" />
          <span className="font-normal text-gray-300">Profile</span>
          <DropdownMenuShortcut className="font-semibold">
            ⌘P
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Icons.LineChart className="mr-2 h-4 w-4" />
          <span className="font-normal text-gray-300">Dashboard</span>
          <DropdownMenuShortcut className="font-semibold">
            ⌘D
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className="mt-2 cursor-pointer">
          <Link href={"/sign-out"} className="flex items-center">
            <Icons.Logout className="mr-2 h-4 w-4" />
            <span className="font-normal text-gray-300">Log out</span>
          </Link>
          <DropdownMenuShortcut className=" font-semibold">
            ⇧⌘Q
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
