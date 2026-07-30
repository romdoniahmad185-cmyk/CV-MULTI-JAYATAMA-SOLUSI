/*=========================================
    SCRIPT.JS
    BAGIAN 1
    WEBSITE DASAR
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
        LOADER
    =========================================*/

    const loader = document.querySelector(".loader");

    if (loader) {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 500);

    }


    /*=========================================
        STICKY HEADER
    =========================================*/

    const header = document.querySelector("header");

    function stickyHeader() {

        if (!header) return;

        if (window.scrollY > 80) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    }

    stickyHeader();

    window.addEventListener("scroll", stickyHeader);


    /*=========================================
        MOBILE MENU
    =========================================*/

    const menuBtn = document.querySelector(".menu-toggle");

    const navMenu = document.querySelector("nav ul");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("show");

            menuBtn.classList.toggle("active");

        });

    }


    /*=========================================
        TUTUP MENU SAAT LINK DIKLIK
    =========================================*/

    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (navMenu) {

                navMenu.classList.remove("show");

            }

            if (menuBtn) {

                menuBtn.classList.remove("active");

            }

        });

    });


    /*=========================================
        ACTIVE MENU
    =========================================*/

    const sections = document.querySelectorAll("section[id]");

    function activeMenu() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if (window.scrollY >= top &&
                window.scrollY < top + height) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    activeMenu();

    window.addEventListener("scroll", activeMenu);


    /*=========================================
        SMOOTH SCROLL
    =========================================*/

    navLinks.forEach(link => {

        link.addEventListener("click", function(e) {

            const target = this.getAttribute("href");

            if (!target.startsWith("#")) return;

            const section = document.querySelector(target);

            if (!section) return;

            e.preventDefault();

            window.scrollTo({

                top: section.offsetTop - 70,

                behavior: "smooth"

            });

        });

    });

});

