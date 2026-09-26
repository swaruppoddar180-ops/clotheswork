// ============================
// MOBILE MENU
// ============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// ============================
// SEARCH
// ============================

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {

    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
        searchInput.focus();
    }

});


// SEARCH PRODUCTS

searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value.toLowerCase();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productName =
            product.querySelector("h3")
            .textContent
            .toLowerCase();

        if (productName.includes(searchValue)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }

    });

});


// ============================
// CATEGORY FILTER
// ============================

const filters =
    document.querySelectorAll(".filter");

const products =
    document.querySelectorAll(".product-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(btn =>
            btn.classList.remove("active")
        );

        filter.classList.add("active");

        const category =
            filter.dataset.category;

        products.forEach(product => {

            if (
                category === "all" ||
                product.dataset.category === category
            ) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }

        });

    });

});


// ============================
// WISHLIST
// ============================

const wishlistButtons =
    document.querySelectorAll(".wishlist");

wishlistButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.textContent = "♥";
        } else {
            button.textContent = "♡";
        }

    });

});


// ============================
// CART
// ============================

let cart = [];

const cartBtn =
    document.getElementById("cartBtn");

const cartElement =
    document.getElementById("cart");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


function openCart() {

    cartElement.classList.add("active");

    cartOverlay.classList.add("active");

}


function closeCartFunction() {

    cartElement.classList.remove("active");

    cartOverlay.classList.remove("active");

}


cartBtn.addEventListener(
    "click",
    openCart
);

closeCart.addEventListener(
    "click",
    closeCartFunction
);

cartOverlay.addEventListener(
    "click",
    closeCartFunction
);


// ADD TO CART

const addCartButtons =
    document.querySelectorAll(".add-cart");

function addToCart(productName, productPrice) {

    const existingProduct =
        cart.find(item =>
            item.name === productName
        );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: productName,
            price: Number(productPrice),
            quantity: 1
        });

    }

    updateCart();
    openCart();

}

addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        addToCart(
            button.dataset.name,
            button.dataset.price
        );

    });

});

const buyNowButtons =
    document.querySelectorAll(".buy-now");

function buyNow(productName, productPrice) {

    const item = {
        name: productName,
        price: Number(productPrice),
        quantity: 1
    };

    cart = [item];
    updateCart();
    openCheckoutModal(item.name, item.price * item.quantity);

}

buyNowButtons.forEach(button => {

    button.addEventListener("click", () => {

        buyNow(
            button.dataset.name,
            button.dataset.price
        );

    });

});


// UPDATE CART

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="empty">
                Your cart is empty.
            </p>`;

    }


    let total = 0;
    let count = 0;


    cart.forEach((item, index) => {

        total +=
            item.price * item.quantity;

        count += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";

        cartItem.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price}
                    × ${item.quantity}
                </p>

            </div>

            <button
                class="remove-item"
                onclick="removeItem(${index})"
            >
                Remove
            </button>

        `;

        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        total.toLocaleString("en-IN");

}


// REMOVE ITEM

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// ============================
// CHECKOUT
// ============================

const checkoutBtn =
    document.getElementById("checkoutBtn");

const buyNowBtn =
    document.getElementById("buyNowBtn");

const checkoutOverlay =
    document.getElementById("checkoutOverlay");

const checkoutModal =
    document.getElementById("checkoutModal");

const closeCheckout =
    document.getElementById("closeCheckout");

const checkoutSummary =
    document.getElementById("checkoutSummary");

const checkoutForm =
    document.getElementById("checkoutForm");

let checkoutProduct = null;

function openCheckoutModal(productName, productPrice) {

    checkoutProduct = {
        name: productName,
        price: Number(productPrice)
    };

    checkoutSummary.textContent =
        `Product: ${checkoutProduct.name} | Total: ₹${checkoutProduct.price}`;

    checkoutOverlay.classList.add("active");
    checkoutModal.classList.add("active");

}

function closeCheckoutModal() {

    checkoutOverlay.classList.remove("active");
    checkoutModal.classList.remove("active");
    checkoutForm.reset();
    checkoutProduct = null;

}

closeCheckout.addEventListener(
    "click",
    closeCheckoutModal
);

checkoutOverlay.addEventListener(
    "click",
    closeCheckoutModal
);

checkoutBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert("Your cart is empty!");
            return;

        }

        const cartItemsSummary = cart.map(item =>
            `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
        ).join("\n");

        checkoutProduct = {
            name: cartItemsSummary,
            price: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };

        checkoutSummary.textContent =
            `Product(s):\n${cartItemsSummary}\nTotal: ₹${checkoutProduct.price}`;

        checkoutOverlay.classList.add("active");
        checkoutModal.classList.add("active");

    }
);

buyNowBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert("Your cart is empty!");
            return;

        }

        const item = cart[0];
        openCheckoutModal(item.name, item.price * item.quantity);

    }
);

checkoutForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        if (!checkoutProduct) {
            alert("Please select a product first.");
            return;
        }

        const formData = new FormData(checkoutForm);
        const fullName = formData.get("fullName") || "Customer";
        const dob = formData.get("dob") || "Not provided";
        const phone = formData.get("phone") || "Not provided";
        const email = formData.get("email") || "Not provided";
        const address = formData.get("address") || "Not provided";

        const orderBody = [
            `Full Name: ${fullName}`,
            `Date of Birth: ${dob}`,
            `Contact No: ${phone}`,
            `Email ID: ${email}`,
            `Full Address: ${address}`,
            "",
            `Product: ${checkoutProduct.name}`,
            `Order Total: ₹${checkoutProduct.price}`,
            "",
            "Please confirm this order and proceed with delivery."
        ].join("\n");

        const mailtoLink =
            `mailto:orders@norev.in?subject=${encodeURIComponent("New Order Request")}&body=${encodeURIComponent(orderBody)}`;

        window.location.href = mailtoLink;

        alert("Your order details are ready to send to orders@norev.in.");
        closeCheckoutModal();

    }
);



// ============================
// DARK MODE
// ============================

const themeBtn =
    document.getElementById("themeBtn");

function applyTheme(theme) {

    const isDark = theme === "dark";

    document.body.classList.toggle("dark", isDark);

    themeBtn.textContent = isDark ? "☀" : "☾";
    themeBtn.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );

}

applyTheme("dark");

themeBtn.addEventListener(
    "click",
    () => {

        const nextTheme =
            document.body.classList.contains("dark")
                ? "light"
                : "dark";

        applyTheme(nextTheme);

    }
);


// ============================
// NEWSLETTER
// ============================

const newsletterForm =
    document.getElementById("newsletterForm");

newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            newsletterForm.querySelector("input[name='name']")?.value || "Customer";

        const email =
            newsletterForm.querySelector("input[name='email']")?.value || "";

        alert(
            `Thanks ${name}! You are signed up with ${email}.`
        );

        newsletterForm.reset();

    }
);


// ============================
// CONTACT FORM
// ============================

const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name") || "Customer";
        const email = formData.get("email") || "";
        const subject = formData.get("subject") || "New enquiry";
        const message = formData.get("message") || "";

        const mailtoLink =
            `mailto:enquiry@norev.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            )}`;

        window.location.href = mailtoLink;

        alert(
            "Your enquiry has been prepared for enquiry@norev.in."
        );

        contactForm.reset();

    }
);