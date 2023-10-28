import * as Icons from "@/components/ui/icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { User } from "next-auth";

export function UserNav({ user }: { user: User }) {
  const initials = `${user.name?.split(" ")[0]![0]}${
    user.name?.split(" ")[1] ? user.name?.split(" ")[1]![0] ?? "." : ""
  }`;
  const email = user.email;
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger
    //     asChild
    //     className="border-none focus-within:border-none hover:cursor-pointer focus:border-none"
    //   >
    //     <Avatar className="h-8 w-8">
    //       <AvatarImage src={user?.imageUrl as string} />
    //       <AvatarFallback>{initials}</AvatarFallback>
    //     </Avatar>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className=" w-56 text-muted-foreground" align="end">
    //     <DropdownMenuLabel className="font-normal">
    //       <div className="flex flex-col space-y-1">
    //         <p className="text-sm font-medium leading-none">
    //           {user.firstName} {user.lastName}
    //         </p>
    //         <p className="text-xs leading-none text-muted-foreground">
    //           {email}
    //         </p>
    //       </div>
    //     </DropdownMenuLabel>
    //     <DropdownMenuSeparator />

    //     <DropdownMenuGroup>
    //       <DropdownMenuItem asChild className="cursor-pointer">
    //         <Icons.User className="mr-2 h-4 w-4" />
    //         <span className="font-normal text-gray-300">Profile</span>
    //         <DropdownMenuShortcut className="font-semibold">
    //           ⌘P
    //         </DropdownMenuShortcut>
    //       </DropdownMenuItem>
    //       <DropdownMenuItem asChild>
    //         <Icons.LineChart className="mr-2 h-4 w-4" />
    //         <span className="font-normal text-gray-300">Dashboard</span>
    //         <DropdownMenuShortcut className="font-semibold">
    //           ⌘D
    //         </DropdownMenuShortcut>
    //       </DropdownMenuItem>
    //       <DropdownMenuItem asChild>
    //         <Link href="/signout">
    //           <Icons.Logout className="mr-2 h-4 w-4" aria-hidden="true" />
    //           Log out
    //           <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    //         </Link>
    //       </DropdownMenuItem>
    //     </DropdownMenuGroup>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image!} alt={user.username ?? ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/dashboard/account">
              <Icons.User className="mr-2 h-4 w-4" aria-hidden="true" />
              Account
              <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/dashboard/stores">
              <Icons.LineChart className="mr-2 h-4 w-4" aria-hidden="true" />
              Dashboard
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild disabled>
            <Link href="/dashboard/settings">
              <Icons.Settings className="mr-2 h-4 w-4" aria-hidden="true" />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/signout">
            <Icons.Logout className="mr-2 h-4 w-4" aria-hidden="true" />
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
