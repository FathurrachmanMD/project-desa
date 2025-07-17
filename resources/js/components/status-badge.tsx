import { Badge } from '@/components/ui/badge';
import { StatusType, statusConfig } from '@/data/business-permits';

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant="outline" className={`px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
      {config.label}
    </Badge>
  );
}
