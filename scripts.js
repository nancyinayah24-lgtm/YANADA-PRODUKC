// INISIALISASI AOS DILAKUKAN DI FILE HTML

// ----------------------------------
// Mobile Menu Toggle
// ----------------------------------
document
    .getElementById("menu-toggle")
    .addEventListener("click", function () {
        const mobileMenu = document.getElementById("mobile-menu");
        mobileMenu.classList.toggle("hidden");
    });

// ----------------------------------
// Hero Slider Logic (Hanya di index.html)
// ----------------------------------
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.nav-dot');
let currentSlide = 0;

if (slides.length > 0) {
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                dots[i].classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Otomatis pindah slide setiap 5 detik
    setInterval(nextSlide, 5000); 

    // Navigasi dengan dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            currentSlide = slideIndex;
            showSlide(currentSlide);
        });
    });

    // Tampilkan slide pertama saat dimuat
    showSlide(currentSlide);
}


// ----------------------------------
// WhatsApp Order Logic (untuk products.html)
// ----------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const phoneNumber = "6281234567890"; // GANTI DENGAN NOMOR WA SEKOLAH/ADMIN

    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const productPrice = button.getAttribute('data-price');
            
            const message = encodeURIComponent(
                `Halo Admin Yannas Husada, saya tertarik memesan produk:\n\n` +
                `*Produk:* ${productName}\n` +
                `*Harga:* Rp ${productPrice}\n\n` +
                `Mohon konfirmasi ketersediaan dan total biaya. Terima kasih!`
            );
            
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank'); 
        });
    });
});
const SCRIPT_URL = https:/https:"https://script.google.com/macros/s/AKfycbzFowgBuxPBTDbEmbj-OmUdYzcXxzlua8g-No3gKLZDZ_y_G36aTdc46oRHQuGMslt6/exec";

function handleSubmission(event) {
    event.preventDefault();

    const form = document.getElementById('healthForm');
    const formData = new FormData(form);
    const layanan = formData.getAll("layanan[]").join(", ");

    const data = {
        nama: formData.get("nama"),
        email: formData.get("email"),
        telepon: formData.get("telepon"),
        tanggal: formData.get("tanggal"),
        layanan: layanan
    };

    fetch("https://script.google.com/macros/s/AKfycbxuC7mfcfQIevBb1DtXbuJOkfPc_Xqlji2c7t6Edu4DKS_u_0yySVEyr1hpVY0-AXX1/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(data)
    });

    showMessage(
        `Pemesanan atas nama <b>${data.nama}</b> berhasil dikirim!`,
        'bg-green-100 text-green-800 border-green-300'
    );

    form.reset();
}
