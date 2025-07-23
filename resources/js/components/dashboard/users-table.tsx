import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Edit, Trash2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  registrationDate: string;
  lastActivity: string;
}

const users: User[] = [
  {
    id: '1',
    name: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@email.com',
    phone: '+62 812-3456-7890',
    status: 'active',
    registrationDate: '2024-01-15',
    lastActivity: '2 jam lalu'
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@email.com',
    phone: '+62 813-2345-6789',
    status: 'active',
    registrationDate: '2024-01-10',
    lastActivity: '4 jam lalu'
  },
  {
    id: '3',
    name: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    phone: '+62 814-1234-5678',
    status: 'inactive',
    registrationDate: '2024-01-05',
    lastActivity: '2 hari lalu'
  },
  {
    id: '4',
    name: 'Maya Sari',
    email: 'maya.sari@email.com',
    phone: '+62 815-9876-5432',
    status: 'active',
    registrationDate: '2024-01-20',
    lastActivity: '1 hari lalu'
  },
  {
    id: '5',
    name: 'Andi Pratama',
    email: 'andi.pratama@email.com',
    phone: '+62 816-5432-1098',
    status: 'active',
    registrationDate: '2024-01-25',
    lastActivity: '6 jam lalu'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'inactive':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'Aktif';
    case 'inactive':
      return 'Tidak Aktif';
    default:
      return status;
  }
};

export function UsersTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Daftar Pengguna Terbaru</h3>
        <Button variant="outline" size="sm">
          Lihat Semua
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telepon</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aktivitas Terakhir</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Bergabung: {new Date(user.registrationDate).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getStatusColor(user.status)}`}
                  >
                    {getStatusText(user.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.lastActivity}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
