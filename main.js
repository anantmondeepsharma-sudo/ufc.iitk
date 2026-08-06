/* ==========================================================
   HERO GLOW — word hover effect
========================================================== */

const hero = document.querySelector(".hero");
const words = document.querySelectorAll(".hero-title span");

words.forEach(word => {

    word.addEventListener("mouseenter", () => {

        hero.style.setProperty("--glow-x", word.dataset.x + "px");
        hero.style.setProperty("--glow-y", word.dataset.y + "px");
        hero.style.setProperty("--glow-opacity", "1");

    });

});

/* ==========================================================
   PAGE MOUSE LIGHT — follows cursor across the whole page,
   not just the hero. Fixed to the viewport, so we use
   clientX/clientY directly (no getBoundingClientRect needed).
========================================================== */

const light = document.querySelector(".page-light");

document.addEventListener("mousemove", (e) => {

    light.style.opacity = "1";
    light.style.transform = `translate(${e.clientX - 275}px, ${e.clientY - 275}px)`;

});

document.addEventListener("mouseleave", () => {

    light.style.opacity = "0";

});

/* ==========================================================
   MOBILE NAV TOGGLE
========================================================== */

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {

    navToggle.addEventListener("click", () => {

        navLinks.classList.toggle("nav-open");
        navToggle.classList.toggle("active");

    });

    // Close the menu when a link is tapped
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("nav-open");
            navToggle.classList.remove("active");

        });

    });

}

/* ==========================================================
   NAVBAR — hide on scroll down, reveal on scroll up
========================================================== */

const navbar = document.querySelector(".navbar");

let lastScrollY = window.scrollY;
let scrollTicking = false;

function handleNavScroll(){

    const currentScrollY = window.scrollY;
    const scrolledDown = currentScrollY > lastScrollY;
    const pastThreshold = currentScrollY > 120; // don't hide right at the top

    if (scrolledDown && pastThreshold) {
        navbar.classList.add("nav-hidden");
    } else {
        navbar.classList.remove("nav-hidden");
    }

    if (currentScrollY > 40) {
        navbar.classList.add("nav-scrolled");
    } else {
        navbar.classList.remove("nav-scrolled");
    }

    lastScrollY = currentScrollY;
    scrollTicking = false;

}

if (navbar) {

    window.addEventListener("scroll", () => {

        if (!scrollTicking) {
            requestAnimationFrame(handleNavScroll);
            scrollTicking = true;
        }

    });

}