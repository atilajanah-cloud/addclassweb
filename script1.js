// ===== 1. DATA UMKM =====
const links = [
    { 
        id: 1, 
        title: "Pesan via WhatsApp (Fast Response)", 
        subtitle: "Order biji kopi atau reservasi meja",
        url: "https://wa.me/6281234567890?text=Halo%20Kopi%20Seduh%20Nusantara,%20saya%20mau%20pesan", 
        category: "order", 
        icon: "💬",
        highlight: true // Tombol utama / promo
    },
    { 
        id: 2, 
        title: "Katalog & Menu Lengkap (PDF)", 
        subtitle: "Varian beans, espresso based & cemilan",
        url: "https://example.com/katalog-menu", 
        category: "order", 
        icon: "📖",
        highlight: false
    },
    { 
        id: 3, 
        title: "Official Store di Shopee", 
        subtitle: "Diskon ongkir seluruh Indonesia",
        url: "https://shopee.co.id", 
        category: "order", 
        icon: "🛒",
        highlight: false
    },
    { 
        id: 4, 
        title: "Petunjuk Arah Google Maps", 
        subtitle: "Jl. Melati No. 12, Senopati",
        url: "https://maps.google.com", 
        category: "info", 
        icon: "📍",
        highlight: false
    },
    { 
        id: 5, 
        title: "Instagram @kopiseduh.id", 
        subtitle: "Update jadwal seduh & event komunitas",
        url: "https://instagram.com", 
        category: "info", 
        icon: "📸",
        highlight: false
    },
    { 
        id: 6, 
        title: "Kritik, Saran & Kemitraan", 
        subtitle: "Hubungi tim manajemen kami",
        url: "mailto:halo@kopiseduh.id", 
        category: "info", 
        icon: "✉️",
        highlight: false
    }
];

// ===== 2. STYLE CLASS =====
const BASE_CARD_CLASSES = 
  "group flex items-center justify-between p-4 rounded-xl bg-white border border-amber-900/10 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-amber-600 focus-visible:outline-2 focus-visible:outline-amber-600";

const HIGHLIGHT_CLASSES = 
  "ring-2 ring-amber-500 bg-amber-50/40";

// ===== 3. RENDER FUNCTION =====
const linkList = document.getElementById("link-list");

function renderLinks(filterCategory = "all") {
    linkList.innerHTML = ""; // Bersihkan list sebelum render ulang

    const filtered = filterCategory === "all" 
        ? links 
        : links.filter(item => item.category === filterCategory);

    filtered.forEach(link => {
        const item = document.createElement("li");
        const anchor = document.createElement("a");

        anchor.href = link.url;
        anchor.className = `${BASE_CARD_CLASSES} ${link.highlight ? HIGHLIGHT_CLASSES : ""}`;

        // Buka tab baru jika protokol http/https
        if (link.url.startsWith("http")) {
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
        }

        // Susunan Card: Icon kiri + Info teks di tengah + Tanda panah di kanan
        anchor.innerHTML = `
            <div class="flex items-center gap-3.5">
                <span class="text-2xl p-2 rounded-lg bg-amber-50 border border-amber-100 group-hover:scale-110 transition-transform duration-200" aria-hidden="true">
                    ${link.icon}
                </span>
                <div class="text-left">
                    <p class="font-semibold text-slate-800 group-hover:text-amber-800 transition-colors">
                        ${link.title}
                    </p>
                    <p class="text-xs text-slate-500 mt-0.5">${link.subtitle}</p>
                </div>
            </div>
            <span class="text-slate-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all" aria-hidden="true">
                →
            </span>
        `;

        item.appendChild(anchor);
        linkList.appendChild(item);
    });
}

// ===== 4. EVENT LISTENERS (FILTER KATEGORI) =====
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Toggle active style
        filterButtons.forEach(btn => {
            btn.classList.remove("active", "bg-white", "shadow-sm");
            btn.classList.add("hover:bg-white/60");
        });

        button.classList.add("active", "bg-white", "shadow-sm");
        button.classList.remove("hover:bg-white/60");

        const category = button.getAttribute("data-category");
        renderLinks(category);
    });
});

// Inisialisasi render awal
document.addEventListener("DOMContentLoaded", () => {
    renderLinks("all");
});