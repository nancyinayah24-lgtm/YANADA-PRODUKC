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

async function handleSubmission(event) {
    event.preventDefault();

    const form = document.getElementById('healthForm');
    const messageBox = document.getElementById('messageBox');
    const formData = new FormData(form);
    const selectedServices = formData.getAll('layanan[]');

    if (selectedServices.length === 0) {
        showMessage('Peringatan: Harap pilih minimal satu jenis Pelayanan Kesehatan.', 'bg-yellow-100 text-yellow-800 border-yellow-300');
        return;
    }

    const data = {
        nama: formData.get('nama'),
        email: formData.get('email'),
        telepon: formData.get('telepon'),
        tanggal: formData.get('tanggal'),
        layanan: selectedServices
    };

    // === KIRIM KE GOOGLE SHEET ===
    const scriptURL = "https://script.google.com/macros/s/AKfycbxVP_ezugUf4yPmvnPlMEcZONfh4RFeCgatTQCExbLZjIIsVjiy8Col9r34WgxtLtks/exec";

    try {
        const res = await fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            showMessage(
                `Pemesanan atas nama <b>${data.nama}</b> berhasil dikirim! Kami akan menghubungi Anda di ${data.telepon} atau ${data.email}.`,
                'bg-green-100 text-green-800 border-green-300'
            );
            form.reset();
        } else {
            showMessage("Gagal mengirim data ke server.", "bg-red-100 text-red-800 border-red-300");
        }

    } catch (err) {
        showMessage("Terjadi kesalahan jaringan.", "bg-red-100 text-red-800 border-red-300");
        console.error(err);
    }
}
