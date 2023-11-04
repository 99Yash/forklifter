import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getRandomPatternStyle } from "@/lib/random-pattern";
import { cn } from "@/lib/utils";
import { type Project } from "@prisma/client";
import Link from "next/link";

export function ProjectCard(props: { project: Project }) {
  const { project } = props;
  return (
    <Link href={`/`}>
      <Card className="overflow-hidden">
        <div className="h-32" style={getRandomPatternStyle(project.id)} />
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{project.name}</span>
          </CardTitle>
          <CardDescription>{project.webUrl}&nbsp;</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

ProjectCard.Skeleton = function ProjectCardSkeleton(props: {
  pulse?: boolean;
}) {
  const { pulse = true } = props;
  return (
    <Card>
      <div className={cn("h-32 bg-muted", pulse && "animate-pulse")} />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className={cn("flex-1 bg-muted", pulse && "animate-pulse")}>
            &nbsp;
          </span>
        </CardTitle>
        <CardDescription className={cn("bg-muted", pulse && "animate-pulse")}>
          &nbsp;
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
