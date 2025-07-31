document.addEventListener('DOMContentLoaded', function() {
    // Tahun di footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Tutup mobile menu saat klik link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Scroll navbar effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animasi skill bars
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Portfolio filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Animasi counter
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Trigger animations when element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    function checkScroll() {
        // Check skills section
        const skillsSection = document.getElementById('skills');
        if (isInViewport(skillsSection)) {
            animateSkills();
            window.removeEventListener('scroll', checkScroll);
        }
        
        // Check stats section
        const aboutSection = document.getElementById('about');
        if (isInViewport(aboutSection)) {
            animateCounters();
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Pesan telah terkirim! Saya akan segera menghubungi Anda.');
            this.reset();
        });
    }
});

// Di script.js
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', function() {
        // Anda bisa menggunakan Google Analytics atau console log
        console.log('CV downloaded:', this.href);
        
        // Contoh dengan Google Analytics:
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download', {
                'event_category': 'CV',
                'event_label': 'CV Download'
            });
        }
    });
});

// Animasi pengetikan nama
function typeWriter() {
    const nameElement = document.getElementById('animated-name');
    const yourName = "Muhamad Yunus"; // Ganti dengan nama Anda
    const typingSpeed = 150; // Kecepatan mengetik (ms)
    const deletingSpeed = 100; // Kecepatan menghapus (ms)
    const pauseBetween = 2000; // Jeda antara siklus (ms)
    
    let i = 0;
    let isDeleting = false;
    let currentText = '';
    
    function type() {
        if (i < yourName.length && !isDeleting) {
            // Mode mengetik
            currentText = yourName.substring(0, i + 1);
            nameElement.textContent = currentText;
            i++;
            setTimeout(type, typingSpeed);
        } else if (i > 0 && isDeleting) {
            // Mode menghapus
            currentText = yourName.substring(0, i - 1);
            nameElement.textContent = currentText;
            i--;
            setTimeout(type, deletingSpeed);
        } else {
            // Ganti mode
            isDeleting = !isDeleting;
            if (!isDeleting) {
                // Tambahkan jeda sebelum mulai mengetik lagi
                setTimeout(type, pauseBetween);
            } else {
                setTimeout(type, typingSpeed);
            }
        }
    }
    
    // Mulai animasi
    setTimeout(type, 1000); // Jeda awal sebelum mulai animasi
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    typeWriter();
});

// function multiTextAnimation() {
//     const nameElement = document.getElementById('animated-name');
//     const texts = ["[Nama Anda]", "Web Developer", "Designer", "Freelancer"]; // Teks alternatif
//     const typingSpeed = 100;
//     const deletingSpeed = 50;
//     const pauseBetween = 2000;
    
//     let textIndex = 0;
//     let i = 0;
//     let isDeleting = false;
//     let currentText = '';
    
//     function type() {
//         const currentFullText = texts[textIndex];
        
//         if (i < currentFullText.length && !isDeleting) {
//             currentText = currentFullText.substring(0, i + 1);
//             nameElement.textContent = currentText;
//             i++;
//             setTimeout(type, typingSpeed);
//         } else if (i > 0 && isDeleting) {
//             currentText = currentFullText.substring(0, i - 1);
//             nameElement.textContent = currentText;
//             i--;
//             setTimeout(type, deletingSpeed);
//         } else {
//             isDeleting = !isDeleting;
//             if (!isDeleting) {
//                 textIndex = (textIndex + 1) % texts.length;
//             }
//             setTimeout(type, isDeleting ? pauseBetween : typingSpeed);
//         }
//     }
    
//     setTimeout(type, 1000);
// }

document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#3498db" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#2980b9", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            }
        }
    });
});
