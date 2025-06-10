document.addEventListener("DOMContentLoaded", function () {
  const cartDrawer = document.getElementById("cartDrawer");
  const cartCountElems = document.querySelectorAll(".cart-count");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalElem = document.getElementById("cart-total");
  const closeCartBtn = document.querySelector(".close-cart");
  const openCartBtn = document.getElementById("openCart");

  let cart = [];

  function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <h4>${item.name}</h4>
          <div class="quantity-controls">
            <button class="decrease" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="increase" data-index="${index}">+</button>
          </div>
          <p>${item.price}₺ x ${item.quantity} = ${(item.price * item.quantity).toFixed(2)}₺</p>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    cartCountElems.forEach(el => el.textContent = totalItems);
    cartTotalElem.textContent = total.toFixed(2) + "₺";
  }

  function openCartDrawer() {
    cartDrawer.classList.add("open");
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove("open");
  }

  openCartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    openCartDrawer();
  });

  closeCartBtn.addEventListener("click", closeCartDrawer);

  // Ürün ekleme butonları
  document.querySelectorAll(".btn-sepet").forEach(button => {
    button.addEventListener("click", function () {
      const id = this.dataset.id;
      const name = this.dataset.name;
      const price = parseFloat(this.dataset.price);
      const image = this.dataset.image;

      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ id, name, price, image, quantity: 1 });
      }

      updateCartUI();
      openCartDrawer();
    });
  });

  // Arttır/Azalt işlemleri
  cartItemsContainer.addEventListener("click", function (e) {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("increase")) {
      cart[index].quantity++;
    } else if (e.target.classList.contains("decrease")) {
      cart[index].quantity > 1 ? cart[index].quantity-- : cart.splice(index, 1);
    }
    updateCartUI();
  });
});
