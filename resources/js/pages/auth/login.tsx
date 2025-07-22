import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/footer';
import { ChevronDown, Facebook, Instagram, Twitter, Youtube, Eye, EyeOff, Lock, User } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login Admin - Desa Drawati">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen flex flex-col">
                {/* Hero Section with Login Form */}
                <div 
                    className="relative min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('/latar-onboard.png')`
                    }}
                >
                    {/* Header */}
                    <div className="relative z-20 w-full">
                        <div className="flex justify-between items-center px-6 md:px-8 lg:px-12 py-6">
                            {/* Logo */}
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                    <img 
                                        src="/logo-drawati.png" 
                                        alt="Logo Desa Drawati" 
                                        className="w-8 h-8 object-contain"
                                    />
                                </div>
                                <div className="text-white">
                                    <h2 className="text-lg font-bold">Desa Drawati</h2>
                                    <p className="text-sm text-white/80">Kec. Passeh, Kab. Bandung</p>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex items-center justify-center px-6">
                        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Side - Welcome Text */}
                            <div className="text-left text-white space-y-8">
                                <div>
                                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                        Selamat Datang Kembali
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/90 leading-relaxed font-normal max-w-lg">
                                        Masuk ke dashboard admin untuk mengelola layanan digital Desa Drawati 
                                        dengan mudah dan efisien.
                                    </p>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 text-white/80">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                        <span>Kelola perizinan masyarakat</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-white/80">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <span>Pantau aktivitas desa</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-white/80">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                        <span>Berikan pelayanan terbaik</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Login Form */}
                            <div className="w-full max-w-md mx-auto lg:mx-0">
                                <Card className="backdrop-blur-md bg-white/95 border-0 shadow-2xl">
                                    <CardHeader className="space-y-4 pb-6">
                                        <div className="text-center">
                                            <CardTitle className="text-2xl font-bold text-gray-900">
                                                Admin Panel
                                            </CardTitle>
                                            <CardDescription className="text-gray-600 mt-2">
                                                Masukkan kredensial Anda untuk melanjutkan
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    
                                    <CardContent className="space-y-6">
                                        {status && (
                                            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                                                {status}
                                            </div>
                                        )}

                                        <form onSubmit={submit} className="space-y-6">
                                            {/* Email Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                                    Email / Username
                                                </Label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        value={data.email}
                                                        className="pl-10 h-12 border-gray-200 focus:border-[#33475B] focus:ring-[#33475B] rounded-lg"
                                                        autoComplete="username"
                                                        placeholder="Masukkan email atau username"
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        required
                                                        autoFocus
                                                    />
                                                </div>
                                                {errors.email && (
                                                    <p className="text-red-600 text-sm">{errors.email}</p>
                                                )}
                                            </div>

                                            {/* Password Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                                    Password
                                                </Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="password"
                                                        value={data.password}
                                                        className="pl-10 pr-12 h-12 border-gray-200 focus:border-[#33475B] focus:ring-[#33475B] rounded-lg"
                                                        autoComplete="current-password"
                                                        placeholder="Masukkan password"
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="w-5 h-5" />
                                                        ) : (
                                                            <Eye className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                </div>
                                                {errors.password && (
                                                    <p className="text-red-600 text-sm">{errors.password}</p>
                                                )}
                                            </div>

                                            {/* Remember Me & Forgot Password */}
                                            <div className="flex items-center justify-between">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        name="remember"
                                                        checked={data.remember}
                                                        onChange={(e) => setData('remember', e.target.checked)}
                                                        className="rounded border-gray-300 text-[#33475B] focus:ring-[#33475B]"
                                                    />
                                                    <span className="text-sm text-gray-600">Ingat saya</span>
                                                </label>

                                                {canResetPassword && (
                                                    <Link
                                                        href={route('password.request')}
                                                        className="text-sm text-[#33475B] hover:text-[#2a3c4a] font-medium"
                                                    >
                                                        Lupa password?
                                                    </Link>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full bg-[#33475B] hover:bg-[#2a3c4a] text-white h-12 text-base font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                                            >
                                                {processing ? 'Memproses...' : 'Masuk'}
                                            </Button>
                                        </form>

                                        {/* Additional Links */}
                                        <div className="text-center pt-4 border-t border-gray-200">
                                            <p className="text-sm text-gray-600">
                                                Belum punya akses?{' '}
                                                <Link href="#" className="text-[#33475B] hover:text-[#2a3c4a] font-medium">
                                                    Hubungi Administrator
                                                </Link>
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce z-10">
                        <ChevronDown className="w-6 h-6" />
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
