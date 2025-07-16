import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { 
    Home, 
    FileText, 
    FolderOpen, 
    Users, 
    Settings, 
    Bell, 
    Search,
    Menu,
    X,
    ChevronDown,
    LogOut,
    User as UserIcon,
    BarChart3,
    ClipboardList,
    FileCheck,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { type User } from '@/types';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
    children: React.ReactNode;
    user: User;
    notifications?: {
        total: number;
        unread: number;
    };
}

interface NavItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    children?: NavItem[];
}

export default function AdminLayout({ children, user, notifications }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    const navigationItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: Home
        },
        {
            title: 'Pengajuan Surat',
            href: '/pengajuan',
            icon: FileText,
            badge: notifications?.unread.toString(),
            children: [
                { title: 'Semua Pengajuan', href: '/pengajuan', icon: ClipboardList },
                { title: 'Menunggu Verifikasi', href: '/pengajuan?status=menunggu_verifikasi', icon: Clock },
                { title: 'Disetujui', href: '/pengajuan?status=disetujui', icon: CheckCircle },
                { title: 'Ditolak', href: '/pengajuan?status=ditolak', icon: XCircle },
                { title: 'Perlu Revisi', href: '/pengajuan?status=revisi', icon: AlertTriangle },
            ]
        },
        {
            title: 'Manajemen Surat',
            href: '/surat',
            icon: FolderOpen,
            children: [
                { title: 'Kategori Surat', href: '/kategori-surat', icon: FolderOpen },
                { title: 'Jenis Surat', href: '/jenis-surat', icon: FileText },
                { title: 'Template Surat', href: '/template-surat', icon: FileCheck },
            ]
        },
        {
            title: 'Pemohon',
            href: '/pemohon',
            icon: Users
        },
        {
            title: 'Laporan',
            href: '/laporan',
            icon: BarChart3,
            children: [
                { title: 'Statistik', href: '/laporan/statistik', icon: BarChart3 },
                { title: 'Laporan Bulanan', href: '/laporan/bulanan', icon: FileText },
                { title: 'Laporan Tahunan', href: '/laporan/tahunan', icon: FileText },
            ]
        },
        {
            title: 'Pengaturan',
            href: '/settings',
            icon: Settings,
            children: [
                { title: 'Pengaturan Sistem', href: '/settings/sistem', icon: Settings },
                { title: 'Manajemen User', href: '/settings/users', icon: Users },
                { title: 'Log Aktivitas', href: '/settings/logs', icon: Eye },
            ]
        }
    ];

    const isActive = (href: string) => {
        return currentPath === href || currentPath.startsWith(href + '/');
    };

    const handleLogout = () => {
        if (confirm('Apakah Anda yakin ingin logout?')) {
            router.post('/logout');
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/search', { q: searchQuery });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                        <Link href="/dashboard" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900 ">
                                Admin Surat
                            </span>
                        </Link>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                        {navigationItems.map((item) => (
                            <div key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                        isActive(item.href)
                                            ? "bg-blue-100 text-blue-700  "
                                            : "text-gray-700 hover:bg-gray-100  "
                                    )}
                                >
                                    <div className="flex items-center space-x-3">
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.title}</span>
                                    </div>
                                    {item.badge && (
                                        <Badge variant="secondary" className="ml-2">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </Link>
                                
                                {/* Submenu */}
                                {item.children && isActive(item.href) && (
                                    <div className="ml-6 mt-2 space-y-1">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className={cn(
                                                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                                                    isActive(child.href)
                                                        ? "bg-blue-50 text-blue-600 /50 "
                                                        : "text-gray-600 hover:bg-gray-50  /50"
                                                )}
                                            >
                                                <child.icon className="w-4 h-4" />
                                                <span>{child.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* User Info */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start">
                                    <div className="flex items-center space-x-3">
                                        <Avatar>
                                            <AvatarFallback>
                                                {user.name.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 text-left">
                                            <p className="text-sm font-medium text-gray-900 ">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500 ">
                                                {user.email}
                                            </p>
                                        </div>
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">
                                        <UserIcon className="w-4 h-4 mr-2" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Pengaturan
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden"
                            >
                                <Menu className="w-5 h-5" />
                            </Button>
                            
                            {/* Search */}
                            <form onSubmit={handleSearch} className="hidden md:block">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        type="search"
                                        placeholder="Cari pengajuan, pemohon, atau surat..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 w-96"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Notifications */}
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/notifications">
                                    <div className="relative">
                                        <Bell className="w-5 h-5" />
                                        {notifications && notifications.unread > 0 && (
                                            <Badge 
                                                variant="destructive" 
                                                className="absolute -top-2 -right-2 text-xs min-w-[1.25rem] h-5 flex items-center justify-center"
                                            >
                                                {notifications.unread}
                                            </Badge>
                                        )}
                                    </div>
                                </Link>
                            </Button>

                            {/* User Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <Avatar>
                                            <AvatarFallback>
                                                {user.name.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile">
                                            <UserIcon className="w-4 h-4 mr-2" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings">
                                            <Settings className="w-4 h-4 mr-2" />
                                            Pengaturan
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="min-h-[calc(100vh-4rem)]">
                    {children}
                </main>
            </div>
        </div>
    );
}
