# Gunakan versi Node.js yang ringan
FROM node:18-alpine

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependensi (termasuk mysql2 dan ejs)
RUN npm install

# Salin seluruh kode sumber proyek ke dalam container
COPY . .

# Expose port sesuai yang digunakan aplikasi (3000)
EXPOSE 3000

# Jalankan aplikasi menggunakan node
CMD ["node", "app.js"]