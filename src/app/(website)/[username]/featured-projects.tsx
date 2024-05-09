'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { BlurImage } from '../utils/blur-image';
import { placeholderImgs } from '../utils/palceholder-images';

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
  projects: {
    name: string;
    githubUrl: string;
    description: string;
    webUrl: string;
    techStack: string[];
  }[];
};

export default function FeaturedProjects({ projects }: Props) {
  const projectsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' });
  const [ogImageUrls, setOgImageUrls] = useState<Array<string>>([]);

  // useEffect(() => {
  //   const fetchOgImages = async () => {
  //     const usedPlaceholders = new Set<string>();
  //     for (const project of projects) {
  //       let ogImageUrl =
  //         (await getOgImageUrl(project.webUrl)) ??
  //         (await getOgImageUrl(project.githubUrl));
  //       if (!ogImageUrl) {
  //         let placeholderUrl: string | null = null;
  //         do {
  //           placeholderUrl =
  //             placeholderImgs[
  //               Math.floor(Math.random() * placeholderImgs.length)
  //             ];
  //         } while (usedPlaceholders.has(placeholderUrl));

  //         if (placeholderUrl) {
  //           usedPlaceholders.add(placeholderUrl);
  //           ogImageUrl = placeholderUrl;
  //         }
  //         setOgImageUrls((prev) => [...prev, placeholderUrl]);
  //       }
  //     }
  //     setOgImageUrls((prev) => [...prev, ogImageUrl]);
  //   };

  //   fetchOgImages();
  // }, [projects]);

  return (
    <motion.div
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={projectsRef}
      transition={{
        duration: 0.5,
      }}
      className="will-change-[transform,opacity]"
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
        Featured Projects
      </motion.h2>
      <motion.div
        className="mt-12 gap-4 grid md:grid-cols-2"
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
        {projects.map((project, i) => (
          <div
            key={i}
            className="group rounded-xl px-2 py-4 shadow-feature-card-dark"
          >
            <BlurImage
              src={
                ogImageUrls[i] ??
                placeholderImgs[
                  Math.floor(Math.random() * placeholderImgs.length)
                ]
              }
              width={1280}
              height={832}
              imageClassName="group-hover:scale-105"
              alt={''}
              className="rounded-lg"
            />
            <div className="flex-1 px-2 py-4 flex flex-col justify-between gap-3">
              <div className="space-y-2 flex flex-col justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-br from-slate-200 to-slate-700 bg-clip-text text-transparent">
                  {project.name}
                </h2>
                <p className="text-muted-foreground text-sm font-medium">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack
                  .sort((a, b) => a.localeCompare(b))
                  .map((t, index) => {
                    if (index < 5) {
                      return (
                        <div
                          key={Math.random()}
                          className="rounded-lg px-1 py-2 text-xs leading-4 bg-zinc-950"
                        >
                          {t}
                        </div>
                      );
                    } else if (index === 5) {
                      const remaining = project.techStack.length - 5;
                      return (
                        <Dialog key={Math.random()}>
                          <DialogTrigger asChild>
                            <button className="inline-flex animate-background-shine items-center justify-center rounded-lg text-xs border border-neutral-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] p-1 font-medium text-neutral-400 transition-colors">
                              + {remaining} more...
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="text-lg font-bold">
                                Tech Stack
                              </DialogTitle>
                              <DialogDescription>
                                All Tech used for {project.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.map((t, index) => {
                                return (
                                  <div
                                    key={Math.random()}
                                    className="rounded-lg px-1 py-2 text-xs leading-4 bg-zinc-950"
                                  >
                                    {t}
                                  </div>
                                );
                              })}
                            </div>
                          </DialogContent>
                        </Dialog>
                      );
                    }
                    return null;
                  })}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
