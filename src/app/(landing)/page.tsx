import { Cta } from '@/app/(landing)/_components/cta';
import { Features } from '@/app/(landing)/_components/features';
import { Hero } from '@/app/(landing)/_components/hero';

export default function Landing() {
  return (
    <>
      <Hero />
      <Features />
      <Cta />
    </>
  );
}
