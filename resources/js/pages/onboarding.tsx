import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { ChevronDown, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Onboarding() {
    return (
        <>
            <Head title="Selamat Datang - Desa Drawati">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen flex flex-col">
                {/* Hero Section */}
                <div 
                    className="relative min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url('/latar-onboard.png')`
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
                    <div className="flex-1 flex items-center">
                        <div className="text-left text-white px-6 max-w-4xl mx-auto z-10 ml-8 md:ml-16 lg:ml-24">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                Masuk sebagai Admin
                            </h1>
                            <p className="text-xl md:text-2xl mb-16 text-white/95 max-w-3xl leading-relaxed font-normal">
                                Silahkan login sebagai Admin untuk mengelola dan mengoptimalkan layanan digital Desa Drawati. 
                                Kelola perizinan, pantau aktivitas masyarakat, dan berikan pelayanan terbaik melalui 
                                platform yang mudah digunakan dan terintegrasi.
                            </p>
                            <Link href={route('login')}>
                                <Button 
                                    size="lg" 
                                    className="bg-[#33475B] hover:bg-[#2a3c4a] text-white px-16 py-8 text-xl font-semibold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl h-16"
                                >
                                    Masuk Sekarang
                                </Button>
                            </Link>
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
