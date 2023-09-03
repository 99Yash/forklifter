import Link from "next/link";
import * as Icons from "../ui/icons";

const Nav = () => {
  return (
    <nav
      className={` z-10 mx-auto flex items-center justify-between self-center p-2 lg:w-2/3`}
    >
      <Link href={"/"} className="flex list-none items-center">
        <Icons.Logo className="mx-3 my-2 transform text-muted-foreground duration-300 hover:text-foreground " />
      </Link>
      <Link
        href={"/sign-in"}
        className=" mx-4 my-2 flex rounded-md text-sm font-medium text-gray-400 duration-300 hover:text-gray-300"
      >
        Sign in
      </Link>
    </nav>
  );
};

export default Nav;
