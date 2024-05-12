import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Image from 'next/image';
import GlowTop from '../../../../public/glow-top.svg';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const calcom = localFont({
  src: '../../../../public/fonts/CalSans-SemiBold.woff2',
  variable: '--font-title',
});

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={cn(
        'min-h-screen font-sans antialiased',
        inter.variable,
        calcom.variable
      )}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 opacity-60">
        <Image
          src={GlowTop}
          className="max-w-[55vw] fixed -z-10 right-1/4"
          width={1404}
          height={658}
          alt="Glow Top"
        />
      </div>
      {children}
    </main>
  );
}
