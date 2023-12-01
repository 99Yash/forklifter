"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Balancer } from "react-wrap-balancer";
import { CreateProjectForm } from "./create-project-form";

export function CreateProject() {
  const router = useRouter();

  return (
    <motion.div
      className="my-auto flex h-full w-full flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <motion.div
        variants={{
          show: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="flex flex-col rounded-xl bg-background/60 p-8"
      >
        <motion.h1
          className="mb-4 font-cal text-2xl font-bold transition-colors sm:text-3xl"
          variants={{
            hidden: { opacity: 0, x: 250 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.4, type: "spring" },
            },
          }}
        >
          <Balancer>
            {`Let's start off by creating your first testimonial`}
          </Balancer>
        </motion.h1>
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.4, type: "spring" },
            },
          }}
        >
          <CreateProjectForm
            onSuccess={({ id }) => {
              const searchParams = new URLSearchParams(window.location.search);
              searchParams.set("step", "create-api-key");
              searchParams.set("projectId", id);
              router.push(`/onboarding?${searchParams.toString()}`);
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}