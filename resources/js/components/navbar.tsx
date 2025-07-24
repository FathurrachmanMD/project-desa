import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import clsx from 'clsx';

import type { NavigationItem } from '@/types/navigation';

const navigation: NavigationItem[] = [
    { name: 'Beranda', href: '/' },
    { 
        name: 'Perizinan', 
        items: [
            { name: 'Perizinan Pribadi', href: '/perizinan-pribadi' },
            { name: 'Perizinan Bangunan', href: '/perizinan-bangunan' },
            { name: 'Perizinan Acara', href: '/perizinan-acara' },
            { name: 'Perizinan Usaha', href: '/perizinan-usaha' },
            { name: 'Perizinan Pertanian', href: '/perizinan-pertanian' },
        ]
    },
    { name: 'Layanan', href: '/layanan' },
    { name: 'Tentang', href: '/tentang' },
];

export function Navbar() {
    const { user, isAuthenticated } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
            <nav className="container flex items-center justify-between py-4">
                <div className="flex items-center gap-x-8">
                    <Link href="/">
                        <img 
                            src="/logo-drawati.png" 
                            alt="Logo Desa Drawati" 
                            className="h-10 w-auto"
                        />
                    </Link>
                    <div className="hidden md:flex md:gap-x-6">
                        {navigation.map((item) => (
                            'items' in item ? (
                                <DropdownMenu key={item.name}>
                                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                        {item.name}
                                        <ChevronDown className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {item.items.map((subItem) => (
                                            <DropdownMenuItem key={subItem.name} asChild>
                                                <Link href={subItem.href} className="flex items-center gap-2">
                                                    {subItem.name}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-x-4">
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar>
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                                <DropdownMenuSeparator />
            
                                <DropdownMenuItem asChild>
                                    <Link href="/pengaturan">Pengaturan</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="text-red-600">
                                    <Link href="/logout" method="post" as="button">
                                        Keluar
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button asChild variant="ghost">
                                <Link href="/login">Masuk</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">Daftar</Link>
                            </Button>
                        </>
                    )}
                    <button
                        type="button"
                        className="md:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <div className={clsx(
                "fixed inset-0 z-50 bg-white md:hidden transform transition-transform duration-300 ease-in-out",
                mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
                <div className="container py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <img 
                                src="/logo-drawati.png" 
                                alt="Logo Desa Drawati" 
                                className="h-10 w-auto"
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-200">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6 space-y-3">
                                <Button 
                                    asChild 
                                    variant="ghost" 
                                    className="w-full justify-center"
                                >
                                    <Link href="/login">Masuk</Link>
                                </Button>
                                <Button 
                                    asChild 
                                    className="w-full justify-center"
                                >
                                    <Link href="/register">Daftar</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
