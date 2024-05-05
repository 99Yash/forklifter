import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getRandomPatternStyle } from '@/lib/random-pattern';
import { cn } from '@/lib/utils';

export function ProjectCard(props: {
  primaryText: string;
  secondaryText: string;
  id: string;
}) {
  const { primaryText, secondaryText, id } = props;
  return (
    <Card className="overflow-hidden cursor-pointer">
      <div className="h-32 line-clamp-3" style={getRandomPatternStyle(id)} />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{primaryText}</span>
        </CardTitle>
        <CardDescription
          className={`min-h-[2.5rem] max-h-[2.8rem] line-clamp-3`}
        >
          {secondaryText}
        </CardDescription>
      </CardHeader>
    </Card>
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
