"use client"

import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Intro from "./intro";
import { CreateProject } from "./create-project";
import { Done } from './done';
import { CreateApiKey } from "./create-api-key";

export function Onboarding() {
  const search = useSearchParams();
  const step = search.get("step");

  return (
    <div className="mx-auto flex h-[calc(100vh-14rem)] w-full max-w-screen-sm flex-col items-center">
      <AnimatePresence mode="wait">
        {!step && <Intro key="intro" />}
        {step === "create-project" && (
          <CreateProject />
        )}
        {step === "create-api-key" && <CreateApiKey />}
        {step === "done" && <Done />}
      </AnimatePresence>
    </div>
  );
}