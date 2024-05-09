'use client';

import { Button } from '@/components/ui/button';
import { stackl } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import Connect from './connect';
import StacksCard from './stack-card';

const variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

type Props = {
  bio: string;
  twitter: string;
  linkedin: string;
  github: string;
  techStack: Array<(typeof stackl)[number]>;
};

const AboutMe = ({ bio, twitter, linkedin, github, techStack }: Props) => {
  const cardsRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(cardsRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={cardsRef}
      transition={{
        duration: 0.5,
      }}
      className="relative my-24 will-change-[transform,opacity]"
    >
      <motion.h2
        className="text-center font-title text-3xl font-bold sm:text-4xl bg-gradient-to-t from-slate-200 to-slate-500 bg-clip-text text-transparent"
        initial={{
          y: 30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        About Me
      </motion.h2>
      <motion.div
        className="mt-12 grid gap-4 md:grid-cols-2 items-stretch"
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {/* <div className="grid gap-4 "> */}
        {/* <LocationCard /> */}
        {/* </div> */}
        <StacksCard stacks={techStack} />
        <Connect twitter={twitter} linkedin={linkedin} github={github} />
        {/* <div className='grid gap-4 [@media(min-width:450px)]:grid-cols-2'>
            <CodingHours />
            <FavouriteFramework />
          </div> */}
      </motion.div>
      <div className="my-8 flex items-center justify-center">
        <Button variant={'outline'} className={cn('rounded-xl')}>
          Know more about me
        </Button>
      </div>
    </motion.div>
  );
};

export default AboutMe;
