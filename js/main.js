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

const themeToggle = document.getElementById("themeToggle");
const rootEl = document.documentElement;

function applyTheme(theme){
    if (theme === "light") {
        rootEl.setAttribute("data-theme", "light");
        if (themeToggle) themeToggle.textContent = "☀️";
    } else {
        rootEl.removeAttribute("data-theme");
        if (themeToggle) themeToggle.textContent = "🌙";
    }
    localStorage.setItem("theme", theme);
}

applyTheme(localStorage.getItem("theme") || "dark");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isLight = rootEl.getAttribute("data-theme") === "light";
        applyTheme(isLight ? "dark" : "light");
    });
}

const revealTargets = document.querySelectorAll(
    ".section-title, .section-description, .feature-card, .season-card, " +
    ".coordinator-card, .secretary-card, .story-card, .gallery-item"
);

revealTargets.forEach(el => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item img").forEach(img => {
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("active");
    });
});

function closeLightbox(){
    lightbox.classList.remove("active");
}

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});

const storiesTrack = document.getElementById("storiesTrack");

if (storiesTrack) {
    const slides = storiesTrack.querySelectorAll(".story-card");
    const dotsWrap = document.getElementById("storiesDots");
    const prevBtn = document.getElementById("storiesPrev");
    const nextBtn = document.getElementById("storiesNext");
    let current = 0;
    let autoplay;

    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll("span");

    function goTo(index){
        current = (index + slides.length) % slides.length;
        storiesTrack.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach(d => d.classList.remove("active"));
        dots[current].classList.add("active");
    }

    function startAutoplay(){
        autoplay = setInterval(() => goTo(current + 1), 6000);
    }

    function resetAutoplay(){
        clearInterval(autoplay);
        startAutoplay();
    }

    if (prevBtn) prevBtn.addEventListener("click", () => { goTo(current - 1); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { goTo(current + 1); resetAutoplay(); });

    startAutoplay();
}
