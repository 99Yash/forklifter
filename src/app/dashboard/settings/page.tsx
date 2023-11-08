import * as Icons from "@/components/ui/icons";
import { getCurrentUser } from "@/lib/authOpts";

import { type Metadata } from "next";
import { redirect } from "next/navigation";
import DeleteWorkspace from "./delete-workspace";

export const metadata: Metadata = {
  title: "Account",
  description: `Manage your account details here.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect("/");
  return (
    <div className="space-y-4 lg:container">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">Account</h2>
        <p className="text-muted-foreground">
          Manage your account details here.
        </p>
      </div>

      <DeleteWorkspace />
    </div>
  );
};

export default page;
