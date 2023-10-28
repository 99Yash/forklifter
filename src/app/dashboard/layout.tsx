import { getCurrentUser } from "@/lib/authOpts";
import { redirect } from "next/navigation";
import Header from "./header";
import { SidebarNav } from "./sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  return (
    <div className="flex flex-col gap-4">
      <Header user={user} />
      <hr className="max-w-screen mx-3 -mt-4 h-px border-0 bg-secondary" />
      <div className="container mt-1 flex flex-1 gap-8 ">
        <aside className="hidden w-52 flex-col md:flex">
          <SidebarNav />
        </aside>
        <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
