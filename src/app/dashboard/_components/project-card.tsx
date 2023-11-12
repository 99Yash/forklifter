import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRandomPatternStyle } from "@/lib/random-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ProjectCard(props: {
  primaryText: string;
  secondaryText: string;
  id: string;
}) {
  const { primaryText, secondaryText, id } = props;
  return (
    <Link href={`/`}>
      <Card className="overflow-hidden">
        <div className="h-32" style={getRandomPatternStyle(id)} />
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{primaryText}</span>
          </CardTitle>
          <CardDescription>{secondaryText}</CardDescription>
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
