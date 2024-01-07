import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getRandomPatternStyle } from '@/lib/random-pattern';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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
          <CardDescription className="min-h-[2.5rem] max-h-[3rem]">
            {secondaryText}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

ProjectCard.Skeleton = function ProjectCardSkeleton(props: {
  pulse?: boolean;
  isAnalyticsCard?: boolean;
}) {
  const { pulse = true, isAnalyticsCard = false } = props;
  return (
    <Card>
      <div
        className={cn(
          'bg-muted',
          isAnalyticsCard ? 'h-10' : 'h-32',
          pulse && 'animate-pulse'
        )}
      />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className={cn('flex-1 bg-muted', pulse && 'animate-pulse')}>
            &nbsp;
          </span>
        </CardTitle>
        <CardDescription className={cn('bg-muted', pulse && 'animate-pulse')}>
          &nbsp;
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
