// ============================================================
// NOREV product database — ADD / EDIT PRODUCTS HERE.
// The shop grid, filters, search, compare boxes, best-deal
// badges and sorting all render from this one file.
// Prices on Amazon / Flipkart / Myntra are SAMPLE values you
// maintain by hand (those sites offer no free public price
// API for frontend use). "View" links open each site's
// search results for the product.
// Categories used by filters: tshirt, shirt, cargo,
// underwear, hoodie, jacket
// ============================================================

const IMG = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;
const Q = (s) => s.split(" ").join("+");
const AMZ = (q) => `https://www.amazon.in/s?k=${Q(q)}`;
const FLP = (q) => `https://www.flipkart.com/search?q=${Q(q)}`;
const MYN = (q) => `https://www.myntra.com/search?q=${Q(q)}`;

const FIRST_ORDER = "First order: delivery + platform fee waived";

// S(site, price, mrp, cardOffer, festiveOffer, url)
function S(site, price, mrp, cardOffer, festiveOffer, url) {
    return { site, price, mrp, cardOffer, festiveOffer, url };
}

const PRODUCTS = [
    {
        id: "tee-white-essential", name: "Essential White Tee",
        brand: "NOREV Essentials", category: "tshirt", catLabel: "T-SHIRT",
        price: 599, mrp: 899, tag: "NEW", rating: 4.6,
        img: IMG("photo-1620799140408-edc6dcb6d633"),
        query: "white cotton t-shirt men",
        sites: [
            S("NOREV Store", 599, 899, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 649, 999, "10% off HDFC Bank cards", "Diwali Sale: extra 5% off", AMZ("white cotton t-shirt men")),
            S("Flipkart", 629, 999, "10% off ICICI Bank cards", "Big Billion Days: extra Rs.50 off", FLP("white cotton t-shirt men")),
            S("Myntra", 699, 1099, "15% off Kotak cards", "End of Season: extra 10% off", MYN("white cotton t-shirt men"))
        ]
    },
    {
        id: "cargo-urban-set", name: "Urban Cargo Set",
        brand: "NOREV Urban", category: "cargo", catLabel: "JEANS & CARGOS",
        price: 2999, mrp: 3999, tag: "POPULAR", rating: 4.7,
        img: IMG("photo-1584865288642-42078afe6942"),
        query: "cargo pants men",
        sites: [
            S("NOREV Store", 2999, 3999, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 2799, 3499, "10% off SBI cards", "Diwali Sale: extra 5% off", AMZ("cargo pants men")),
            S("Flipkart", 2899, 3599, "10% off Axis Bank cards", "Big Billion Days: extra Rs.100 off", FLP("cargo pants men")),
            S("Myntra", 3199, 4299, "15% off HDFC Bank cards", "End of Season: extra 10% off", MYN("cargo pants men"))
        ]
    },
    {
        id: "cargo-dark-classic", name: "Classic Dark Cargo",
        brand: "NOREV Classic", category: "cargo", catLabel: "JEANS & CARGOS",
        price: 1999, mrp: 2799, tag: null, rating: 4.5,
        img: IMG("photo-1542272604-787c3835535d"),
        query: "dark blue jeans men",
        sites: [
            S("NOREV Store", 1999, 2799, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 2149, 2699, "10% off HDFC Bank cards", "Diwali Sale: extra 5% off", AMZ("dark blue jeans men")),
            S("Flipkart", 1899, 2499, "10% off ICICI Bank cards", "Big Billion Days: extra Rs.75 off", FLP("dark blue jeans men")),
            S("Myntra", 2099, 2899, "15% off Kotak cards", "End of Season: extra 10% off", MYN("dark blue jeans men"))
        ]
    },
    {
        id: "shirt-formal-classic", name: "Classic Formal Shirt",
        brand: "NOREV Classic", category: "shirt", catLabel: "SHIRTS",
        price: 1999, mrp: 2799, tag: "SALE", rating: 4.6,
        img: IMG("photo-1603252109303-2751441dd157"),
        query: "white formal shirt men",
        sites: [
            S("NOREV Store", 1999, 2799, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 1799, 2299, "10% off SBI cards", "Diwali Sale: extra 5% off", AMZ("white formal shirt men")),
            S("Flipkart", 1849, 2399, "10% off Axis Bank cards", "Big Billion Days: extra Rs.75 off", FLP("white formal shirt men")),
            S("Myntra", 1999, 2699, "15% off HDFC Bank cards", "End of Season: extra 10% off", MYN("white formal shirt men"))
        ]
    },
    {
        id: "underwear-cotton-pack", name: "Comfort Cotton Pack",
        brand: "NOREV Essentials", category: "underwear", catLabel: "UNDERWEAR",
        price: 899, mrp: 1299, tag: null, rating: 4.4,
        img: IMG("photo-1523381210434-271e8be1f52b"),
        query: "men cotton briefs pack",
        sites: [
            S("NOREV Store", 899, 1299, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 949, 1299, "10% off HDFC Bank cards", "Diwali Sale: extra 5% off", AMZ("men cotton briefs pack")),
            S("Flipkart", 849, 1199, "10% off ICICI Bank cards", "Big Billion Days: extra Rs.30 off", FLP("men cotton briefs pack")),
            S("Myntra", 999, 1399, "15% off Kotak cards", "End of Season: extra 10% off", MYN("men cotton briefs pack"))
        ]
    },
    {
        id: "tee-black-midnight", name: "Midnight Black Tee",
        brand: "NOREV Essentials", category: "tshirt", catLabel: "T-SHIRT",
        price: 649, mrp: 999, tag: null, rating: 4.5,
        img: IMG("photo-1583743814966-8936f5b7be1a"),
        query: "black cotton t-shirt men",
        sites: [
            S("NOREV Store", 649, 999, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 699, 1099, "10% off SBI cards", "Diwali Sale: extra 5% off", AMZ("black cotton t-shirt men")),
            S("Flipkart", 619, 999, "10% off Axis Bank cards", "Big Billion Days: extra Rs.50 off", FLP("black cotton t-shirt men")),
            S("Myntra", 749, 1199, "15% off HDFC Bank cards", "End of Season: extra 10% off", MYN("black cotton t-shirt men"))
        ]
    },
    {
        id: "tee-oversized-graphic", name: "Oversized Graphic Tee",
        brand: "NOREV Street", category: "tshirt", catLabel: "T-SHIRT",
        price: 799, mrp: 1299, tag: "NEW", rating: 4.4,
        img: IMG("photo-1576566588028-4147f3842f27"),
        query: "oversized graphic t-shirt men",
        sites: [
            S("NOREV Store", 799, 1299, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 759, 1249, "10% off HDFC Bank cards", "Diwali Sale: extra 5% off", AMZ("oversized graphic t-shirt men")),
            S("Flipkart", 829, 1299, "10% off ICICI Bank cards", "Big Billion Days: extra Rs.50 off", FLP("oversized graphic t-shirt men")),
            S("Myntra", 899, 1399, "15% off Kotak cards", "End of Season: extra 10% off", MYN("oversized graphic t-shirt men"))
        ]
    },
    {
        id: "shirt-linen-casual", name: "Linen Casual Shirt",
        brand: "NOREV Classic", category: "shirt", catLabel: "SHIRTS",
        price: 1499, mrp: 2199, tag: null, rating: 4.7,
        img: IMG("photo-1596755094514-f87e34085b2c"),
        query: "linen casual shirt men",
        sites: [
            S("NOREV Store", 1499, 2199, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 1549, 2299, "10% off SBI cards", "Diwali Sale: extra 5% off", AMZ("linen casual shirt men")),
            S("Flipkart", 1499, 2199, "10% off Axis Bank cards", "Big Billion Days: extra Rs.75 off", FLP("linen casual shirt men")),
            S("Myntra", 1399, 2099, "15% off HDFC Bank cards", "End of Season: extra 10% off", MYN("linen casual shirt men"))
        ]
    },
    {
        id: "jacket-denim-trucker", name: "Denim Trucker Jacket",
        brand: "NOREV Urban", category: "jacket", catLabel: "JACKETS",
        price: 2499, mrp: 3499, tag: "POPULAR", rating: 4.6,
        img: IMG("photo-1544022613-e87ca75a784a"),
        query: "denim jacket men",
        sites: [
            S("NOREV Store", 2499, 3499, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 2399, 3399, "10% off HDFC Bank cards", "Diwali Sale: extra 5% off", AMZ("denim jacket men")),
            S("Flipkart", 2549, 3599, "10% off ICICI Bank cards", "Big Billion Days: extra Rs.100 off", FLP("denim jacket men")),
            S("Myntra", 2699, 3799, "15% off Kotak cards", "End of Season: extra 10% off", MYN("denim jacket men"))
        ]
    },
    {
        id: "jacket-leather-biker", name: "Leather Biker Jacket",
        brand: "NOREV Urban", category: "jacket", catLabel: "JACKETS",
        price: 4999, mrp: 7999, tag: null, rating: 4.8,
        img: IMG("photo-1551028719-00167b16eac5"),
        query: "leather jacket men",
        sites: [
            S("NOREV Store", 4999, 7999, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 5199, 8299, "10% off SBI cards", "Diwali Sale: extra 5% off", AMZ("leather jacket men")),
            S("Flipkart", 4899, 7899, "10% off Axis Bank cards", "Big Billion Days: extra Rs.150 off", FLP("leather jacket men")),
            S("Myntra", 5299, 8499, "15% off HDFC Bank cards", "End of Season: extra 10% off", MYN("leather jacket men"))
        ]
    },
    {
        id: "hoodie-fleece-pullover", name: "Fleece Pullover Hoodie",
        brand: "NOREV Street", category: "hoodie", catLabel: "HOODIES",
        price: 1299, mrp: 1999, tag: null, rating: 4.5,
        img: IMG("photo-1556821840-3a63f95609a7"),
        query: "fleece hoodie men",
        sites: [
            S("NOREV Store", 1299, 1999, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 1249, 1949, "10% off HDFC Bank cards", "Diwali Sale: extra 5% off", AMZ("fleece hoodie men")),
            S("Flipkart", 1349, 2049, "10% off ICICI Bank cards", "Big Billion Days: extra Rs.75 off", FLP("fleece hoodie men")),
            S("Myntra", 1399, 2099, "15% off Kotak cards", "End of Season: extra 10% off", MYN("fleece hoodie men"))
        ]
    },
    {
        id: "jeans-slim-stretch", name: "Slim-Fit Stretch Jeans",
        brand: "NOREV Urban", category: "cargo", catLabel: "JEANS & CARGOS",
        price: 1799, mrp: 2599, tag: "SALE", rating: 4.6,
        img: IMG("photo-1541099649105-f69ad21f3246"),
        query: "slim fit stretch jeans men",
        sites: [
            S("NOREV Store", 1799, 2599, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 1899, 2699, "10% off SBI cards", "Diwali Sale: extra 5% off", AMZ("slim fit stretch jeans men")),
            S("Flipkart", 1699, 2499, "10% off Axis Bank cards", "Big Billion Days: extra Rs.75 off", FLP("slim fit stretch jeans men")),
            S("Myntra", 1949, 2799, "15% off HDFC Bank cards", "End of Season: extra 10% off", MYN("slim fit stretch jeans men"))
        ]
    },
    {
        id: "trousers-beige-chino", name: "Beige Chino Trousers",
        brand: "NOREV Classic", category: "cargo", catLabel: "JEANS & CARGOS",
        price: 1599, mrp: 2299, tag: null, rating: 4.4,
        img: IMG("photo-1624378439575-d8705ad7ae80"),
        query: "beige chinos men",
        sites: [
            S("NOREV Store", 1599, 2299, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 1649, 2399, "10% off HDFC Bank cards", "Diwali Sale: extra 5% off", AMZ("beige chinos men")),
            S("Flipkart", 1599, 2299, "10% off ICICI Bank cards", "Big Billion Days: extra Rs.75 off", FLP("beige chinos men")),
            S("Myntra", 1499, 2199, "15% off Kotak cards", "End of Season: extra 10% off", MYN("beige chinos men"))
        ]
    },
    {
        id: "shirt-oxford-white", name: "Oxford White Shirt",
        brand: "NOREV Essentials", category: "shirt", catLabel: "SHIRTS",
        price: 1199, mrp: 1799, tag: null, rating: 4.7,
        img: IMG("photo-1562157873-818bc0726f68"),
        query: "oxford white shirt men",
        sites: [
            S("NOREV Store", 1199, 1799, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 1149, 1749, "10% off SBI cards", "Diwali Sale: extra 5% off", AMZ("oxford white shirt men")),
            S("Flipkart", 1249, 1849, "10% off Axis Bank cards", "Big Billion Days: extra Rs.50 off", FLP("oxford white shirt men")),
            S("Myntra", 1299, 1899, "15% off HDFC Bank cards", "End of Season: extra 10% off", MYN("oxford white shirt men"))
        ]
    },
    {
        id: "shirt-flannel-check", name: "Flannel Check Shirt",
        brand: "NOREV Street", category: "shirt", catLabel: "SHIRTS",
        price: 1399, mrp: 1999, tag: null, rating: 4.5,
        img: IMG("photo-1602810318383-e386cc2a3ccf"),
        query: "flannel check shirt men",
        sites: [
            S("NOREV Store", 1399, 1999, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 1449, 2099, "10% off HDFC Bank cards", "Diwali Sale: extra 5% off", AMZ("flannel check shirt men")),
            S("Flipkart", 1349, 1949, "10% off ICICI Bank cards", "Big Billion Days: extra Rs.50 off", FLP("flannel check shirt men")),
            S("Myntra", 1499, 2149, "15% off Kotak cards", "End of Season: extra 10% off", MYN("flannel check shirt men"))
        ]
    },
    {
        id: "tee-pique-polo", name: "Pique Polo Tee",
        brand: "NOREV Classic", category: "tshirt", catLabel: "T-SHIRT",
        price: 899, mrp: 1399, tag: null, rating: 4.3,
        img: IMG("photo-1571945153237-4929e783af4a"),
        query: "polo t-shirt men",
        sites: [
            S("NOREV Store", 899, 1399, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 949, 1449, "10% off SBI cards", "Diwali Sale: extra 5% off", AMZ("polo t-shirt men")),
            S("Flipkart", 899, 1399, "10% off Axis Bank cards", "Big Billion Days: extra Rs.40 off", FLP("polo t-shirt men")),
            S("Myntra", 849, 1299, "15% off HDFC Bank cards", "End of Season: extra 10% off", MYN("polo t-shirt men"))
        ]
    },
    {
        id: "underwear-trunk-pack", name: "Cotton Trunk Pack of 3",
        brand: "NOREV Essentials", category: "underwear", catLabel: "UNDERWEAR",
        price: 799, mrp: 1199, tag: null, rating: 4.4,
        img: IMG("photo-1489987707025-afc232f7ea0f"),
        query: "men cotton trunks pack",
        sites: [
            S("NOREV Store", 799, 1199, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 849, 1249, "10% off HDFC Bank cards", "Diwali Sale: extra 5% off", AMZ("men cotton trunks pack")),
            S("Flipkart", 769, 1149, "10% off ICICI Bank cards", "Big Billion Days: extra Rs.30 off", FLP("men cotton trunks pack")),
            S("Myntra", 899, 1299, "15% off Kotak cards", "End of Season: extra 10% off", MYN("men cotton trunks pack"))
        ]
    },
    {
        id: "jacket-winter-parka", name: "Winter Parka Jacket",
        brand: "NOREV Urban", category: "jacket", catLabel: "JACKETS",
        price: 3999, mrp: 5999, tag: "NEW", rating: 4.7,
        img: IMG("photo-1591047139829-d91aecb6caea"),
        query: "winter parka jacket men",
        sites: [
            S("NOREV Store", 3999, 5999, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 3849, 5849, "10% off SBI cards", "Diwali Sale: extra 5% off", AMZ("winter parka jacket men")),
            S("Flipkart", 4099, 6149, "10% off Axis Bank cards", "Big Billion Days: extra Rs.150 off", FLP("winter parka jacket men")),
            S("Myntra", 4199, 6299, "15% off HDFC Bank cards", "End of Season: extra 10% off", MYN("winter parka jacket men"))
        ]
    },
    {
        id: "hoodie-hooded-sweatshirt", name: "Hooded Sweatshirt",
        brand: "NOREV Street", category: "hoodie", catLabel: "HOODIES",
        price: 1199, mrp: 1799, tag: "POPULAR", rating: 4.5,
        img: IMG("photo-1611312449408-fcece27cdbb7"),
        query: "hooded sweatshirt men",
        sites: [
            S("NOREV Store", 1199, 1799, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 1249, 1849, "10% off HDFC Bank cards", "Diwali Sale: extra 5% off", AMZ("hooded sweatshirt men")),
            S("Flipkart", 1149, 1749, "10% off ICICI Bank cards", "Big Billion Days: extra Rs.50 off", FLP("hooded sweatshirt men")),
            S("Myntra", 1299, 1899, "15% off Kotak cards", "End of Season: extra 10% off", MYN("hooded sweatshirt men"))
        ]
    },
    {
        id: "tee-relaxed-fit", name: "Relaxed Fit Tee",
        brand: "NOREV Essentials", category: "tshirt", catLabel: "T-SHIRT",
        price: 549, mrp: 849, tag: "SALE", rating: 4.2,
        img: IMG("photo-1618354691373-d851c5c3a990"),
        query: "relaxed fit t-shirt men",
        sites: [
            S("NOREV Store", 549, 849, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 599, 899, "10% off SBI cards", "Diwali Sale: extra 5% off", AMZ("relaxed fit t-shirt men")),
            S("Flipkart", 579, 879, "10% off Axis Bank cards", "Big Billion Days: extra Rs.30 off", FLP("relaxed fit t-shirt men")),
            S("Myntra", 649, 949, "15% off HDFC Bank cards", "End of Season: extra 10% off", MYN("relaxed fit t-shirt men"))
        ]
    },
    {
        id: "blazer-slim-tailored", name: "Tailored Slim Blazer",
        brand: "NOREV Classic", category: "jacket", catLabel: "JACKETS",
        price: 3499, mrp: 5499, tag: null, rating: 4.6,
        img: IMG("photo-1594938298603-c8148c4dae35"),
        query: "slim fit blazer men",
        sites: [
            S("NOREV Store", 3499, 5499, "—", FIRST_ORDER, "#shop"),
            S("Amazon", 3399, 5399, "10% off HDFC Bank cards", "Diwali Sale: extra 5% off", AMZ("slim fit blazer men")),
            S("Flipkart", 3549, 5599, "10% off ICICI Bank cards", "Big Billion Days: extra Rs.150 off", FLP("slim fit blazer men")),
            S("Myntra", 3299, 5299, "15% off Kotak cards", "End of Season: extra 10% off", MYN("slim fit blazer men"))
        ]
    }
];
