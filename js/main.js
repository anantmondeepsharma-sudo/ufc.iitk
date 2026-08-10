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

const galleryMoreBtn = document.getElementById("galleryMoreBtn");

if (galleryMoreBtn) {
    galleryMoreBtn.addEventListener("click", () => {
        const extras = document.querySelectorAll(".gallery-extra");
        const isShowing = extras[0]?.classList.contains("show");
        extras.forEach(item => item.classList.toggle("show", !isShowing));
        galleryMoreBtn.textContent = isShowing ? "View more" : "View less";
    });
}

const detailModal = document.getElementById("detailModal");
const detailModalImg = document.getElementById("detailModalImg");
const detailModalTitle = document.getElementById("detailModalTitle");
const detailModalSubtitle = document.getElementById("detailModalSubtitle");
const detailModalBody = document.getElementById("detailModalBody");
const detailModalMoreBtn = document.getElementById("detailModalMoreBtn");
const detailModalMore = document.getElementById("detailModalMore");
const detailModalClose = document.getElementById("detailModalClose");

function openDetailModal({ img = "", title = "", subtitle = "", body = "", more = "" }){
    detailModalImg.src = img;
    detailModalTitle.textContent = title;
    detailModalSubtitle.textContent = subtitle;
    detailModalBody.textContent = body;
    detailModalMore.textContent = more;
    detailModalMore.classList.remove("show");
    detailModalMoreBtn.textContent = "View more";
    detailModal.classList.add("active");
}

function closeDetailModal(){ detailModal.classList.remove("active"); }

if (detailModalClose) detailModalClose.addEventListener("click", closeDetailModal);
if (detailModal) {
    detailModal.addEventListener("click", (e) => { if (e.target === detailModal) closeDetailModal(); });
}
if (detailModalMoreBtn) {
    detailModalMoreBtn.addEventListener("click", () => {
        const isShown = detailModalMore.classList.toggle("show");
        detailModalMoreBtn.textContent = isShown ? "View less" : "View more";
    });
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDetailModal(); });

document.querySelectorAll(".secretary-card").forEach(card => {
    card.addEventListener("click", () => {
        const name = card.dataset.name || card.textContent.trim();
        const role = card.dataset.role || "Secretary";
        const photo = card.dataset.photo || "assets/images/placeholder.jpg";
        const bio = card.dataset.bio || "More about this secretary will be added soon.";
        const more = card.dataset.more || "";
        openDetailModal({ img: photo, title: name, subtitle: role, body: bio, more });
    });
});

document.querySelectorAll(".season-card li").forEach(item => {
    item.addEventListener("click", () => {
        const monthEl = item.closest(".season-card")?.querySelector(".month");
        const month = monthEl ? monthEl.textContent.trim() : "";
        const title = item.dataset.title || item.textContent.trim();
        const date = item.dataset.date || month;
        const desc = item.dataset.desc || "Full details for this event will be added soon.";
        const more = item.dataset.more || "";
        openDetailModal({ img: "", title, subtitle: date, body: desc, more });
    });
});

const joinForm = document.querySelector(".join-form");

if (joinForm) {

    joinForm.addEventListener("submit", (e) => {

        const emailInput = joinForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim().toLowerCase();

        if (!email.endsWith("@iitk.ac.in")) {
            e.preventDefault();
            emailInput.setCustomValidity("Please use your IITK email (must end in @iitk.ac.in)");
            emailInput.reportValidity();
        } else {
            emailInput.setCustomValidity("");
        }

    });

}