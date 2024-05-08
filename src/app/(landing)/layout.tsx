import Footer from '@/app/(landing)/_components/footer';
import Nav from '@/app/(landing)/_components/nav';
import Image from 'next/image';

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#1a1a1a8b] md:bg-gradient-to-br md:from-[#2222227c] md:via-black/30 md:to-[#22222231] max-w-screen overflow-hidden">
      <Image
        width={1512}
        height={550}
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2"
        src="/images/gradient-background-top.png"
        alt=""
        role="presentation"
        priority
      />
      <Nav />
      <main className="flex flex-grow flex-col items-center">{children}</main>
      <Footer />
    </div>
  );
}
