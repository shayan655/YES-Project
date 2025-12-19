/* ================== DATA ================== */

const products = [
    {
        id:1,name:"CPU Intel Core i5",
        price:16000000,
        desc:"پردازنده مناسب گیم و کارهای روزمره",
        image:"./images/intel-i5.png"
    },
    {
        id:2,
        name:"CPU Intel Core i9",
        price:25000000,
        desc:"پردازنده قدرتمند حرفه‌ای",
        image:"./images/intel-i9.png"
    },
    {
        id:3,
        name:"CPU Ryzen 5",
        price:21000000,
        desc:"پردازنده اقتصادی AMD",
        image:"./images/cpu-ryzen-5.png"
    },
    {
        id:4,
        name:"GPU RTX 3060",
        price:48800000,
        desc:"کارت گرافیک گیمینگ",
        image:"./images/rtx-3060.png"
    },
    {
        id:5,
        name:"GPU RTX 4060",
        price:56000000,
        desc:"نسل جدید کارت گرافیک",
        image:"./images/rtx-4060.png"
    },
    {
        id:6,
        name:"RAM 16GB DDR5",
        price:3500000,
        desc:"رم پرسرعت",
        image:"./images/ram.png"
    },
    {
        id:7,
        name:"RAM 32GB DDR4",
        price:6500000,
        desc:"رم حرفه‌ای",
        image:"./images/ram-ddr4.png"
    },
    {
        id:8,
        name:"SSD 512GB NVMe",
        price:7800000,
        desc:"حافظه بسیار سریع",
        image:"./images/ssd-512-nvme.png"
    },
    {
        id:9,
        name:"SSD 1TB NVMe",
        price:10000000,
        desc:"حافظه پرظرفیت",
        image:"./images/ssd-1TB-nvme.png"
    },
    {
        id:10,
        name:"HDD 2TB",
        price:9900000,
        desc:"هارد ذخیره‌سازی",
        image:"./images/hdd-2TB.png"
    },
    {
        id:11,
        name:"Motherboard ASUS",
        price:11000000,
        desc:"مادربرد حرفه‌ای",
        image:"./images/motherboard-asus.png"
    },
    {
        id:12,
        name:"Power 750W",
        price:12000000,
        desc:"پاور قدرتمند",
        image:"./images/power-750w.png"
    },
    {
        id:13,
        name:"Case Gaming",
        price:8100000,
        desc:"کیس گیمینگ",
        image:"./images/case-gaming.png"
    },
    {
        id:14,
        name:"Monitor 27 inch",
        price:23900000,
        desc:"مانیتور فول اچ‌دی",
        image:"./images/monitor-27-inch.png"
    },
    {
        id:15,
        name:"Mechanical Keyboard",
        price:9300000,
        desc:"کیبورد مکانیکال RGB",
        image:"./images/mechanical-keyboard.png"
    }
];

/* ================== STATE ================== */

let cartItemsData = [];
let selectedProduct = null;

/* ================== ELEMENTS ================== */

const productList = document.getElementById("productList");
const cartElement = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPrice = document.getElementById("totalPrice");

const productModal = document.getElementById("productModal");
const modalBox = document.getElementById("modalBox");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalImage = document.getElementById("modalImage");

/* ================== RENDER PRODUCTS ================== */

products.forEach(p => {
    productList.innerHTML += `
        <div onclick="openModal(${p.id})"
             class="bg-gray-800 rounded-xl p-4 shadow
                    hover:shadow-xl hover:-translate-y-1
                    transition cursor-pointer">
            <img src="${p.image}" class="h-36 mx-auto mb-3">
            <h3 class="font-bold">${p.name}</h3>
            <p class="text-green-400">${p.price.toLocaleString()} تومان</p>
        </div>
    `;
});

/* ================== MODAL ================== */

function openModal(id) {
    selectedProduct = products.find(p => p.id === id);

    modalTitle.innerText = selectedProduct.name;
    modalDesc.innerText = selectedProduct.desc;
    modalPrice.innerText = selectedProduct.price.toLocaleString() + " تومان";
    modalImage.src = selectedProduct.image;

    productModal.classList.remove("hidden");
    productModal.classList.add("flex");

    setTimeout(() => {
        modalBox.classList.remove("scale-90", "opacity-0");
        modalBox.classList.add("scale-100", "opacity-100");
    }, 10);
}

function closeModal() {
    modalBox.classList.add("scale-90", "opacity-0");
    setTimeout(() => {
        productModal.classList.add("hidden");
        productModal.classList.remove("flex");
    }, 300);
}

/* ================== CART ================== */

function addToCartFromModal() {
    const item = cartItemsData.find(i => i.id === selectedProduct.id);

    if (item) {
        item.qty++;
    } else {
        cartItemsData.push({...selectedProduct, qty: 1});
    }

    updateCart();
    closeModal();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cartItemsData.forEach(item => {
        total += item.qty * item.price;

        cartItems.innerHTML += `
            <div class="flex items-center gap-3 bg-gray-700 p-3 rounded-lg">
                <img src="${item.image}" class="w-12 h-12 object-contain">
                <div class="flex-1">
                    <p class="font-bold">${item.name}</p>
                    <p class="text-sm text-gray-300">${item.price.toLocaleString()} تومان</p>
                </div>
                <div class="flex items-center gap-2">
                    <button class="px-2 bg-gray-600 rounded"
                            onclick="decreaseQty(${item.id})">-</button>
                    <span>${item.qty}</span>
                    <button class="px-2 bg-gray-600 rounded"
                            onclick="increaseQty(${item.id})">+</button>
                </div>
            </div>
        `;
    });

    cartCount.innerText = cartItemsData.reduce((s,i)=>s+i.qty,0);
    totalPrice.innerText = total.toLocaleString();
}

function increaseQty(id) {
    cartItemsData.find(i => i.id === id).qty++;
    updateCart();
}

function decreaseQty(id) {
    const item = cartItemsData.find(i => i.id === id);
    item.qty--;
    if (item.qty === 0) {
        cartItemsData = cartItemsData.filter(i => i.id !== id);
    }
    updateCart();
}

/* ================== CART TOGGLE (ANIMATION) ================== */

function toggleCart() {
    cartElement.classList.toggle("-translate-x-full");
}