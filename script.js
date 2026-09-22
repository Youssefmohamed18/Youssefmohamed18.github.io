// Initialize AOS Animation Library
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true
    });
}

// Hide Loading Screen on Window Load
if (typeof $ !== 'undefined') {
    $(window).on("load", function () {
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

// Unified Smooth Scroll Navigation & Scroll Spy for Navbar
if (typeof $ !== 'undefined') {
    $(".nav-container ul a, footer ul a").click(function (e) {
        const targetId = $(this).attr("href");
        if (targetId && targetId.startsWith("#") && targetId.length > 1) {
            e.preventDefault();
            const targetElement = $(targetId);
            if (targetElement.length) {
                $(".nav-container ul a").removeClass('active');
                $(this).addClass('active');
                $('html, body').animate({ scrollTop: targetElement.offset().top - 90 }, 600);
            }
        }
    });

    // Auto Update Active Nav Link on Page Scroll (Scroll Spy)
    $(window).scroll(function () {
        const scrollPos = $(window).scrollTop() + 150;
        
        $("h2.heading_text").each(function () {
            const currHeading = $(this);
            const refElement = $("#" + currHeading.attr("id"));
            
            if (refElement.length && refElement.offset().top <= scrollPos && refElement.offset().top + refElement.outerHeight() > scrollPos) {
                $(".nav-container ul a").removeClass("active");
                const headingId = currHeading.attr("id");
                
                if (headingId === "who_am_i_text") {
                    $(".nav-container ul a.who_am_i").addClass("active");
                } else if (headingId === "certificates_text") {
                    $(".nav-container ul a.cert_nav").addClass("active");
                } else if (headingId === "skills_text") {
                    $(".nav-container ul a.skills_nav").addClass("active");
                } else if (headingId === "services_text") {
                    $(".nav-container ul a.services").addClass("active");
                } else if (headingId === "projects_text") {
                    $(".nav-container ul a.projects_nav").addClass("active");
                } else if (headingId === "contact_text") {
                    $(".nav-container ul a.contact").addClass("active");
                }
            }
        });

        // Scroll to Top Button Toggle
        var y = $(this).scrollTop();
        if (y >= 150) {
            $('#scroll_top').addClass("show");
        } else {
            $('#scroll_top').removeClass("show");
        }
    });

    // Smooth Scroll to Top
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
