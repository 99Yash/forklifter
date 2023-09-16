import Footer from "@/components/landing/footer";
import Nav from "@/components/landing/nav";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: User | null = await currentUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className=" bg-[#1a1a1a8b] md:bg-gradient-to-br md:from-[#2222227c] md:via-black md:to-[#22222231]">
      <Nav />
      <main className="flex flex-grow flex-col items-center">{children}</main>
      <Footer />
    </div>
  );
}
