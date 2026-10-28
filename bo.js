// Savatdagi mahsulotlar ro'yxati (Massiv)
let cart = [];

// DOM Elementlarini tanlab olish
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartBadge = document.getElementById('cartBadge');
const checkoutBtn = document.getElementById('checkoutBtn');

// 1. Savat panelini ochish
openCartBtn.addEventListener('click', () => {
  cartDrawer.classList.add('active');
  cartOverlay.classList.add('active');
});

// 2. Savat panelini yopish
function closeCart() {
  cartDrawer.classList.remove('active');
  cartOverlay.classList.remove('active');
}

closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// 3. Savatga mahsulot qo'shish
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    const id = card.getAttribute('data-id');
    const name = card.getAttribute('data-name');
    const price = parseInt(card.getAttribute('data-price'));
    const img = card.querySelector('.card-image img').src;

    // Mahsulot savatda bor-yo'qligini tekshirish
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ id, name, price, img, qty: 1 });
    }

    updateCartUI();
    
    // Savatni ochib ko'rsatish
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
  });
});

// 4. Savat Interfeysini (UI) Yangilash
function updateCartUI() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="cart-empty-text">Savat hozircha bo\'sh</p>';
    cartTotalPrice.innerText = '0 UZS';
    cartBadge.innerText = '0';
    return;
  }

  let total = 0;
  let totalItemsCount = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    totalItemsCount += item.qty;

    const cartItemEl = document.createElement('div');
    cartItemEl.classList.add('cart-item');
    cartItemEl.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">${(item.price * item.qty).toLocaleString()} UZS</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItemEl);
  });

  cartTotalPrice.innerText = total.toLocaleString() + ' UZS';
  cartBadge.innerText = totalItemsCount;
}

// 5. Mahsulot sonini ko'paytirish / kamaytirish
window.changeQty = function(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  updateCartUI();
};

// 6. Buyurtma berish tugmasi
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Savat bo'sh! Iltimos, oldin mahsulot tanlang.");
    return;
  }

  alert(`Rahmat! Buyurtmangiz qabul qilindi.\n\nSiz bilan +998 95 341 95 00 raqami orqali bog'lanamiz.`);
  cart = [];
  updateCartUI();
  closeCart();
});