import { getCurrentUser } from "@/lib/authOpts";
import { redirect } from "next/navigation";
import { Onboarding } from "./multi-step-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding",
  description: `Add a new Testimonial.`,
};
export default async function OnboardingPage() {
  const user = await getCurrentUser();
  if (!user) return redirect("/");
  return (
    <main className="min-h-[calc(100vh-14rem)] flex-1 space-y-4 p-8 pt-6">
      <Onboarding  />
      <div className="absolute inset-0 top-12 -z-10 bg-cover bg-center" />
    </main>
  );
}