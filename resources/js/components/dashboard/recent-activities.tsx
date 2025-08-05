import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/status-badge";
import { Surat } from "@/types/surat";

// Helper function to format date
const formatTimeAgo = (dateString: any): String => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays > 0) {
    return `${diffInDays} hari lalu`;
  } else if (diffInHours > 0) {
    return `${diffInHours} jam lalu`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} menit lalu`;
  } else {
    return 'Baru saja';
  }
};

// Helper function to get initials from a name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

export function RecentActivities({activities}: {activities: Surat[]}) {
  return (
    <div className="space-y-6">
      {activities.map(surat => (
        <div key={surat.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{getInitials(surat.form.nama)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">
                {surat.form.nama}
              </p>
              <StatusBadge 
                status={surat.status}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {surat.format.nama}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatTimeAgo(surat.created_at)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
