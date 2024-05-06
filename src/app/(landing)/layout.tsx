import Footer from '@/app/(landing)/_components/footer';
import Nav from '@/app/(landing)/_components/nav';

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#1a1a1a8b] md:bg-gradient-to-br md:from-[#2222227c] md:via-black/30 md:to-[#22222231] max-w-screen overflow-hidden">
      <Nav />
      <main className="flex flex-grow flex-col items-center">{children}</main>
      <Footer />
    </div>
  );
}
