-- 1. Buat database jika belum ada
CREATE DATABASE IF NOT EXISTS kopikene_db;
USE kopikene_db;

-- 2. Buat tabel menu (Struktur sudah benar)
CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_produk VARCHAR(255) NOT NULL,
    harga INT NOT NULL,
    gambar VARCHAR(255) NOT NULL
);

INSERT INTO menu (nama_produk, harga, gambar) VALUES 
('Cappuccino', 35000, 'cappucino.jpg'),
('Caramel', 25000, 'espresso.jpg'),
('Latte', 30000, 'vanilla.jpg');

-- 4. Masukkan data awal
INSERT INTO menu (nama_produk, harga, gambar) VALUES 
('Coffee Retail Packs', 104900, 'hazelnut.jpg'),
('Brazil Blend Arabica', 118900, 'espressosingle.jpg'),
('Unicorn Blood Dark', 123800, 'caramel.jpg');

-- 3. Buat tabel keranjang (Perbaikan: Ganti {} menjadi () dan tambah presisi DECIMAL)
CREATE TABLE IF NOT EXISTS keranjang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menu_id INT NOT NULL, 
    jumlah INT,
    total DECIMAL(10, 2), -- Menambahkan (10, 2) agar mendukung angka desimal seperti harga
    FOREIGN KEY (menu_id) REFERENCES menu(id) 
);

