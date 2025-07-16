-- Database untuk Sistem Admin Surat Desa
-- Dibuat untuk mengelola berbagai jenis perizinan dan surat keterangan desa
-- Author: GitHub Copilot
-- Date: July 16, 2025

-- Tabel untuk kategori surat
CREATE TABLE kategori_surat (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL COMMENT 'Nama kategori surat (Perizinan Usaha, Perizinan Bangunan, dll)',
    deskripsi TEXT COMMENT 'Deskripsi kategori surat',
    icon VARCHAR(50) COMMENT 'Icon untuk kategori',
    warna VARCHAR(20) DEFAULT '#3B82F6' COMMENT 'Warna tema untuk kategori',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Status aktif kategori',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel untuk jenis surat
CREATE TABLE jenis_surat (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kategori_id BIGINT UNSIGNED NOT NULL,
    nama_surat VARCHAR(150) NOT NULL COMMENT 'Nama jenis surat (SKU, IUMK, IMB, dll)',
    kode_surat VARCHAR(20) NOT NULL UNIQUE COMMENT 'Kode unik untuk jenis surat',
    deskripsi TEXT COMMENT 'Deskripsi jenis surat',
    persyaratan JSON COMMENT 'Daftar persyaratan dalam format JSON',
    template_surat LONGTEXT COMMENT 'Template surat dalam format HTML',
    biaya DECIMAL(10,2) DEFAULT 0.00 COMMENT 'Biaya pengurusan surat',
    masa_berlaku_hari INT DEFAULT 0 COMMENT 'Masa berlaku surat dalam hari (0 = tidak ada masa berlaku)',
    perlu_approval_kepala_desa BOOLEAN DEFAULT FALSE COMMENT 'Apakah perlu persetujuan kepala desa',
    estimasi_selesai_hari INT DEFAULT 3 COMMENT 'Estimasi waktu penyelesaian dalam hari',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Status aktif jenis surat',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kategori_id) REFERENCES kategori_surat(id) ON DELETE CASCADE
);

-- Tabel untuk data pemohon
CREATE TABLE pemohon (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nik VARCHAR(16) NOT NULL UNIQUE COMMENT 'Nomor Induk Kependudukan',
    nama_lengkap VARCHAR(100) NOT NULL COMMENT 'Nama lengkap pemohon',
    tempat_lahir VARCHAR(50) COMMENT 'Tempat lahir',
    tanggal_lahir DATE COMMENT 'Tanggal lahir',
    jenis_kelamin ENUM('L', 'P') COMMENT 'Jenis kelamin (L=Laki-laki, P=Perempuan)',
    agama VARCHAR(20) COMMENT 'Agama',
    status_perkawinan VARCHAR(20) COMMENT 'Status perkawinan',
    pekerjaan VARCHAR(50) COMMENT 'Pekerjaan',
    alamat_lengkap TEXT COMMENT 'Alamat lengkap sesuai KTP',
    rt VARCHAR(5) COMMENT 'RT',
    rw VARCHAR(5) COMMENT 'RW',
    kelurahan VARCHAR(50) COMMENT 'Kelurahan/Desa',
    kecamatan VARCHAR(50) COMMENT 'Kecamatan',
    kabupaten VARCHAR(50) COMMENT 'Kabupaten/Kota',
    kode_pos VARCHAR(10) COMMENT 'Kode pos',
    no_telepon VARCHAR(20) COMMENT 'Nomor telepon',
    email VARCHAR(100) COMMENT 'Email',
    foto_ktp VARCHAR(255) COMMENT 'Path file foto KTP',
    foto_kk VARCHAR(255) COMMENT 'Path file foto KK',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Status aktif pemohon',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel untuk pengajuan surat
CREATE TABLE pengajuan_surat (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nomor_pengajuan VARCHAR(50) NOT NULL UNIQUE COMMENT 'Nomor unik pengajuan',
    pemohon_id BIGINT UNSIGNED NOT NULL,
    jenis_surat_id BIGINT UNSIGNED NOT NULL,
    tujuan_surat TEXT NOT NULL COMMENT 'Tujuan/keperluan surat',
    data_tambahan JSON COMMENT 'Data tambahan spesifik untuk jenis surat',
    dokumen_pendukung JSON COMMENT 'Daftar dokumen pendukung yang diupload',
    status ENUM('draft', 'menunggu_verifikasi', 'disetujui', 'ditolak', 'revisi') DEFAULT 'draft' COMMENT 'Status pengajuan',
    keterangan TEXT COMMENT 'Keterangan tambahan dari admin/kepala desa',
    tanggal_pengajuan TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Tanggal pengajuan',
    tanggal_verifikasi TIMESTAMP NULL COMMENT 'Tanggal verifikasi',
    tanggal_selesai TIMESTAMP NULL COMMENT 'Tanggal selesai',
    diverifikasi_oleh BIGINT UNSIGNED NULL COMMENT 'ID user yang memverifikasi',
    disetujui_oleh BIGINT UNSIGNED NULL COMMENT 'ID user yang menyetujui',
    prioritas ENUM('rendah', 'normal', 'tinggi', 'urgent') DEFAULT 'normal' COMMENT 'Prioritas pengajuan',
    estimasi_selesai DATE COMMENT 'Estimasi tanggal selesai',
    biaya_total DECIMAL(10,2) DEFAULT 0.00 COMMENT 'Total biaya yang harus dibayar',
    status_pembayaran ENUM('belum_bayar', 'sudah_bayar', 'gratis') DEFAULT 'gratis' COMMENT 'Status pembayaran',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pemohon_id) REFERENCES pemohon(id) ON DELETE CASCADE,
    FOREIGN KEY (jenis_surat_id) REFERENCES jenis_surat(id) ON DELETE CASCADE,
    FOREIGN KEY (diverifikasi_oleh) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (disetujui_oleh) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabel untuk hasil surat yang telah disetujui
CREATE TABLE surat_hasil (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pengajuan_id BIGINT UNSIGNED NOT NULL,
    nomor_surat VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nomor surat resmi',
    isi_surat LONGTEXT NOT NULL COMMENT 'Isi surat dalam format HTML',
    file_pdf VARCHAR(255) COMMENT 'Path file PDF surat',
    tanggal_berlaku DATE COMMENT 'Tanggal mulai berlaku',
    tanggal_kadaluarsa DATE COMMENT 'Tanggal kadaluarsa (jika ada)',
    ditandatangani_oleh BIGINT UNSIGNED COMMENT 'ID user yang menandatangani',
    qr_code VARCHAR(255) COMMENT 'Path QR code untuk verifikasi',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Status aktif surat',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pengajuan_id) REFERENCES pengajuan_surat(id) ON DELETE CASCADE,
    FOREIGN KEY (ditandatangani_oleh) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabel untuk riwayat status pengajuan
CREATE TABLE riwayat_status (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pengajuan_id BIGINT UNSIGNED NOT NULL,
    status_lama VARCHAR(50) COMMENT 'Status sebelumnya',
    status_baru VARCHAR(50) NOT NULL COMMENT 'Status baru',
    keterangan TEXT COMMENT 'Keterangan perubahan status',
    diubah_oleh BIGINT UNSIGNED COMMENT 'ID user yang mengubah status',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengajuan_id) REFERENCES pengajuan_surat(id) ON DELETE CASCADE,
    FOREIGN KEY (diubah_oleh) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabel untuk log aktivitas sistem
CREATE TABLE log_aktivitas (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED COMMENT 'ID user yang melakukan aktivitas',
    tipe_aktivitas VARCHAR(50) NOT NULL COMMENT 'Jenis aktivitas (login, create, update, delete, dll)',
    modul VARCHAR(50) NOT NULL COMMENT 'Modul yang diakses (surat, pemohon, user, dll)',
    deskripsi TEXT NOT NULL COMMENT 'Deskripsi aktivitas',
    data_lama JSON COMMENT 'Data sebelum perubahan',
    data_baru JSON COMMENT 'Data setelah perubahan',
    ip_address VARCHAR(45) COMMENT 'IP address user',
    user_agent TEXT COMMENT 'User agent browser',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabel untuk pengaturan sistem
CREATE TABLE pengaturan_sistem (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kunci VARCHAR(100) NOT NULL UNIQUE COMMENT 'Kunci pengaturan',
    nilai TEXT NOT NULL COMMENT 'Nilai pengaturan',
    deskripsi TEXT COMMENT 'Deskripsi pengaturan',
    tipe_data ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string' COMMENT 'Tipe data nilai',
    kategori VARCHAR(50) DEFAULT 'umum' COMMENT 'Kategori pengaturan',
    is_public BOOLEAN DEFAULT FALSE COMMENT 'Apakah pengaturan bisa diakses publik',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel untuk notifikasi
CREATE TABLE notifikasi (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    judul VARCHAR(200) NOT NULL COMMENT 'Judul notifikasi',
    pesan TEXT NOT NULL COMMENT 'Isi pesan notifikasi',
    tipe ENUM('info', 'success', 'warning', 'error') DEFAULT 'info' COMMENT 'Tipe notifikasi',
    tindakan VARCHAR(100) COMMENT 'Tindakan yang bisa dilakukan',
    url_tindakan VARCHAR(255) COMMENT 'URL untuk tindakan',
    is_read BOOLEAN DEFAULT FALSE COMMENT 'Status sudah dibaca',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert data kategori surat
INSERT INTO kategori_surat (nama_kategori, deskripsi, icon, warna) VALUES
('Perizinan Usaha', 'Kategori surat untuk berbagai perizinan usaha dan perdagangan', 'store', '#10B981'),
('Perizinan Bangunan', 'Kategori surat untuk perizinan pembangunan dan renovasi', 'home', '#3B82F6'),
('Perizinan Keramaian', 'Kategori surat untuk perizinan acara dan kegiatan sosial', 'calendar', '#F59E0B'),
('Perizinan Pribadi', 'Kategori surat untuk keperluan pribadi dan kependudukan', 'user', '#8B5CF6'),
('Perizinan Pertanian', 'Kategori surat untuk perizinan pertanian dan peternakan', 'leaf', '#22C55E');

-- Insert data jenis surat
INSERT INTO jenis_surat (kategori_id, nama_surat, kode_surat, deskripsi, persyaratan, biaya, perlu_approval_kepala_desa, estimasi_selesai_hari) VALUES
-- Perizinan Usaha
(1, 'Surat Keterangan Usaha (SKU)', 'SKU', 'Surat keterangan untuk mendukung legalitas usaha', '["Fotokopi KTP", "Fotokopi KK", "Pas foto 3x4", "Surat pernyataan usaha"]', 10000.00, TRUE, 3),
(1, 'Izin Usaha Mikro Kecil (IUMK)', 'IUMK', 'Izin usaha untuk skala mikro dan kecil', '["Fotokopi KTP", "Fotokopi KK", "Pas foto 3x4", "Surat pernyataan usaha", "Denah lokasi usaha"]', 25000.00, TRUE, 5),
(1, 'Surat Izin Tempat Usaha (SITU)', 'SITU', 'Izin untuk tempat usaha/perdagangan', '["Fotokopi KTP", "Fotokopi KK", "Surat kepemilikan/sewa tempat", "Denah lokasi", "Pas foto 3x4"]', 50000.00, TRUE, 7),
(1, 'Rekomendasi NIB / OSS', 'NIB', 'Rekomendasi untuk Nomor Induk Berusaha', '["Fotokopi KTP", "Fotokopi KK", "Akta pendirian usaha", "NPWP", "Surat pernyataan"]', 0.00, TRUE, 5),

-- Perizinan Bangunan
(2, 'Izin Mendirikan Bangunan (IMB/PBG)', 'IMB', 'Izin untuk mendirikan bangunan baru', '["Fotokopi KTP", "Fotokopi KK", "Surat kepemilikan tanah", "Gambar denah bangunan", "Pas foto 3x4"]', 100000.00, TRUE, 14),
(2, 'Izin Bangun di Lahan Milik Desa', 'IBLMD', 'Izin untuk membangun di lahan milik desa', '["Fotokopi KTP", "Fotokopi KK", "Surat permohonan", "Gambar denah", "Pas foto 3x4"]', 75000.00, TRUE, 10),
(2, 'Surat Keterangan Tidak Sengketa Tanah', 'SKTST', 'Surat keterangan bahwa tanah tidak dalam sengketa', '["Fotokopi KTP", "Fotokopi KK", "Surat kepemilikan tanah", "Surat pernyataan", "Pas foto 3x4"]', 15000.00, FALSE, 3),
(2, 'Izin Renovasi atau Perluasan Bangunan', 'IRPB', 'Izin untuk renovasi atau perluasan bangunan', '["Fotokopi KTP", "Fotokopi KK", "IMB lama", "Gambar renovasi", "Pas foto 3x4"]', 50000.00, TRUE, 7),

-- Perizinan Keramaian
(3, 'Surat Izin Hajatan', 'SIH', 'Izin untuk mengadakan hajatan (pernikahan, khitanan, dll)', '["Fotokopi KTP", "Fotokopi KK", "Surat permohonan", "Pas foto 3x4"]', 25000.00, FALSE, 2),
(3, 'Surat Izin Acara Publik', 'SIAP', 'Izin untuk acara publik (turnamen, konser, pengajian, bazar)', '["Fotokopi KTP", "Fotokopi KK", "Proposal acara", "Pas foto 3x4"]', 50000.00, TRUE, 5),
(3, 'Izin Penggunaan Sarana Umum Desa', 'IPSUD', 'Izin penggunaan balai, lapangan, dll', '["Fotokopi KTP", "Fotokopi KK", "Surat permohonan", "Pas foto 3x4"]', 30000.00, FALSE, 3),

-- Perizinan Pribadi
(4, 'Surat Pengantar SKCK', 'SP-SKCK', 'Surat pengantar untuk mengurus SKCK', '["Fotokopi KTP", "Fotokopi KK", "Pas foto 4x6", "Surat permohonan"]', 5000.00, FALSE, 1),
(4, 'Surat Keterangan Domisili', 'SKD', 'Surat keterangan tempat tinggal', '["Fotokopi KTP", "Fotokopi KK", "Surat pernyataan", "Pas foto 3x4"]', 10000.00, FALSE, 2),
(4, 'Surat Izin Tinggal Pendatang', 'SITP', 'Izin tinggal untuk pendatang', '["Fotokopi KTP", "Fotokopi KK", "Surat keterangan pindah", "Pas foto 3x4"]', 15000.00, FALSE, 3),
(4, 'Surat Izin Keluar Negeri (informal)', 'SIKN', 'Surat izin keluar negeri untuk keperluan informal', '["Fotokopi KTP", "Fotokopi KK", "Fotokopi paspor", "Pas foto 3x4"]', 20000.00, TRUE, 3),
(4, 'Surat Keterangan Tidak Bekerja', 'SKTB', 'Surat keterangan untuk yang tidak bekerja', '["Fotokopi KTP", "Fotokopi KK", "Surat pernyataan", "Pas foto 3x4"]', 10000.00, FALSE, 2),

-- Perizinan Pertanian
(5, 'Izin Pengelolaan Lahan Desa', 'IPLD', 'Izin untuk mengelola lahan milik desa', '["Fotokopi KTP", "Fotokopi KK", "Surat permohonan", "Pas foto 3x4"]', 25000.00, TRUE, 7),
(5, 'Surat Permohonan Bantuan Pupuk/Bibit/Alat', 'SPBPBA', 'Surat permohonan bantuan untuk pertanian', '["Fotokopi KTP", "Fotokopi KK", "Surat permohonan", "Pas foto 3x4"]', 0.00, TRUE, 5),
(5, 'Surat Keterangan Petani atau Buruh Tani', 'SKPBT', 'Surat keterangan profesi petani/buruh tani', '["Fotokopi KTP", "Fotokopi KK", "Surat pernyataan", "Pas foto 3x4"]', 10000.00, FALSE, 2),
(5, 'Surat Izin Irigasi atau Penggunaan Air', 'SIIPA', 'Izin penggunaan air untuk pertanian', '["Fotokopi KTP", "Fotokopi KK", "Surat permohonan", "Denah lokasi", "Pas foto 3x4"]', 15000.00, TRUE, 5);

-- Insert pengaturan sistem default
INSERT INTO pengaturan_sistem (kunci, nilai, deskripsi, tipe_data, kategori) VALUES
('nama_desa', 'Desa Contoh', 'Nama desa', 'string', 'identitas'),
('alamat_desa', 'Jl. Contoh No. 123, Kecamatan Contoh', 'Alamat lengkap desa', 'string', 'identitas'),
('kode_pos', '12345', 'Kode pos desa', 'string', 'identitas'),
('nama_kepala_desa', 'Bapak Kepala Desa', 'Nama kepala desa', 'string', 'identitas'),
('nama_sekretaris', 'Bapak Sekretaris', 'Nama sekretaris desa', 'string', 'identitas'),
('auto_backup', 'true', 'Backup otomatis harian', 'boolean', 'sistem'),
('max_file_size', '5', 'Maksimal ukuran file upload (MB)', 'number', 'sistem'),
('notifikasi_email', 'true', 'Kirim notifikasi via email', 'boolean', 'notifikasi'),
('bahasa_default', 'id', 'Bahasa default sistem', 'string', 'tampilan'),
('tema_warna', 'blue', 'Tema warna sistem', 'string', 'tampilan');

-- Indexes untuk performa
CREATE INDEX idx_pengajuan_status ON pengajuan_surat(status);
CREATE INDEX idx_pengajuan_tanggal ON pengajuan_surat(tanggal_pengajuan);
CREATE INDEX idx_pengajuan_pemohon ON pengajuan_surat(pemohon_id);
CREATE INDEX idx_pengajuan_jenis ON pengajuan_surat(jenis_surat_id);
CREATE INDEX idx_pemohon_nik ON pemohon(nik);
CREATE INDEX idx_log_aktivitas_user ON log_aktivitas(user_id);
CREATE INDEX idx_log_aktivitas_tanggal ON log_aktivitas(created_at);
CREATE INDEX idx_notifikasi_user ON notifikasi(user_id);
CREATE INDEX idx_notifikasi_read ON notifikasi(is_read);

-- Triggers untuk log aktivitas
DELIMITER //
CREATE TRIGGER log_pengajuan_insert AFTER INSERT ON pengajuan_surat
FOR EACH ROW BEGIN
    INSERT INTO log_aktivitas (user_id, tipe_aktivitas, modul, deskripsi, data_baru)
    VALUES (NEW.diverifikasi_oleh, 'create', 'pengajuan_surat', 
            CONCAT('Pengajuan surat baru dengan nomor: ', NEW.nomor_pengajuan), 
            JSON_OBJECT('id', NEW.id, 'nomor_pengajuan', NEW.nomor_pengajuan, 'status', NEW.status));
END//

CREATE TRIGGER log_pengajuan_update AFTER UPDATE ON pengajuan_surat
FOR EACH ROW BEGIN
    IF OLD.status != NEW.status THEN
        INSERT INTO riwayat_status (pengajuan_id, status_lama, status_baru, keterangan, diubah_oleh)
        VALUES (NEW.id, OLD.status, NEW.status, NEW.keterangan, NEW.diverifikasi_oleh);
        
        INSERT INTO log_aktivitas (user_id, tipe_aktivitas, modul, deskripsi, data_lama, data_baru)
        VALUES (NEW.diverifikasi_oleh, 'update', 'pengajuan_surat', 
                CONCAT('Perubahan status pengajuan: ', NEW.nomor_pengajuan), 
                JSON_OBJECT('status', OLD.status),
                JSON_OBJECT('status', NEW.status));
    END IF;
END//
DELIMITER ;
