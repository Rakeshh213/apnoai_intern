
/* =========================================
   1. SELECT HTML ELEMENTS
========================================= */

// Select navigation menu
const navMenu = document.querySelector(".nav-menu");

// Select all navigation links
const navLinks = document.querySelectorAll(".nav-menu a");

// Select header
const header = document.querySelector(".header");



/* =========================================
   2. MOBILE NAVIGATION
========================================= */

// Create mobile menu button
const menuButton = document.createElement("button");

menuButton.className = "menu-toggle";

menuButton.innerHTML = "☰";

menuButton.setAttribute("aria-label", "Toggle navigation");

menuButton.setAttribute("aria-expanded", "false");

// Add button inside navbar
document.querySelector(".navbar").appendChild(menuButton);


// Open and close mobile menu
menuButton.addEventListener("click", function () {

    navMenu.classList.toggle("active");

    const isOpen = navMenu.classList.contains("active");

    menuButton.innerHTML = isOpen ? "✕" : "☰";

    menuButton.setAttribute("aria-expanded", isOpen);

});


// Close menu after clicking a navigation link
navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

        menuButton.innerHTML = "☰";

        menuButton.setAttribute("aria-expanded", "false");

    });

});



/* =========================================
   3. HEADER SCROLL EFFECT
========================================= */

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



/* =========================================
   4. MENU CARD ANIMATION
========================================= */

const menuCards = document.querySelectorAll(".menu-card");

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});


// Observe all menu cards
menuCards.forEach(function (card) {

    observer.observe(card);

});



/* =========================================
   5. GALLERY IMAGE CLICK EFFECT
========================================= */

const galleryImages = document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(function (image) {

    image.addEventListener("click", function () {

        window.open(image.src, "_blank");

    });

});



/* =========================================
   6. CURRENT YEAR IN FOOTER
========================================= */

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML =
        `© ${new Date().getFullYear()} Mishra Restaurant. All Rights Reserved.`;

}



/* =========================================
   7. WELCOME MESSAGE
========================================= */

console.log("Welcome to Mishra Restaurant!");

console.log("Website loaded successfully.");


// WhatsApp Order System

const restaurantNumber = "919876543210";

 

menuCards.forEach((card) => {
    const foodName = card.querySelector("h3, h4").innerText;
    const foodPrice = card.querySelector("span").innerText;

    const orderButton = document.createElement("button");

    orderButton.innerText = "Order on WhatsApp";
    orderButton.className = "order-btn";

    orderButton.addEventListener("click", () => {
        const message = `Hello Mishra Restaurant!

I want to order:
Food: ${foodName}
Price: ${foodPrice}

Please confirm my order.`;

        const whatsappURL =
            `https://wa.me/${restaurantNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");
    });

    card.querySelector(".menu-card-content").appendChild(orderButton);
});





// Shopping Cart System

let cart = [];

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalItems = document.getElementById("total-items");
const cartTotal = document.getElementById("cart-total");

 
// Shopping Cart System

let cart = [];

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalItems = document.getElementById("total-items");
const cartTotal = document.getElementById("cart-total");

// Add to Cart
document.querySelectorAll(".add-to-cart-btn").forEach(button => {

    button.addEventListener("click", function () {

        const name = this.dataset.name;
        const price = Number(this.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        displayCart();
        alert(name + " added to cart!");
    });

});

// Display Cart
function displayCart() {

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        cartItems.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>Price: ₹${item.price}</p>

                <button onclick="changeQuantity(${index}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>

                <button onclick="removeItem(${index})">Remove</button>

                <p>Subtotal: ₹${item.price * item.quantity}</p>
            </div>
        `;
    });

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    }

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartCount.textContent = count;
    totalItems.textContent = count;
    cartTotal.textContent = total;
}

// Quantity
function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();
}

// Remove Item
function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

// Initial Cart
displayCart();


// WhatsApp Checkout

const checkoutButton = document.getElementById("checkout-btn");

checkoutButton.addEventListener("click", function () {

    if (cart.length === 0) {
        alert("Your cart is empty! Please add some food.");
        return;
    }

    let message = "Hello Mishra Restaurant!\n\n";
    message += "My Food Order:\n\n";

    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    message += `\nTotal Amount: ₹${total}`;
    message += "\n\nPlease confirm my order.";

    const phoneNumber = "919876543210";

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
});
