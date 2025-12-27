import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as Icons from '@/components/ui/icons';
import { Tip } from './tooltip';

type AnalyticsCardProps = {
  title: string;
  description: string;
  value: number | string;
};

export default function InsightCard({
  title,
  description,
  value,
}: AnalyticsCardProps) {
  return (
    <Card className="overflow-hidden h-full">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center justify-between">
          <span className=" text-card-foreground font-title">{title}</span>
          <Tip tip={description}>
            <Icons.Help className="h-[14px] w-[14px]" />
          </Tip>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold">{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
