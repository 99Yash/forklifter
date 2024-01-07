import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ReactNode } from 'react';

export const Tip = ({
  children,
  tip,
}: {
  children: ReactNode;
  tip: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="cursor-pointer" asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-gray-900 text-foreground border border-border">
          {tip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
