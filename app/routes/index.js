// TODO: Definisikan semua jalur (Route) aplikasi kalian disini (GET, POST, PUT, DELETE)
const express = require('express');
const router = express.Router();

// Kita buat fungsi yang menerima 'db' dari app.js
module.exports = (db) => {
    
    // Rute Halaman Utama
    router.get('/', (req, res) => {
        db.query("SELECT * FROM menu", (err, results) => {
            if (err) {
                console.error("Query Error:", err);
                return res.render('index', { dataMenu: [] });
            }
            res.render('index', { dataMenu: results });
        });
    });

    // Rute Tambah ke Keranjang
    // routes/index.js
router.get('/', (req, res) => {
    db.query("SELECT * FROM menu", (err, results) => {
        if (err) {
            console.error("❌ Query Error:", err.message);
            // Tetap render index tapi dengan data kosong agar tidak crash
            return res.render('index', { dataMenu: [] });
        }
        console.log("✅ Data menu berhasil diambil");
        res.render('index', { dataMenu: results });
    });
});

    return router;
};