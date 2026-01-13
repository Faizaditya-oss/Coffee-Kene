const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Menampilkan Halaman Utama
    router.get('/', (req, res) => {
        db.query("SELECT * FROM menu", (err, results) => {
            if (err) {
                console.error("❌ DB Error:", err.message);
                return res.render('index', { dataMenu: [] });
            }
            res.render('index', { dataMenu: results });
        });
    });

    // Menampilkan Halaman Keranjang
    router.get('/cart', (req, res) => {
        res.render('cart'); 
    });

    

    return router;
};


