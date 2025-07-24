import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/status-badge";

// Import all permit data
import { hajatnData, acaraPublikData, saranaUmumData } from '@/data/event-permits';
import { imbData, lahanDesaData, tidakSengketaData, renovasiData } from '@/data/building-permits';
import { 
  pengantarSKCKData, 
  keteranganDomisiliData, 
  izinTinggalPendatangData, 
  izinKeluarNegeriData,
  keteranganTidakBekerjaData
} from '@/data/personal-permits';
import { skuData, iumkData, situData, nibData } from '@/data/business-permits';
import { 
  pengelolaanLahanData,
  permohonanBantuanData,
  suratKeteranganPetaniData,
  suratIzinIrigasiData
} from '@/data/agricultural-permits';

// Define a common interface for all permit types
interface PermitBase {
  id: string;
  tanggal_pengajuan: string;
  status: string;
}

// Define the interface for our activity items
interface ActivityItem {
  id: string;
  name: string;
  initials: string;
  activity: string;
  type: 'event' | 'building' | 'personal' | 'business' | 'agricultural';
  status: string;
  time: string;
  date: Date; // Add actual date for proper sorting
}

// Helper function to format date
const formatTimeAgo = (dateString: string): string => {
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

// Get all activities from different permit types
const generateActivities = (): ActivityItem[] => {
  const activities: ActivityItem[] = [];
  
  // Event permits
  hajatnData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Izin Hajatan ${item.jenis_acara}`,
      type: 'event',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  acaraPublikData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_penyelenggara,
      initials: getInitials(item.nama_penyelenggara),
      activity: `Mengajukan Izin Acara ${item.nama_acara}`,
      type: 'event',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  saranaUmumData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Izin Penggunaan Sarana Umum: ${item.jenis_fasilitas}`,
      type: 'event',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  // Building permits
  imbData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Izin Mendirikan Bangunan (${item.jenis_bangunan})`,
      type: 'building',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  lahanDesaData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Izin Bangun di Lahan Desa: ${item.nama_lahan}`,
      type: 'building',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  tidakSengketaData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemilik_tanah,
      initials: getInitials(item.nama_pemilik_tanah),
      activity: `Mengajukan Surat Tidak Sengketa Tanah di ${item.lokasi_tanah}`,
      type: 'building',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  renovasiData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemilik,
      initials: getInitials(item.nama_pemilik),
      activity: `Mengajukan Izin Renovasi ${item.jenis_renovasi}`,
      type: 'building',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  // Personal permits
  pengantarSKCKData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Surat Pengantar SKCK untuk ${item.tujuan_skck}`,
      type: 'personal',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  keteranganDomisiliData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_warga,
      initials: getInitials(item.nama_warga),
      activity: `Mengajukan Surat Keterangan Domisili`,
      type: 'personal',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  izinTinggalPendatangData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pendatang,
      initials: getInitials(item.nama_pendatang),
      activity: `Mengajukan Izin Tinggal Pendatang`,
      type: 'personal',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  izinKeluarNegeriData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Izin Keluar Negeri ke ${item.negara_tujuan}`,
      type: 'personal',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  keteranganTidakBekerjaData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Surat Keterangan Tidak Bekerja`,
      type: 'personal',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  // Business permits
  skuData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Surat Keterangan Usaha: ${item.nama_usaha}`,
      type: 'business',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  iumkData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Izin Usaha Mikro Kecil: ${item.nama_usaha}`,
      type: 'business',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  situData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Surat Izin Tempat Usaha`,
      type: 'business',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  nibData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Rekomendasi NIB: ${item.nama_usaha}`,
      type: 'business',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  // Agricultural permits
  pengelolaanLahanData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Izin Pengelolaan Lahan di ${item.lokasi_lahan}`,
      type: 'agricultural',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  permohonanBantuanData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Permohonan Bantuan: ${item.jenis_bantuan}`,
      type: 'agricultural',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  suratKeteranganPetaniData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama,
      initials: getInitials(item.nama),
      activity: `Mengajukan Surat Keterangan Petani`,
      type: 'agricultural',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  suratIzinIrigasiData.forEach(item => {
    const date = new Date(item.tanggal_pengajuan);
    activities.push({
      id: item.id,
      name: item.nama_pemohon,
      initials: getInitials(item.nama_pemohon),
      activity: `Mengajukan Surat Izin Irigasi: ${item.sumber_air}`,
      type: 'agricultural',
      status: item.status,
      time: formatTimeAgo(item.tanggal_pengajuan),
      date: date
    });
  });
  
  // Sort by date (most recent first) and take only the most recent 10 activities
  return activities.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10);
};

const recentActivities = generateActivities();

export function RecentActivities() {
  return (
    <div className="space-y-6">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{activity.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">
                {activity.name}
              </p>
              <StatusBadge 
                status={activity.status as 'Diproses' | 'Disetujui' | 'Ditolak'} 
                type={activity.type} 
              />
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
