// public/js/cart.js

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElement = document.getElementById('cart-count');

    if (!countElement) return;

    const totalItems = cart.reduce((sum, item) => sum + item.jumlah, 0);

    if (totalItems > 0) {
        countElement.innerText = totalItems;
        countElement.style.display = 'block';
    } else {
        countElement.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();

    document.addEventListener('click', function (e) {
        // Cari apakah yang diklik adalah tombol add-to-cart
        const button = e.target.closest('.btn-add-cart');
        if (!button) return;

        // Cari container kartu produknya
        const card = button.closest('.coffee-card');
        if (!card) return;

        try {
            // Ambil data dari data attributes (lebih aman dan pasti ada)
            const id = card.getAttribute('data-product-id');
            const nama = card.getAttribute('data-product-name');
            const harga = parseInt(card.getAttribute('data-product-price')) || 0;
            const gambar = card.getAttribute('data-product-image');
            const elQty = card.querySelector('.qty-input');
            const jumlah = elQty ? (parseInt(elQty.value) || 1) : 1;

            if (!id || !nama || !harga) {
                console.error("Data produk tidak lengkap:", {id, nama, harga});
                alert("❌ Gagal menambahkan ke keranjang");
                return;
            }

            const product = {
                id: id,
                nama: nama,
                harga: harga,
                gambar: '/img/' + gambar,
                jumlah: jumlah
            };

            addToLocalStorage(product);

            // Balikin input ke angka 1
            if (elQty) elQty.value = 1;

        } catch (error) {
            console.error("Gagal menambahkan ke keranjang:", error);
            alert("❌ Terjadi kesalahan");
        }
    });
});

function addToLocalStorage(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
        // Jika produk sudah ada, tambah jumlahnya
        cart[existingItemIndex].jumlah += product.jumlah;
    } else {
        // Jika produk baru, tambahkan ke array
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`☕ "${product.nama}" (${product.jumlah}x) sudah masuk keranjang!`);
}

