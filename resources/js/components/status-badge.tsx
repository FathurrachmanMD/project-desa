import { Badge } from '@/components/ui/badge';
import { StatusType, statusConfig } from '@/data/business-permits';
import { EventStatusType, eventStatusConfig } from '@/data/event-permits';

interface StatusBadgeProps {
  status: StatusType | EventStatusType;
  type?: 'business' | 'event';
}

export function StatusBadge({ status, type = 'business' }: StatusBadgeProps) {
  const config = type === 'event' 
    ? eventStatusConfig[status as EventStatusType]
    : statusConfig[status as StatusType];
  
  return (
    <Badge variant="outline" className={`px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
      {config.label}
    </Badge>
  );
}
