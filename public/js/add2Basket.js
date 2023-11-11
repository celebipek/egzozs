
let total = 0;

function addToCart(productName, productPrice) {
    const cartDropdown = document.getElementById("cart-dropdown");
    const cartItems = document.getElementById("cart-items");
    const quantityInput = document.getElementById("quantity");
    const quantity = parseInt(quantityInput.value);

    // Eklenecek ürünü belirle
    const listItem = document.createElement("li");
    listItem.innerHTML = `<span class="cart-item-name">${productName}</span> 
                          <span class="cart-item-quantity">x${quantity}</span> 
                          <span class="cart-item-price">${(productPrice * quantity).toFixed(2)}TR</span>
                          <span class="change-quantity">
                            <input type="number" class="quantity" value="${quantity}" min="1" max="10" onchange="updateQuantity(this, '${productName}', ${productPrice})">
                          </span>
                          <button class="remove-item" onclick="removeItem(this, '${productName}', ${productPrice}, ${quantity})">Kaldır</button>`;
    cartItems.appendChild(listItem);

    // Sepet toplamını güncelle
    total += productPrice * quantity;

    // Toplam fiyatı güncelle
    updateTotalPrice();

    // Sepet açılır penceresini görünür yap
    cartDropdown.style.display = "block";

    // Local Storage'a sepeti kaydet
    saveCartToLocalStorage();
}

function updateQuantity(input, productName, productPrice) {
    const newQuantity = parseInt(input.value);
    const listItem = input.closest("li");

    // Ürünün yeni fiyatını hesapla
    const newPrice = productPrice * newQuantity;

    // Liste öğesini güncelle
    listItem.querySelector(".cart-item-quantity").textContent = `x${newQuantity}`;
    listItem.querySelector(".cart-item-price").textContent = `${newPrice.toFixed(2)}TR`;

    // Sepet toplamını güncelle
    total = calculateTotalPrice();

    // Toplam fiyatı güncelle
    updateTotalPrice();

    // Local Storage'a sepeti kaydet
    saveCartToLocalStorage();
}

function removeItem(button, productName, productPrice, quantity) {
    const listItem = button.closest("li");

    // Ürünü listeden kaldır
    listItem.remove();

    // Toplam fiyatı güncelle
    total -= productPrice * quantity;
    updateTotalPrice();

    // Eğer sepet boşaldıysa, sepet penceresini kapat
    const cartItems = document.getElementById("cart-items");
    if (cartItems.children.length === 0) {
        closeCart();
    }

    // Local Storage'a sepeti kaydet
    saveCartToLocalStorage();
}

function calculateTotalPrice() {
    const items = document.querySelectorAll(".cart-item-price");
    let totalPrice = 0;

    items.forEach(item => {
        totalPrice += parseFloat(item.textContent);
    });

    return totalPrice;
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById("total-price");
    totalPriceElement.textContent = total.toFixed(2) + "TR";
}

function toggleCart() {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.style.display = cartDropdown.style.display === "none" ? "block" : "none";
}

function closeCart() {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.style.display = "none";
}

document.getElementById("close-cart").addEventListener("click", toggleCart);

// Local Storage'dan sepeti yükle
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        cartItems.forEach(item => {
            addToCart(item.productName, item.productPrice, item.quantity);
        });
    }
}

// Local Storage'a sepeti kaydet
function saveCartToLocalStorage() {
    const cartItems = [];
    const items = document.querySelectorAll(".cart-item-name");
    const quantities = document.querySelectorAll(".quantity");
    items.forEach((item, index) => {
        const productName = item.textContent;
        const productPrice = parseFloat(item.nextElementSibling.textContent);
        const quantity = parseInt(quantities[index].value);
        cartItems.push({ productName, productPrice, quantity });
    });
    localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Sayfa yüklendiğinde Local Storage'dan sepeti yükle
window.onload = function () {
    loadCartFromLocalStorage();
    displayCart();
    
};