require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session'); // Wajib untuk fitur Cart
const app = express();

// Mengambil port dari environment variable atau default 3000
const port = process.env.APP_PORT || 3000;

const db = require('./config/database'); // Memanggil file config tadi
const indexRouter = require('./routes/index')(db); // Mengirim koneksi ke routes

app.use('/', indexRouter);

// 1. KONFIGURASI DATABASE (Pool)
const db = mysql.createPool({
    host: process.env.DB_HOST || 'db_service',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'rootpassword',
    database: process.env.DB_NAME || 'kopikene_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Cek koneksi ke Database
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

// Middleware dasar
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Penting untuk menangani request POST JSON
app.use(express.urlencoded({ extended: true }));

// 3. KONFIGURASI SESSION (Harus di atas Router)
app.use(session({
    secret: 'kopi-kene-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set false karena kita belum pakai HTTPS
        maxAge: 1000 * 60 * 60 * 24 // Simpan session selama 1 hari
    }
}));

// 4. PANGGIL MODULAR ROUTES
try {
    // Mengirimkan objek 'db' ke file routes/index.js
    const indexRouter = require('./routes/index')(db);
    app.use('/', indexRouter);
} catch (error) {
    console.error('❌ Gagal memuat file routes/index.js:', error.message);
}

// 5. JALANKAN SERVER
app.listen(port, () => {
    console.log(`🚀 Server berjalan di port ${port}`);
});