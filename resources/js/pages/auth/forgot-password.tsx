import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/footer';
import { ChevronDown, Facebook, Instagram, Twitter, Youtube, Mail, ArrowLeft, Shield, Clock, CheckCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Reset Password - Desa Drawati">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen flex flex-col">
                {/* Hero Section with Reset Form */}
                <div 
                    className="relative min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.35)), url('/latar-onboard.png')`
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
                            {/* Left Side - Information */}
                            <div className="text-left text-white space-y-8">
                                <div>
                                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                        Reset Password
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/90 leading-relaxed font-normal max-w-lg">
                                        Jangan khawatir! Kami akan mengirimkan link reset password ke email Anda 
                                        untuk memulihkan akses ke dashboard admin.
                                    </p>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4 text-white/80">
                                        <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                            <Mail className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Cek Email Anda</h3>
                                            <p className="text-white/70">Kami akan mengirim link reset password ke alamat email yang terdaftar</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-4 text-white/80">
                                        <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                            <Shield className="w-6 h-6 text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Aman & Terpercaya</h3>
                                            <p className="text-white/70">Link reset password akan kadaluarsa dalam 1 jam untuk keamanan akun</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 text-white/80">
                                        <div className="w-12 h-12 bg-purple-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                            <Clock className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Proses Cepat</h3>
                                            <p className="text-white/70">Email akan dikirim dalam beberapa menit setelah permintaan</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Reset Form */}
                            <div className="w-full max-w-md mx-auto lg:mx-0">
                                <Card className="backdrop-blur-md bg-white/95 border-0 shadow-2xl">
                                    <CardHeader className="space-y-4 pb-6">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gradient-to-br from-[#33475B] to-[#2a3c4a] rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Mail className="w-8 h-8 text-white" />
                                            </div>
                                            <CardTitle className="text-2xl font-bold text-gray-900">
                                                Reset Password
                                            </CardTitle>
                                            <CardDescription className="text-gray-600 mt-2">
                                                Masukkan email Anda dan kami akan mengirim link reset password
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    
                                    <CardContent className="space-y-6">
                                        {status && (
                                            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-4 rounded-lg text-sm flex items-center space-x-3">
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium">Email terkirim!</p>
                                                    <p className="text-green-700">{status}</p>
                                                </div>
                                            </div>
                                        )}

                                        <form onSubmit={submit} className="space-y-6">
                                            {/* Email Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                                    Alamat Email
                                                </Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        value={data.email}
                                                        className="pl-10 h-12 border-gray-200 focus:border-[#33475B] focus:ring-[#33475B] rounded-lg"
                                                        autoComplete="email"
                                                        placeholder="admin@desadrawati.id"
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        required
                                                        autoFocus
                                                    />
                                                </div>
                                                {errors.email && (
                                                    <p className="text-red-600 text-sm flex items-center space-x-1">
                                                        <span>⚠️</span>
                                                        <span>{errors.email}</span>
                                                    </p>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full bg-[#33475B] hover:bg-[#2a3c4a] text-white h-12 text-base font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                                            >
                                                {processing ? (
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        <span>Mengirim Email...</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-2">
                                                        <Mail className="w-5 h-5" />
                                                        <span>Kirim Link Reset</span>
                                                    </div>
                                                )}
                                            </Button>
                                        </form>

                                        {/* Back to Login */}
                                        <div className="text-center pt-4 border-t border-gray-200">
                                            <p className="text-sm text-gray-600 mb-3">
                                                Sudah ingat password Anda?
                                            </p>
                                            <Link 
                                                href={route('login')}
                                                className="inline-flex items-center space-x-2 text-[#33475B] hover:text-[#2a3c4a] font-medium transition-colors duration-200"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                                <span>Kembali ke Login</span>
                                            </Link>
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
