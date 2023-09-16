import { UserButton } from "@clerk/nextjs";

const page = async () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" signInUrl="/sign-in" />
    </div>
  );
};

export default page;
