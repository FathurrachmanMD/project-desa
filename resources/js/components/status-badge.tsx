import { Badge } from '@/components/ui/badge';
import { StatusType, statusConfig } from '@/data/business-permits';
import { EventStatusType, eventStatusConfig } from '@/data/event-permits';
import { BuildingStatusType, buildingStatusConfig } from '@/data/building-permits';
import { AgriculturalStatusType, agriculturalStatusConfig } from '@/data/agricultural-permits';
import { PersonalStatusType, personalStatusConfig } from '@/data/personal-permits';

interface StatusBadgeProps {
  status: StatusType | EventStatusType | BuildingStatusType | AgriculturalStatusType | PersonalStatusType;
  type?: 'business' | 'event' | 'building' | 'agricultural' | 'personal';
}

export function StatusBadge({ status, type = 'business' }: StatusBadgeProps) {
  let config;
  
  switch (type) {
    case 'event':
      config = eventStatusConfig[status as EventStatusType];
      break;
    case 'building':
      config = buildingStatusConfig[status as BuildingStatusType];
      break;
    case 'agricultural':
      config = agriculturalStatusConfig[status as AgriculturalStatusType];
      break;
    case 'personal':
      config = personalStatusConfig[status as PersonalStatusType];
      break;
    default:
      config = statusConfig[status as StatusType];
      break;
  }
  
  return (
    <Badge variant="outline" className={`px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
      {config.label}
    </Badge>
  );
}
