import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface RecentActivity {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
    initials: string;
  };
  activity: string;
  type: 'perizinan' | 'kegiatan' | 'customer';
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  time: string;
}

const recentActivities: RecentActivity[] = [
  {
    id: '1',
    user: {
      name: 'Ahmad Fauzi',
      email: 'ahmad.fauzi@email.com',
      initials: 'AF'
    },
    activity: 'Mengajukan Izin Mendirikan Bangunan',
    type: 'perizinan',
    status: 'pending',
    time: '2 jam lalu'
  },
  {
    id: '2',
    user: {
      name: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@email.com',
      initials: 'SN'
    },
    activity: 'Mendaftar sebagai Customer',
    type: 'customer',
    status: 'completed',
    time: '4 jam lalu'
  },
  {
    id: '3',
    user: {
      name: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      initials: 'BS'
    },
    activity: 'Mengajukan Izin Kegiatan Sosial',
    type: 'kegiatan',
    status: 'approved',
    time: '6 jam lalu'
  },
  {
    id: '4',
    user: {
      name: 'Maya Sari',
      email: 'maya.sari@email.com',
      initials: 'MS'
    },
    activity: 'Mengajukan Izin Pribadi',
    type: 'perizinan',
    status: 'completed',
    time: '8 jam lalu'
  },
  {
    id: '5',
    user: {
      name: 'Andi Pratama',
      email: 'andi.pratama@email.com',
      initials: 'AP'
    },
    activity: 'Update Profil Customer',
    type: 'customer',
    status: 'completed',
    time: '1 hari lalu'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'approved':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'completed':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Menunggu';
    case 'approved':
      return 'Disetujui';
    case 'rejected':
      return 'Ditolak';
    case 'completed':
      return 'Selesai';
    default:
      return status;
  }
};

export function RecentActivities() {
  return (
    <div className="space-y-6">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">
                {activity.user.name}
              </p>
              <Badge 
                variant="secondary" 
                className={`text-xs ${getStatusColor(activity.status)}`}
              >
                {getStatusText(activity.status)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {activity.activity}
            </p>
            <p className="text-xs text-muted-foreground">
              {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
