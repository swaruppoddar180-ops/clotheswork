// ============================
// PRICE COMPARISON (from products.js database)
// ============================

const PRICE_COMPARISON = {};
PRODUCTS.forEach(p => {
    PRICE_COMPARISON[p.name] = { query: p.query, sites: p.sites };
});


// ============================
// PRODUCT GRID (renders from products.js)
// ============================

function renderGrid() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    grid.innerHTML = "";

    PRODUCTS.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.category = p.category;

        card.innerHTML =
            '<div class="product-image">' +
                '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">' +
                (p.tag ? '<span class="tag">' + p.tag + '</span>' : '') +
                '<button type="button" class="wishlist" aria-label="Add to wishlist">\u2661</button>' +
            '</div>' +
            '<div class="product-info">' +
                '<p>' + p.catLabel + ' \u00B7 ' + p.brand.toUpperCase() + '</p>' +
                '<h3>' + p.name + '</h3>' +
                '<p class="rating">\u2605 ' + p.rating.toFixed(1) + '</p>' +
                '<div class="price">\u20B9' + p.price.toLocaleString("en-IN") + '</div>' +
                '<div class="buy-actions">' +
                    '<button class="add-cart" data-name="' + p.name + '" data-price="' + p.price + '">ADD TO CART</button>' +
                    '<button class="buy-now" data-name="' + p.name + '" data-price="' + p.price + '">BUY NOW</button>' +
                '</div>' +
            '</div>';

        grid.appendChild(card);
    });
}

renderGrid();


function bestDealFor(productName) {
    const entry = PRICE_COMPARISON[productName];
    if (!entry) return null;
    return entry.sites.reduce((a, b) => (b.price < a.price ? b : a));
}


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
            `mailto:norevclothing@gmail.com?subject=${encodeURIComponent("New Order Request")}&body=${encodeURIComponent(orderBody)}`;

        window.location.href = mailtoLink;

        alert("Your order details are ready to send to norevclothing@gmail.com.");
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

const contactStatus =
    document.getElementById("contactStatus");

function setContactStatus(text) {
    if (contactStatus) contactStatus.textContent = text;
}

function openMailClient(link) {
    const a = document.createElement("a");
    a.href = link;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
}

