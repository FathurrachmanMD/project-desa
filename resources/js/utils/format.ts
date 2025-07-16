// Utility functions untuk format data
// Fungsi bantuan untuk memformat angka, tanggal, dan data lainnya

export function formatNumber(num: number): string {
    return new Intl.NumberFormat('id-ID').format(num);
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

export function formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function formatDateTime(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function formatRelativeTime(date: string | Date): string {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
        return `${days} hari yang lalu`;
    } else if (hours > 0) {
        return `${hours} jam yang lalu`;
    } else if (minutes > 0) {
        return `${minutes} menit yang lalu`;
    } else {
        return 'Baru saja';
    }
}

export function formatFileSize(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = bytes / Math.pow(1024, i);
    
    return `${size.toFixed(1)} ${sizes[i]}`;
}

export function truncateText(text: string, length: number = 50): string {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

export function generateNomorPengajuan(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const timestamp = now.getTime().toString().slice(-6);
    
    return `PGJ-${year}${month}${day}-${timestamp}`;
}

export function generateNomorSurat(kode: string): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const timestamp = now.getTime().toString().slice(-4);
    
    return `${kode}-${timestamp}/${month}/${year}`;
}

export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        'draft': 'bg-gray-100 text-gray-800',
        'menunggu_verifikasi': 'bg-yellow-100 text-yellow-800',
        'disetujui': 'bg-green-100 text-green-800',
        'ditolak': 'bg-red-100 text-red-800',
        'revisi': 'bg-blue-100 text-blue-800'
    };
    
    return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
        'draft': 'Draft',
        'menunggu_verifikasi': 'Menunggu Verifikasi',
        'disetujui': 'Disetujui',
        'ditolak': 'Ditolak',
        'revisi': 'Perlu Revisi'
    };
    
    return labels[status] || status;
}

export function getPrioritasColor(prioritas: string): string {
    const colors: Record<string, string> = {
        'rendah': 'bg-green-100 text-green-800',
        'normal': 'bg-blue-100 text-blue-800',
        'tinggi': 'bg-yellow-100 text-yellow-800',
        'urgent': 'bg-red-100 text-red-800'
    };
    
    return colors[prioritas] || 'bg-blue-100 text-blue-800';
}

export function getPrioritasLabel(prioritas: string): string {
    const labels: Record<string, string> = {
        'rendah': 'Rendah',
        'normal': 'Normal',
        'tinggi': 'Tinggi',
        'urgent': 'Urgent'
    };
    
    return labels[prioritas] || prioritas;
}

export function validateNIK(nik: string): boolean {
    // NIK harus 16 digit
    if (!/^\d{16}$/.test(nik)) {
        return false;
    }
    
    // Validasi format NIK (sederhana)
    const provinsi = nik.substring(0, 2);
    const kabupaten = nik.substring(2, 4);
    const kecamatan = nik.substring(4, 6);
    const tanggal = nik.substring(6, 8);
    const bulan = nik.substring(8, 10);
    // const tahun = nik.substring(10, 12); // Tidak digunakan untuk validasi sederhana
    
    // Cek rentang nilai
    if (parseInt(provinsi) < 11 || parseInt(provinsi) > 91) return false;
    if (parseInt(kabupaten) < 1 || parseInt(kabupaten) > 99) return false;
    if (parseInt(kecamatan) < 1 || parseInt(kecamatan) > 99) return false;
    
    // Cek tanggal (40+ untuk perempuan)
    const tgl = parseInt(tanggal);
    if (tgl < 1 || (tgl > 31 && tgl < 40) || tgl > 71) return false;
    
    // Cek bulan
    const bln = parseInt(bulan);
    if (bln < 1 || bln > 12) return false;
    
    return true;
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
    // Format telepon Indonesia
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function randomColor(): string {
    const colors = [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
        '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

export function downloadFile(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}
