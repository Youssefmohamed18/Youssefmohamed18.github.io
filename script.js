// Initialize AOS Animation Library
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true
    });
}

// Hide Loading Screen on Window Load
if (typeof $!== 'undefined') {$(window).on("load", function () {
        $(".loading").fadeOut("slow");
    });
} else {
    window.addEventListener("load", function () {
        const loader = document.querySelector(".loading");
        if (loader) loader.classList.add("hidden");
    });
}

// Auto Typing Animation
const TypingText = document.querySelector(".TypedText");
const textArray = ["SQL Queries", "Power BI Dashboards", "Excel Analytics", "Python EDA"];
const typingDelay = 150;
const erasingDelay = 80;
const newTextDelay = 1800;
let textArrayIndex = 0;
let charIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
    if (TypingText) {
        setTimeout(type, newTextDelay + 250);
    }
});

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        TypingText.innerHTML += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        TypingText.innerHTML = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1000);
    }
}

// --- Smooth Scroll & Active Navbar State (Position-Based Bulletproof Fix) ---
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-container ul a, footer ul a");
    const navbarLinksOnly = document.querySelectorAll(".nav-container ul a");

    // جمع الأقسام الحقيقية
    const sections = Array.from(navbarLinksOnly).map(link => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
            return document.querySelector(href);
        }
        return null;
    }).filter(section => section !== null);

    // 1. التفاعل عند الضغط (Click) والانتقال السلس
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && href.startsWith("#") && href.length > 1) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();

                    // تحديث الـ Active class فوراً عند الضغط
                    navbarLinksOnly.forEach(l => l.classList.remove("active"));
                    if (this.closest(".nav-container")) {
                        this.classList.add("active");
                    } else {
                        navbarLinksOnly.forEach(l => {
                            if (l.getAttribute("href") === href) {
                                l.classList.add("active");
                            }
                        });
                    }

                    // التمرير السلس مع مراعاة ارتفاع الـ Navbar
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // 2. التحديث التلقائي أثناء الـ Scroll بناءً على موقع الـ Viewport الفعلي (يعالج مشاكل الأقسام القصيرة تماماً)
    function updateActiveOnScroll() {
        let scrollPosition = window.scrollY + 120; // إضافة مساحة تعويضية للـ Navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navbarLinksOnly.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveOnScroll);
    updateActiveOnScroll(); // تشغيلها مرة أول التحميل
});

// Scroll to Top Button Toggle & Action
if (typeof $!== 'undefined') {$(document).scroll(function () {
        var y = $(this).scrollTop();
        if (y >= 150) {
            $('#scroll_top').addClass("show");
        } else {
            $('#scroll_top').removeClass("show");
        }
    });

    $("#scroll_top").click(function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 500);
    });
}

// Dark / Light Mode Toggle Functionality
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") {
    document.body.classList.add("light-mode");
    if (themeIcon) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }
} else {
    document.body.classList.remove("light-mode");
    if (themeIcon) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");

        let theme = "dark";
        if (document.body.classList.contains("light-mode")) {
            theme = "light";
            if (themeIcon) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            }
        } else {
            if (themeIcon) {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            }
        }

        localStorage.setItem("theme", theme);
    });
}

// Google Apps Script Direct Integration
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

const scriptURL = 'https://script.google.com/macros/s/AKfycbzweSjXsnCHsQDHy5iNknKd0vyACK-qGudUACJHNvvcv-LstQMJlDGTZ9QSe0m4yYY/exec';

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Sending...";
        }
        if (formStatus) {
            formStatus.style.display = "none";
        }

        const formData = new FormData(contactForm);
        const dataParams = new URLSearchParams(formData);

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: dataParams
        })
            .then(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = "Send Message";
                }
                if (formStatus) {
                    formStatus.style.display = "block";
                    formStatus.style.color = "#10b981";
                    formStatus.innerHTML = "<i class='fa-solid fa-circle-check me-2'></i>Thank you! Your message has been sent successfully.";
                }
                contactForm.reset();
            })
            .catch(error => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = "Send Message";
                }
                if (formStatus) {
                    formStatus.style.display = "block";
                    formStatus.style.color = "#ef4444";
                    formStatus.innerHTML = "<i class='fa-solid fa-triangle-exclamation me-2'></i>Failed to send message. Please try again.";
                }
                console.error('Error!', error);
            });
    });
}
