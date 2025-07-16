import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { 
  LayoutDashboard, 
  FileText, 
  Building, 
  Hammer, 
  Calendar,
  User,
  Wheat,
  CheckCircle,
  Settings,
  Users,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  Plus
} from 'lucide-react';

interface MenuItem {
  key: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  badge?: string | number;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  key: string;
  label: string;
  path: string;
  badge?: string | number;
}

const VillageLetterSidebar = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedSubmenus, setExpandedSubmenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubmenu = (menuKey: string) => {
    setExpandedSubmenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      key: 'quick-actions',
      label: 'Aksi Cepat',
      icon: Plus,
      submenu: [
        { key: 'new-letter', label: 'Buat Surat Baru', path: '/letters/new' },
        { key: 'priority-queue', label: 'Antrian Prioritas', path: '/queue/priority', badge: 3 }
      ]
    },
    {
      key: 'verification',
      label: 'Verifikasi & Persetujuan',
      icon: CheckCircle,
      path: '/verification',
      badge: 12
    },
    {
      key: 'letters',
      label: 'Manajemen Surat',
      icon: FileText,
      submenu: [
        { key: 'all-letters', label: 'Semua Surat', path: '/letters' },
        { key: 'drafts', label: 'Draft', path: '/letters/drafts', badge: 5 },
        { key: 'pending', label: 'Menunggu Verifikasi', path: '/letters/pending', badge: 8 },
        { key: 'approved', label: 'Disetujui', path: '/letters/approved' },
        { key: 'rejected', label: 'Ditolak', path: '/letters/rejected' }
      ]
    },
    {
      key: 'business-permits',
      label: 'Perizinan Usaha',
      icon: Building,
      submenu: [
        { key: 'sku', label: 'Surat Keterangan Usaha', path: '/permits/business/sku' },
        { key: 'iumk', label: 'Izin Usaha Mikro Kecil', path: '/permits/business/iumk' },
        { key: 'situ', label: 'Surat Izin Tempat Usaha', path: '/permits/business/situ' },
        { key: 'nib', label: 'Rekomendasi NIB/OSS', path: '/permits/business/nib' }
      ]
    },
    {
      key: 'building-permits',
      label: 'Perizinan Bangunan',
      icon: Hammer,
      submenu: [
        { key: 'imb', label: 'Izin Mendirikan Bangunan', path: '/permits/building/imb' },
        { key: 'village-land', label: 'Izin Bangun di Lahan Desa', path: '/permits/building/village-land' },
        { key: 'no-dispute', label: 'Surat Tidak Sengketa Tanah', path: '/permits/building/no-dispute' },
        { key: 'renovation', label: 'Izin Renovasi/Perluasan', path: '/permits/building/renovation' }
      ]
    },
    {
      key: 'event-permits',
      label: 'Perizinan Keramaian',
      icon: Calendar,
      submenu: [
        { key: 'celebration', label: 'Surat Izin Hajatan', path: '/permits/event/celebration' },
        { key: 'public-event', label: 'Surat Izin Acara Publik', path: '/permits/event/public' },
        { key: 'facility-use', label: 'Izin Penggunaan Sarana Umum', path: '/permits/event/facility' }
      ]
    },
    {
      key: 'personal-permits',
      label: 'Perizinan Pribadi',
      icon: User,
      submenu: [
        { key: 'skck', label: 'Surat Pengantar SKCK', path: '/permits/personal/skck' },
        { key: 'domicile', label: 'Surat Keterangan Domisili', path: '/permits/personal/domicile' },
        { key: 'residence', label: 'Surat Izin Tinggal Pendatang', path: '/permits/personal/residence' },
        { key: 'travel', label: 'Surat Izin Keluar Negeri', path: '/permits/personal/travel' },
        { key: 'unemployment', label: 'Surat Keterangan Tidak Bekerja', path: '/permits/personal/unemployment' }
      ]
    },
    {
      key: 'agriculture-permits',
      label: 'Perizinan Pertanian',
      icon: Wheat,
      submenu: [
        { key: 'land-management', label: 'Izin Pengelolaan Lahan Desa', path: '/permits/agriculture/land' },
        { key: 'farming-support', label: 'Bantuan Pupuk/Bibit/Alat', path: '/permits/agriculture/support' },
        { key: 'farmer-certificate', label: 'Surat Keterangan Petani', path: '/permits/agriculture/certificate' },
        { key: 'irrigation', label: 'Izin Irigasi/Penggunaan Air', path: '/permits/agriculture/irrigation' }
      ]
    },
    {
      key: 'templates',
      label: 'Template Surat',
      icon: FileText,
      path: '/templates'
    },
    {
      key: 'users',
      label: 'Manajemen Pengguna',
      icon: Users,
      submenu: [
        { key: 'all-users', label: 'Semua Pengguna', path: '/users' },
        { key: 'roles', label: 'Manajemen Role', path: '/users/roles' },
        { key: 'permissions', label: 'Hak Akses', path: '/users/permissions' },
        { key: 'activity-log', label: 'Log Aktivitas', path: '/users/activity' }
      ]
    },
    {
      key: 'settings',
      label: 'Pengaturan',
      icon: Settings,
      submenu: [
        { key: 'general', label: 'Pengaturan Umum', path: '/settings/general' },
        { key: 'letter-config', label: 'Konfigurasi Surat', path: '/settings/letters' },
        { key: 'notifications', label: 'Notifikasi', path: '/settings/notifications' },
        { key: 'backup', label: 'Backup & Restore', path: '/settings/backup' }
      ]
    }
  ];

  const renderMenuItem = (item: MenuItem) => {
    const Icon = item.icon;
    const isActive = activeMenu === item.key;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedSubmenus[item.key];

    return (
      <div key={item.key} className="mb-1">
        <div
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
            isActive 
              ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => {
            if (hasSubmenu) {
              toggleSubmenu(item.key);
            } else {
              setActiveMenu(item.key);
            }
          }}
        >
          <div className="flex items-center flex-1">
            <Icon size={18} className="mr-3" />
            <span className="font-medium text-sm">{item.label}</span>
            {item.badge && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </div>
          {hasSubmenu && (
            <div className="ml-2">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
        </div>
        
        {hasSubmenu && isExpanded && item.submenu && (
          <div className="mt-1 ml-4 space-y-1">
            {item.submenu.map((subItem) => (
              <Link
                key={subItem.key}
                href={subItem.path}
                className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                  activeMenu === subItem.key
                    ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-400'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveMenu(subItem.key)}
              >
                <span className="text-sm">{subItem.label}</span>
                {subItem.badge && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {subItem.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen bg-white shadow-lg border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Sistem Surat Desa</h1>
        <p className="text-sm text-gray-600">Desa Contoh, Kecamatan ABC</p>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Cari surat atau menu..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-green-600 font-bold text-lg">24</div>
            <div className="text-green-700 text-xs">Surat Hari Ini</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="text-orange-600 font-bold text-lg">12</div>
            <div className="text-orange-700 text-xs">Perlu Verifikasi</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {menuItems.map(renderMenuItem)}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin Desa</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <Bell size={18} className="text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default VillageLetterSidebar;
