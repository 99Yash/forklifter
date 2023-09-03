import Footer from "@/components/landing/footer";
import Nav from "@/components/landing/nav";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-gradient-to-br from-[#2222229a] via-black to-[#22222292]">
      <Nav />
      <main className="flex flex-grow flex-col items-center">{children}</main>
      <Footer />
    </div>
  );
}
