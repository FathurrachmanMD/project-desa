import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/footer';
import { FadeInView, StaggerAnimation, StaggerItem, AnimatedCard, AnimatedButton, Typewriter } from '@/components/animations';
import { ChevronDown, Facebook, Instagram, Twitter, Youtube, Eye, EyeOff, Lock, User } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { motion } from 'framer-motion';

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
                    <motion.div 
                        className="relative z-20 w-full"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="flex justify-between items-center px-6 md:px-8 lg:px-12 py-6">
                            {/* Logo */}
                            <FadeInView direction="left" className="flex items-center space-x-3">
                                <motion.div 
                                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
                                    whileHover={{ 
                                        scale: 1.1, 
                                        rotate: [0, -10, 10, -10, 0],
                                        transition: { duration: 0.5 }
                                    }}
                                >
                                    <img 
                                        src="/logo-drawati.png" 
                                        alt="Logo Desa Drawati" 
                                        className="w-8 h-8 object-contain"
                                    />
                                </motion.div>
                                <div className="text-white">
                                    <h2 className="text-lg font-bold">Desa Drawati</h2>
                                    <p className="text-sm text-white/80">Kec. Passeh, Kab. Bandung</p>
                                </div>
                            </FadeInView>

                            {/* Social Media */}
                            <StaggerAnimation className="flex space-x-4" staggerDelay={0.1}>
                                <StaggerItem>
                                    <motion.a 
                                        href="#" 
                                        className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                                        whileHover={{ 
                                            scale: 1.2, 
                                            y: -5,
                                            rotate: 360,
                                            transition: { duration: 0.3 }
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </motion.a>
                                </StaggerItem>
                                <StaggerItem>
                                    <motion.a 
                                        href="#" 
                                        className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                                        whileHover={{ 
                                            scale: 1.2, 
                                            y: -5,
                                            rotate: -360,
                                            transition: { duration: 0.3 }
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Instagram className="w-5 h-5" />
                                    </motion.a>
                                </StaggerItem>
                                <StaggerItem>
                                    <motion.a 
                                        href="#" 
                                        className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                                        whileHover={{ 
                                            scale: 1.2, 
                                            y: -5,
                                            rotate: 360,
                                            transition: { duration: 0.3 }
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Twitter className="w-5 h-5" />
                                    </motion.a>
                                </StaggerItem>
                                <StaggerItem>
                                    <motion.a 
                                        href="#" 
                                        className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                                        whileHover={{ 
                                            scale: 1.2, 
                                            y: -5,
                                            rotate: -360,
                                            transition: { duration: 0.3 }
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Youtube className="w-5 h-5" />
                                    </motion.a>
                                </StaggerItem>
                            </StaggerAnimation>
                        </div>
                    </motion.div>

                    {/* Main Content */}
                    <div className="flex-1 flex items-center justify-center px-6">
                        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Side - Welcome Text */}
                            <FadeInView direction="left" delay={0.3} className="text-left text-white space-y-8">
                                <div>
                                    <Typewriter
                                        text="Selamat Datang Kembali"
                                        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                                        speed={100}
                                        delay={500}
                                    />
                                    <FadeInView delay={3} direction="up">
                                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-normal max-w-lg">
                                            Masuk ke dashboard admin untuk mengelola layanan digital Desa Drawati 
                                            dengan mudah dan efisien.
                                        </p>
                                    </FadeInView>
                                </div>
                                
                                <StaggerAnimation className="space-y-4" staggerDelay={0.2}>
                                    <StaggerItem>
                                        <motion.div 
                                            className="flex items-center space-x-3 text-white/80"
                                            whileHover={{ x: 10, transition: { duration: 0.2 } }}
                                        >
                                            <motion.div 
                                                className="w-2 h-2 bg-blue-400 rounded-full"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            ></motion.div>
                                            <span>Kelola perizinan masyarakat</span>
                                        </motion.div>
                                    </StaggerItem>
                                    <StaggerItem>
                                        <motion.div 
                                            className="flex items-center space-x-3 text-white/80"
                                            whileHover={{ x: 10, transition: { duration: 0.2 } }}
                                        >
                                            <motion.div 
                                                className="w-2 h-2 bg-green-400 rounded-full"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                                            ></motion.div>
                                            <span>Pantau aktivitas desa</span>
                                        </motion.div>
                                    </StaggerItem>
                                    <StaggerItem>
                                        <motion.div 
                                            className="flex items-center space-x-3 text-white/80"
                                            whileHover={{ x: 10, transition: { duration: 0.2 } }}
                                        >
                                            <motion.div 
                                                className="w-2 h-2 bg-yellow-400 rounded-full"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                                            ></motion.div>
                                            <span>Berikan pelayanan terbaik</span>
                                        </motion.div>
                                    </StaggerItem>
                                </StaggerAnimation>
                            </FadeInView>

                            {/* Right Side - Login Form */}
                            <FadeInView direction="right" delay={0.5} className="w-full max-w-md mx-auto lg:mx-0">
                                <AnimatedCard hover={false}>
                                    <Card className="backdrop-blur-md bg-white/95 border-0 shadow-2xl">
                                        <CardHeader className="space-y-4 pb-6">
                                            <FadeInView delay={0.8} className="text-center">
                                                <CardTitle className="text-2xl font-bold text-gray-900">
                                                    Admin Panel
                                                </CardTitle>
                                                <CardDescription className="text-gray-600 mt-2">
                                                    Masukkan kredensial Anda untuk melanjutkan
                                                </CardDescription>
                                            </FadeInView>
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
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <AnimatedButton
                                                    variant="glow"
                                                    type="submit"
                                                    disabled={processing}
                                                    className="relative overflow-hidden w-full bg-gradient-to-r from-[#33475B] via-[#3d5269] to-[#33475B] hover:from-[#2a3c4a] hover:via-[#344556] hover:to-[#2a3c4a] text-white h-12 text-base font-bold rounded-lg shadow-lg border border-white/10 transition-all duration-300 hover:shadow-xl group disabled:opacity-70 disabled:cursor-not-allowed"
                                                >
                                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                                        {processing ? (
                                                            <>
                                                                <motion.div 
                                                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                                    animate={{ rotate: 360 }}
                                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                />
                                                                Memproses...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Masuk
                                                                <motion.span
                                                                    animate={{ x: [0, 3, 0] }}
                                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                                >
                                                                    →
                                                                </motion.span>
                                                            </>
                                                        )}
                                                    </span>
                                                    {!processing && (
                                                        <motion.div
                                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                                            initial={{ x: '-100%' }}
                                                            whileHover={{ x: '100%' }}
                                                            transition={{ duration: 0.6 }}
                                                        />
                                                    )}
                                                </AnimatedButton>
                                            </motion.div>
                                        </form>

                                        {/* Additional Links */}
                                        <FadeInView delay={1.2} className="text-center pt-4 border-t border-gray-200">
                                            <p className="text-sm text-gray-600">
                                                Belum punya akses?{' '}
                                                <Link href={route('register')} className="text-[#33475B] hover:text-[#2a3c4a] font-medium hover:underline transition-all duration-200">
                                                    Daftar Sekarang
                                                </Link>
                                            </p>
                                        </FadeInView>
                                    </CardContent>
                                </Card>
                                </AnimatedCard>
                            </FadeInView>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div 
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 z-10"
                        animate={{ 
                            y: [0, -10, 0],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                    >
                        <ChevronDown className="w-6 h-6" />
                    </motion.div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
