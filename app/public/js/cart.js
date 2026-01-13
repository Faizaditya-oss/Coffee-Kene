// Fungsi untuk memperbarui angka di ikon keranjang Navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElement = document.getElementById('cart-count');

    // Menghitung total quantity
    const totalItems = cart.reduce((sum, item) => sum + item.jumlah, 0);

    if (totalItems > 0) {
        countElement.innerText = totalItems;
        countElement.style.display = 'block';
    } else {
        countElement.style.display = 'none';
    }
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();

    // Logika Tombol Plus (+) dan Minus (-)
    document.querySelectorAll('.quantity-control').forEach(control => {
        const btnMinus = control.querySelector('button:first-child');
        const btnPlus = control.querySelector('button:last-child');
        const spanQty = control.querySelector('span');

        btnPlus.onclick = () => {
            spanQty.innerText = parseInt(spanQty.innerText) + 1;
        };

        btnMinus.onclick = () => {
            let current = parseInt(spanQty.innerText);
            if (current > 1) spanQty.innerText = current - 1;
        };
    });

    // Logika Tombol Add to Cart
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.coffee-card');
            const product = {
                id: Date.now(), // ID unik sederhana
                nama: card.querySelector('h5').innerText,
                harga: parseInt(card.querySelector('.text-danger').innerText.replace(/[^0-9]/g, '')),
                gambar: card.querySelector('img').src,
                jumlah: parseInt(card.querySelector('.quantity-control span').innerText)
            };

            // Simpan ke LocalStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update angka di navbar secara real-time
            updateCartCount();

            alert(product.nama + " berhasil ditambahkan ke keranjang!");
        });
    });
});

// Jalankan update angka setiap kali halaman ganti
document.addEventListener('DOMContentLoaded', updateCartCount);
