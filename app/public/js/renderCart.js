// public/js/renderCart.js
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    const totalHargaElement = document.getElementById('total-harga');
    let total = 0;

    if (!cartList) return;
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">Keranjang Anda masih kosong.</p></div>';
    } else {
        cart.forEach((item, index) => {
            total += item.harga * item.jumlah;
            cartList.innerHTML += `
                <div class="col-12 mb-3 border-bottom pb-3">
                    <div class="d-flex align-items-center gap-3">
                        <img src="${item.gambar}" style="width: 70px; height: 70px; object-fit: cover;" class="rounded">
                        <div class="flex-grow-1">
                            <h6 class="fw-bold mb-0">${item.nama}</h6>
                            <p class="text-muted small mb-0">${item.jumlah} x Rp ${item.harga.toLocaleString()}</p>
                        </div>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">Hapus</button>
                    </div>
                </div>`;
        });
    }
    totalHargaElement.innerText = "Rp " + total.toLocaleString();
}

window.removeItem = (index) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    if (typeof updateCartCount === 'function') updateCartCount();
};

document.addEventListener('DOMContentLoaded', displayCart);