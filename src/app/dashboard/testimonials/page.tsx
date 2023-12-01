import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/authOpts";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { ProjectCard } from "../_components/project-card";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `Add or edit testimonials here.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect("/");

  const testimonials = await prisma.testimonial.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Testimonials</h2>
          <p className="text-muted-foreground">
            Add testimonials from your previous employer or any other authority.
          </p>
        </div>
        {/* <AddTestimonial /> */}
            <Link className={cn(buttonVariants({variant:"default",className:"min-w-max"}))} href={`/onboarding`}>Add a Testimonial</Link>

      </div>

     {testimonials.length ===0 ? <div className="relative">
        <ul className="grid select-none grid-cols-1 gap-4 opacity-40 md:grid-cols-3">
          <ProjectCard.Skeleton pulse={false} />
          <ProjectCard.Skeleton pulse={false} />
          <ProjectCard.Skeleton pulse={false} />
        </ul>
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-2xl font-bold">
            <Balancer>You&apos;ve zero testimonials.</Balancer>
          </h2>
          <p className="text-md text-muted-foreground">
            <Balancer>
              If you have prior experience or collaborations, do consider asking
              for one.
            </Balancer>
          </p>
        </div>
      </div>:(
         <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
         {testimonials.map((testimonial) => (
           <li key={testimonial.id}>
             <ProjectCard
               id={testimonial.id}
               primaryText={testimonial.author}
               secondaryText={testimonial.designation}
             />
           </li>
          )
          )}</ul>)}
    </div>
  );
};

export default page;
