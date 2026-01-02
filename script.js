const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Item added to cart ");
  });
});

// Cart functions
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(item) {
  let cart = getCart();
  let existing = cart.find(c => c.title === item.title);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart(cart);
  alert(`${item.title} added to cart!`);
  updateCartCount();
}

function removeFromCart(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function increaseQuantity(index) {
  let cart = getCart();
  cart[index].quantity += 1;
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function decreaseQuantity(index) {
  let cart = getCart();
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    saveCart(cart);
    renderCart();
    updateCartCount();
  }
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(span => {
    span.textContent = count;
  });
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const actionsEl = document.querySelector('.cart-actions');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    if (totalEl) totalEl.innerHTML = '';
    if (actionsEl) {
      actionsEl.innerHTML = '<a href="menu.html" class="btn">Continue Shopping</a>';
    }
    return;
  }

  container.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div>
          <h3>${item.title}</h3>
          <p>Price: $${item.price.toFixed(2)}</p>
          <div class="quantity-controls">
            <button onclick="decreaseQuantity(${index})">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQuantity(${index})">+</button>
          </div>
        </div>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });
  if (totalEl) {
    totalEl.innerHTML = `Total: $${total.toFixed(2)}`;
  }
  if (actionsEl) {
    actionsEl.innerHTML = `
      <a href="menu.html" class="btn">Continue Shopping</a>
      <button class="btn checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
    `;
  }
}

function proceedToCheckout() {
   window.location.href = 'checkout.html';
}

function renderOrderSummary() {
  const cart = getCart();
  const container = document.getElementById('order-items');
  const totalEl = document.getElementById('order-total');
  if (!container) return;
  container.innerHTML = '';
  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    container.innerHTML += `
      <div class="order-item">
        <span>${item.title} x${item.quantity}</span>
        <span>$${itemTotal.toFixed(2)}</span>
      </div>
    `;
  });
  if (totalEl) {
    totalEl.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  }
}

document.querySelectorAll(".review").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.05)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });
});


document.addEventListener("DOMContentLoaded", () => {

    // Highlight current page in navbar
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar nav a');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });

    /*
       ADD TO CART (BUTTONS)*/
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains('add-to-cart')) {
        const card = e.target.closest('.menu-card') || e.target.closest('.card');
        if (card) {
          const item = {
            title: card.dataset.title,
            price: parseFloat(card.dataset.price),
            image: card.dataset.image || ''
          };
          addToCart(item);
        }
      }
    });

    // Update cart count
    updateCartCount();

    // Render cart if on cart page
    if (document.getElementById('cart-items')) {
      renderCart();
    }

    // Render order summary if on checkout page
    if (document.getElementById('order-items')) {
      renderOrderSummary();
    }

  /* 
     REVIEW HOVER EFFECT
  */
  document.querySelectorAll(".review").forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.05)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1)";
    });
  });

  /*
     NEWSLETTER*/
  const newsletterBtn = document.querySelector(".newsletter button");
  const newsletterEmail = document.querySelector(".newsletter input");

  if (newsletterBtn) {
    newsletterBtn.addEventListener("click", () => {
      handleSubscribe(newsletterEmail);
    });
  }

  /*
     FOOTER SUBSCRIBE
 */
  const footerBtn = document.querySelector(".footer button");
  const footerEmail = document.querySelector(".footer input");

  if (footerBtn) {
    footerBtn.addEventListener("click", () => {
      handleSubscribe(footerEmail);
    });
  }

  /*
     SMOOTH SCROLL*/
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

});

/* 
   SUBSCRIBE FUNCTION*/
function handleSubscribe(input) {
  const email = input.value.trim();

  if (email === "") {
    alert("enter your email geli ");
    return;
  }

  if (!validateEmail(email)) {
    alert("enter correct Email");
    return;
  }

  localStorage.setItem("subscriberEmail", email);
  alert("Waad ku mahadsan tahay isdiiwaangelinta ");
  input.value = "";
}

/* 
   EMAIL VALIDATION*/
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}



document.addEventListener("DOMContentLoaded", () => {
   const form = document.getElementById("contactForm");

   if (form) {
     form.addEventListener("submit", (e) => {
       e.preventDefault();

       const fields = form.querySelectorAll("input, textarea");
       let valid = true;

       fields.forEach(field => {
         if (field.value.trim() === "") {
           field.style.border = "1px solid red";
           valid = false;
         } else {
           field.style.border = "1px solid #ddd";
         }
       });

       if (!valid) {
         alert("enter your infromation ");
         return;
       }


       alert("successfuly your info");

       form.reset();
     });
   }

   const checkoutForm = document.getElementById("checkoutForm");

   if (checkoutForm) {
     checkoutForm.addEventListener("submit", (e) => {
       e.preventDefault();

       const fields = checkoutForm.querySelectorAll("input[required]");
       let valid = true;

       fields.forEach(field => {
         if (field.value.trim() === "") {
           field.style.border = "1px solid red";
           valid = false;
         } else {
           field.style.border = "1px solid #ddd";
         }
       });

       if (!valid) {
         alert("Please fill in all required fields");
         return;
       }

       // Simulate payment processing
       alert("Payment successful! Your order has been placed.");
       localStorage.removeItem('cart'); // Clear cart
       window.location.href = 'index.html'; // Redirect to home
     });
   }
 });
