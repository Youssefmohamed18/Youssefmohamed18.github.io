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

// Smooth Scroll Navigation with Exact Header Offsets (jQuery)
if (typeof $ !== 'undefined') {
    $(".who_am_i").click(function (e) {
        e.preventDefault();
        updateActiveNav($(this));
        if ($("#who_am_i_text").length) {
            $('html, body').animate({ scrollTop: $("#who_am_i_text").offset().top - 90 }, 600);
        }
    });

    $(".skills_nav").click(function (e) {
        e.preventDefault();
        updateActiveNav($(this));
        if ($("#skills_text").length) {
            $('html, body').animate({ scrollTop: $("#skills_text").offset().top - 90 }, 600);
        }
    });

    $(".services").click(function (e) {
        e.preventDefault();
        updateActiveNav($(this));
        if ($("#services_text").length) {
            $('html, body').animate({ scrollTop: $("#services_text").offset().top - 90 }, 600);
        }
    });

    $(".projects_nav").click(function (e) {
        e.preventDefault();
        updateActiveNav($(this));
        if ($("#projects_text").length) {
            $('html, body').animate({ scrollTop: $("#projects_text").offset().top - 90 }, 600);
        }
    });

    $(".contact").click(function (e) {
        e.preventDefault();
        updateActiveNav($(this));
        if ($("#contact_text").length) {
            $('html, body').animate({ scrollTop: $("#contact_text").offset().top - 90 }, 600);
        }
    });

    function updateActiveNav(element) {
        $(".nav-container ul a").removeClass('active');
        element.addClass('active');
    }

    // Scroll to Top Button Toggle
    $(document).scroll(function () {
        var y = $(this).scrollTop();
        if (y >= 150) {
            $('#scroll_top').css("bottom", "30px");
        } else {
            $('#scroll_top').css("bottom", "-100px");
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
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";
        formStatus.style.display = "none";

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
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Send Message";
            
            formStatus.style.display = "block";
            formStatus.style.color = "#10b981";
            formStatus.innerHTML = "<i class='fa-solid fa-circle-check me-2'></i>Thank you! Your message has been sent successfully.";
            
            contactForm.reset();
        })
        .catch(error => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Send Message";
            
            formStatus.style.display = "block";
            formStatus.style.color = "#ef4444";
            formStatus.innerHTML = "<i class='fa-solid fa-triangle-exclamation me-2'></i>Failed to send message. Please try again.";
            console.error('Error!', error);
        });
    });
}
