import { Badge } from '@/components/ui/badge';

type BadgeProps = {
  status: String;
}

export function StatusBadge({ status }: BadgeProps) {  
  const color = status == 'diproses' ? 'bg-yellow-400' : (status == 'disetujui' ? 'bg-green-500' : (status == 'ditolak' ? 'bg-destructive' : ''));
  return (
    <Badge variant="outline" className={`px-2.5 py-0.5 text-xs font-medium ${color}`}>
      {status.toUpperCase()}
    </Badge>
  );
}
