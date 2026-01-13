// public/js/renderCart.js

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    const totalHargaElement = document.getElementById('total-harga');
    let total = 0;

    if (!cartList) return; // Mencegah error jika elemen tidak ada di halaman

    cartList.innerHTML = ''; // Kosongkan dulu sebelum render

    if (cart.length === 0) {
        cartList.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-cart-x fs-1 text-muted"></i>
                <p class="text-muted mt-2">Wah, keranjangmu masih kosong nih.</p>
            </div>`;
        if (totalHargaElement) totalHargaElement.innerText = "Rp 0";
        return;
    }

    cart.forEach((item, index) => {
        const subtotal = item.harga * item.jumlah;
        total += subtotal;

        cartList.innerHTML += `
            <div class="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
                <div class="d-flex align-items-center gap-3">
                    <img src="${item.gambar}" style="width: 80px; height: 80px; object-fit: cover;" class="rounded shadow-sm" onerror="this.src='/img/default.jpg'">
                    <div>
                        <h6 class="fw-bold mb-1">${item.nama}</h6>
                        <p class="text-muted small mb-0">Rp ${item.harga.toLocaleString()} x ${item.jumlah}</p>
                        <p class="fw-bold text-dark mb-0">Subtotal: Rp ${subtotal.toLocaleString()}</p>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">
                    <i class="bi bi-trash"></i> Hapus
                </button>
            </div>`;
    });

    if (totalHargaElement) {
        totalHargaElement.innerText = "Rp " + total.toLocaleString();
    }
}

// Fungsi Hapus Item
window.removeItem = (index) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Hapus 1 item berdasarkan urutan (index)
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Render ulang tampilannya
    
    // Jika ada fungsi update count di navbar, panggil juga
    if (typeof updateCartCount === 'function') updateCartCount();
};

// Jalankan fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', displayCart);