// TODO: Buat koneksi pool MySQL disini menggunakan Environment Variable (process.env)
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'db_service',             // Nama service di docker-compose (biasanya 'db')
    user: 'kopiapp',           // User database kamu
    password: 'password123', // Password database kamu
    database: 'kopikene_db'   // Nama database (misal: kopikene)
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database gagal terhubung:', err.stack);
        return;
    }
    console.log('✅ Terhubung ke database MySQL');
});

module.exports = db;