if (contactForm) {

contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "Customer").trim();
        const email = String(formData.get("email") || "").trim();
        const subject = String(formData.get("subject") || "New enquiry").trim();
        const message = String(formData.get("message") || "").trim();

        if (!name || !email || !message) {
            setContactStatus("Please fill your name, email and message.");
            return;
        }

        const body =
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        const mailtoLink =
            `mailto:norevclothing@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Deliver straight to your inbox first (free, no backend).
        // If that fails, fall back to the visitor's email app.
        setContactStatus("Sending...");

        fetch("https://formsubmit.co/ajax/norevclothing@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message,
                _captcha: "false"
            })
        })
        .then(response => response.json())
        .then(() => {
            setContactStatus("Enquiry sent! We reply within 24 hours.");
            contactForm.reset();
        })
        .catch(() => {
            openMailClient(mailtoLink);
            setContactStatus("Email app opened — press Send to deliver your enquiry.");
        });

    }
);

}


// ============================
// SIGN UP / LOG IN (device-local demo accounts.
// For real cross-device accounts, connect Firebase/Supabase.)
// ============================

const authBtn = document.getElementById("authBtn");
const authOverlay = document.getElementById("authOverlay");
const authModal = document.getElementById("authModal");
const closeAuth = document.getElementById("closeAuth");
const tabSignup = document.getElementById("tabSignup");
const tabLogin = document.getElementById("tabLogin");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const authForms = document.getElementById("authForms");
const authAccount = document.getElementById("authAccount");
const authSummary = document.getElementById("authSummary");
const authStatus = document.getElementById("authStatus");
const logoutBtn = document.getElementById("logoutBtn");
const authTitle = document.getElementById("authTitle");

function readUsers() {
    try { return JSON.parse(localStorage.getItem("norev_users") || "{}"); }
    catch (err) { return {}; }
}

function writeUsers(users) {
    localStorage.setItem("norev_users", JSON.stringify(users));
}

function currentUserEmail() {
    return localStorage.getItem("norev_session") || "";
}

function hashPw(text) {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < text.length; i++) {
        const ch = text.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h2 >>> 0).toString(16) + (h1 >>> 0).toString(16);
}

function setAuthStatus(text) {
    if (authStatus) authStatus.textContent = text;
}

function showAuthTab(which) {
    const signup = which === "signup";
    if (tabSignup) tabSignup.classList.toggle("active", signup);
    if (tabLogin) tabLogin.classList.toggle("active", !signup);
    if (signupForm) signupForm.hidden = !signup;
    if (loginForm) loginForm.hidden = signup;
    if (authTitle) authTitle.textContent = signup ? "Sign up" : "Log in";
    setAuthStatus("");
}

function refreshAuthUI() {
    const users = readUsers();
    const email = currentUserEmail();
    const user = (email && users[email]) ? users[email] : null;
    if (authForms) authForms.hidden = !!user;
    if (authAccount) authAccount.hidden = !user;
    if (authTitle) authTitle.textContent = user ? "My account" : "Sign up";
    if (user && authSummary) {
        authSummary.textContent = `${user.name} (${email})`;
    }
    if (authBtn) authBtn.textContent = user ? `👤 ${user.name.split(" ")[0]}` : "👤";
}

function openAuth() {
    if (!authModal || !authOverlay) return;
    refreshAuthUI();
    authOverlay.classList.add("active");
    authModal.classList.add("active");
}

function closeAuthModal() {
    if (authOverlay) authOverlay.classList.remove("active");
    if (authModal) authModal.classList.remove("active");
    setAuthStatus("");
}

if (authBtn) authBtn.addEventListener("click", openAuth);
if (closeAuth) closeAuth.addEventListener("click", closeAuthModal);
if (authOverlay) authOverlay.addEventListener("click", closeAuthModal);
if (tabSignup) tabSignup.addEventListener("click", () => showAuthTab("signup"));
if (tabLogin) tabLogin.addEventListener("click", () => showAuthTab("login"));

if (signupForm) signupForm.addEventListener("submit", event => {
    event.preventDefault();
    const fd = new FormData(signupForm);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim().toLowerCase();
    const pw = String(fd.get("password") || "");
    if (!name || !email || pw.length < 4) {
        setAuthStatus("Fill all fields (password min 4 characters).");
        return;
    }
    const users = readUsers();
    if (users[email]) {
        setAuthStatus("Account exists — please log in.");
        showAuthTab("login");
        return;
    }
    users[email] = { name: name, hash: hashPw(pw) };
    writeUsers(users);
    localStorage.setItem("norev_session", email);
    signupForm.reset();
    refreshAuthUI();
    setAuthStatus(`Welcome, ${name}! Account created.`);
});

if (loginForm) loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const fd = new FormData(loginForm);
    const email = String(fd.get("email") || "").trim().toLowerCase();
    const pw = String(fd.get("password") || "");
    const users = readUsers();
    if (!users[email] || users[email].hash !== hashPw(pw)) {
        setAuthStatus("Wrong email or password.");
        return;
    }
    localStorage.setItem("norev_session", email);
    loginForm.reset();
    refreshAuthUI();
    setAuthStatus(`Welcome back, ${users[email].name}!`);
});

if (logoutBtn) logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("norev_session");
    refreshAuthUI();
    showAuthTab("login");
    setAuthStatus("Logged out.");
});

refreshAuthUI();


// ============================
// PRICE COMPARE BOXES + SORT
// ============================

function storePriceForCard(card) {
    const btn = card.querySelector(".add-cart");
    return btn ? Number(btn.dataset.price) : 0;
}

function productNameForCard(card) {
    const btn = card.querySelector(".add-cart");
    if (btn) return btn.dataset.name;
    const h3 = card.querySelector("h3");
    return h3 ? h3.textContent.trim() : "";
}

function renderCompareBoxes() {
    document.querySelectorAll(".product-card").forEach(card => {
        const name = productNameForCard(card);
        const info = card.querySelector(".product-info");
        if (!info || info.querySelector(".compare-toggle")) return;

        const best = bestDealFor(name);

        const bestLine = document.createElement("p");
        bestLine.className = "best-deal-line";
        if (best) {
            bestLine.textContent = `Best deal: Rs.${best.price.toLocaleString("en-IN")} at ${best.site}`;
        }
        const priceEl = info.querySelector(".price");
        priceEl.after(bestLine);

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "compare-toggle";
        toggle.textContent = "COMPARE PRICES";
        bestLine.after(toggle);

        const box = document.createElement("div");
        box.className = "compare-box";
        toggle.after(box);

        const entry = PRICE_COMPARISON[name];
        if (!entry) {
            box.innerHTML = `<p class="empty">No comparison data yet.</p>`;
        } else {
            const rows = [...entry.sites].sort((a, b) => a.price - b.price);
            box.innerHTML = rows.map((s, i) => {
                const off = s.mrp > s.price
                    ? Math.round((1 - s.price / s.mrp) * 100)
                    : 0;
                return `
                <div class="compare-row${i === 0 ? " best" : ""}">
                    <div class="compare-top">
                        <strong>${s.site}</strong>
                        ${i === 0 ? `<span class="best-badge">BEST DEAL</span>` : ""}
                        <a href="${s.url}" target="_blank" rel="noopener noreferrer">View</a>
                    </div>
                    <div class="compare-price">Rs.${s.price.toLocaleString("en-IN")}${off ? ` <span class="compare-off">${off}% off (MRP Rs.${s.mrp.toLocaleString("en-IN")})</span>` : ""}</div>
                    <div class="compare-offer">Card: ${s.cardOffer}</div>
                    <div class="compare-offer">Festive: ${s.festiveOffer}</div>
                </div>`;
            }).join("");
        }

        toggle.addEventListener("click", () => {
            box.classList.toggle("open");
            toggle.textContent = box.classList.contains("open") ? "HIDE COMPARISON" : "COMPARE PRICES";
        });
    });
}

function sortProducts(mode) {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    const cards = [...grid.querySelectorAll(".product-card")];
    if (mode === "store-asc") {
        cards.sort((a, b) => storePriceForCard(a) - storePriceForCard(b));
    } else if (mode === "best-asc") {
        cards.sort((a, b) => {
            const ba = bestDealFor(productNameForCard(a));
            const bb = bestDealFor(productNameForCard(b));
            return (ba ? ba.price : 1e12) - (bb ? bb.price : 1e12);
        });
    } else {
        return;
    }
    cards.forEach(c => grid.appendChild(c));
}

renderCompareBoxes();

const sortSelect = document.getElementById("sortSelect");
if (sortSelect) {
    sortSelect.addEventListener("change", () => {
        if (sortSelect.value === "default") {
            window.location.reload();
            return;
        }
        sortProducts(sortSelect.value);
    });
}