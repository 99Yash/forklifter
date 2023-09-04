import Footer from "@/components/landing/footer";
import Nav from "@/components/landing/nav";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-[#1a1a1a8b] md:bg-gradient-to-br md:from-[#2222227c] md:via-black md:to-[#22222231]">
      <Nav />
      <main className="flex flex-grow flex-col items-center">{children}</main>
      <Footer />
    </div>
  );
}
