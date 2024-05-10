'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

export default function Work() {
  const contRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contRef, { once: false, margin: '-100px' });

  return (
    <motion.div
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={contRef}
      transition={{
        duration: 0.5,
      }}
      id="experiences"
      className="my-24 will-change-[transform,opacity]"
    >
      <motion.h2
        className="text-center font-title text-3xl font-bold sm:text-4xl bg-gradient-to-t from-slate-200 to-slate-500 bg-clip-text text-transparent my-12"
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
        Recent Work
      </motion.h2>
    </motion.div>
  );
}
