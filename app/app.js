require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// Mengambil port dari environment variable (Docker) atau default 3000
const port = process.env.APP_PORT || 3000;

// 1. KONFIGURASI DATABASE (Gunakan Pool agar lebih stabil di Docker)
const db = mysql.createPool({
    host: process.env.DB_HOST || 'db_service',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Cek koneksi ke Database saat startup
db.getConnection((err, connection) => {
    if (err) {
        console.error('⚠️ Database belum siap atau error:', err.message);
    } else {
        console.log('✅ Terhubung ke database MySQL di Docker!');
        connection.release();
    }
});

// 2. SETTING VIEW ENGINE & MIDDLEWARE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. PANGGIL MODULAR ROUTES (Sesuai tugas kamu)
// Pastikan file ini ada di folder routes/index.js
try {
    const indexRouter = require('./routes/index')(db);
    app.use('/', indexRouter);
} catch (error) {
    console.error('❌ Gagal memuat file routes/index.js:', error.message);
}

// 4. JALANKAN SERVER
app.listen(port, () => {
    console.log(`🚀 Server berjalan di port ${port}`);
});