/*=========================================
    SCRIPT.JS
    BAGIAN 2
    HERO SLIDER
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (slides.length === 0) return;

    let current = 0;
    let autoSlide;

    /*=========================
        TAMPILKAN SLIDE
    =========================*/

    function showSlide(index){

        if(index >= slides.length){

            current = 0;

        }else if(index < 0){

            current = slides.length - 1;

        }else{

            current = index;

        }

        slides.forEach(slide=>{

            slide.classList.remove("active");

        });

        dots.forEach(dot=>{

            dot.classList.remove("active");

        });

        slides[current].classList.add("active");

        if(dots[current]){

            dots[current].classList.add("active");

        }

    }

    /*=========================
        NEXT
    =========================*/

    function nextSlide(){

        showSlide(current + 1);

    }

    /*=========================
        PREVIOUS
    =========================*/

    function prevSlide(){

        showSlide(current - 1);

    }

   /* =========================
        AUTO SLIDE
    =========================*/

    function startSlider(){

        stopSlider();

        autoSlide = setInterval(nextSlide,5000);

    }

    function stopSlider(){

        clearInterval(autoSlide);

    }

   /* =========================
        BUTTON
    =========================*/

    if(nextBtn){

        nextBtn.addEventListener("click",()=>{

            nextSlide();

            startSlider();

        });

    }

    if(prevBtn){

        prevBtn.addEventListener("click",()=>{

            prevSlide();

            startSlider();

        });

    }

    /*=========================
        DOT
    =========================*/

    dots.forEach((dot,index)=>{

        dot.addEventListener("click",()=>{

            showSlide(index);

            startSlider();

        });

    });

    /*=========================
        PAUSE HOVER
    =========================*/

    const hero = document.querySelector(".hero");

    if(hero){

        hero.addEventListener("mouseenter",stopSlider);

        hero.addEventListener("mouseleave",startSlider);

    }

 /*   =========================
        SWIPE MOBILE
    =========================*/

    let startX = 0;
    let endX = 0;

    if(hero){

        hero.addEventListener("touchstart",(e)=>{

            startX = e.changedTouches[0].screenX;

        });

        hero.addEventListener("touchend",(e)=>{

            endX = e.changedTouches[0].screenX;

            if(endX < startX - 50){

                nextSlide();

            }

            if(endX > startX + 50){

                prevSlide();

            }

        });

    }

   /* =========================
        MULAI
    =========================*/

    showSlide(0);

    startSlider();

});
/*=========================================
    SCRIPT.JS
    BAGIAN 3
    COUNTER & SCROLL ANIMATION
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================
        REVEAL ANIMATION
    =====================================*/

    const revealItems = document.querySelectorAll(
        ".reveal"
    );

    function revealOnScroll(){

        const windowHeight = window.innerHeight;

        revealItems.forEach(item=>{

            const itemTop =
            item.getBoundingClientRect().top;

            if(itemTop < windowHeight - 100){

                item.classList.add("active");

            }

        });

    }

    revealOnScroll();

    window.addEventListener(
        "scroll",
        revealOnScroll
    );


   /*=========================================
    COUNTER NUMBER
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".counter-number");

    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = parseInt(counter.dataset.target);

            let current = 0;

            const increment = Math.ceil(target / 100);

            function updateCounter() {

                current += increment;

                if (current >= target) {

                    counter.textContent = target + "+";

                } else {

                    counter.textContent = current + "+";

                    requestAnimationFrame(updateCounter);

                }

            }

            updateCounter();

            observer.unobserve(counter);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => {

        observer.observe(counter);

    });

});

    /*=====================================
        COUNTER OBSERVER
    =====================================*/

    if(counters.length){

        const observer =
        new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    startCounter();

                }

            });

        },

        {

            threshold:0.5

        });

        observer.observe(
            counters[0]
        );

    }


    /*=====================================
        PROGRESS BAR
    =====================================*/

    const progressBars =
    document.querySelectorAll(
        ".progress-fill"
    );

    function progressAnimation(){

        progressBars.forEach(bar=>{

            const width =
            bar.dataset.width;

            const top =
            bar.getBoundingClientRect().top;

            if(top < window.innerHeight-80){

                bar.style.width =
                width + "%";

            }

        });

    }

    progressAnimation();

    window.addEventListener(

        "scroll",

        progressAnimation

    );


    /*=====================================
        FADE ELEMENT
    =====================================*/

    const fadeItems =
    document.querySelectorAll(
        ".fade-up"
    );

    function fadeAnimation(){

        fadeItems.forEach(item=>{

            const top =
            item.getBoundingClientRect().top;

            if(top < window.innerHeight-80){

                item.classList.add("show");

            }

        });

    }

    fadeAnimation();

    window.addEventListener(

        "scroll",

        fadeAnimation

    );

});
/*=========================================
    SCRIPT.JS
    BAGIAN 6
    FAQ ACCORDION
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(".faq-item");

    if (faqItems.length === 0) return;

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = question.querySelector("i");

        answer.style.maxHeight = "0px";

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");

            // Tutup semua FAQ
            faqItems.forEach(faq => {

                faq.classList.remove("active");

                faq.querySelector(".faq-answer").style.maxHeight = "0px";

                const faqIcon = faq.querySelector(".faq-question i");

                faqIcon.classList.remove("fa-minus");
                faqIcon.classList.add("fa-plus");

            });

            // Buka FAQ yang dipilih
            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight = answer.scrollHeight + "px";

                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");

            }

        });

    });

});
/*==============================
 MOBILE MENU
==============================*/

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");

// Buka / Tutup Menu
menuToggle.addEventListener("click", function (e) {

    e.stopPropagation();

    navbar.classList.toggle("active");

});

// Tutup Menu Saat Link Dipilih
navLinks.forEach(function(link){

    link.addEventListener("click", function(){

        navbar.classList.remove("active");

    });

});

// Tutup Menu Saat Klik di Luar
document.addEventListener("click", function(e){

    if(!navbar.contains(e.target) && !menuToggle.contains(e.target)){

        navbar.classList.remove("active");

    }

});
document.querySelectorAll("[data-link]").forEach(button => {

    button.addEventListener("click", () => {

        window.open(button.dataset.link, "_blank");

    });

});
//==============================
// POPUP WHATSAPP
//==============================

//==============================
// POPUP WHATSAPP
//==============================

const waButton = document.getElementById("waButton");
const waPopup = document.querySelector(".overlay-whatssapp");

// Tombol WhatsApp membuka/menutup popup
waButton.addEventListener("click", () => {

    waPopup.classList.toggle("active");

});

// Tombol nomor WhatsApp
document.querySelectorAll(".btn-overlay-wa button").forEach(button => {

    button.addEventListener("click", () => {

        window.open(button.dataset.link, "_blank");

    });

});