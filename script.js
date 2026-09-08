// Initialize AOS Animation Library
AOS.init({
    duration: 800,
    once: true
});

// Hide Loading Screen on Window Load
$(window).bind("load", function () {
    $(".loading").fadeOut("slow");
});

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

// Smooth Scroll Navigation with Exact Header Offsets
$(".who_am_i").click(function (e) {
    e.preventDefault();
    updateActiveNav($(this));
    $('html, body').animate({ scrollTop: $("#who_am_i_text").offset().top - 90 }, 600);
});

$(".skills_nav").click(function (e) {
    e.preventDefault();
    updateActiveNav($(this));
    $('html, body').animate({ scrollTop: $("#skills_text").offset().top - 90 }, 600);
});

$(".services").click(function (e) {
    e.preventDefault();
    updateActiveNav($(this));
    $('html, body').animate({ scrollTop: $("#services_text").offset().top - 90 }, 600);
});

$(".projects_nav").click(function (e) {
    e.preventDefault();
    updateActiveNav($(this));
    $('html, body').animate({ scrollTop: $("#projects_text").offset().top - 90 }, 600);
});

$(".contact").click(function (e) {
    e.preventDefault();
    updateActiveNav($(this));
    $('html, body').animate({ scrollTop: $("#contact_text").offset().top - 90 }, 600);
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

// Dark / Light Mode Toggle Functionality
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Check saved theme preference or default to Dark Mode
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") {
    document.body.classList.add("light-mode");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
} else {
    document.body.classList.remove("light-mode");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
}

themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    let theme = "dark";
    if (document.body.classList.contains("light-mode")) {
        theme = "light";
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }

    localStorage.setItem("theme", theme);
});