const swiperEl = document.getElementById("swiper-wrapper");

if (window.innerWidth >= 768) {
  swiperEl.classList.remove("swiper-wrapper");
}

/* Swiper
 **************************************************************/
var swiper = Swiper;
var init = false;

/* Which media query
 **************************************************************/
function swiperMode() {
  let mobile = window.matchMedia("(min-width: 0px) and (max-width: 768px)");
  let tablet = window.matchMedia("(min-width: 769px) and (max-width: 1024px)");
  let desktop = window.matchMedia("(min-width: 1025px)");

  // Enable (for mobile)
  if (mobile.matches) {
    swiperEl.classList.add("swiper-wrapper");
    if (!init) {
      init = true;
      swiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
        },
        centeredSlides: true,
        loop: true,
        spaceBetween: 10,
        direction: "horizontal",
        effect: "coverflow",

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false,
        },

        breakpoints: {
          767: {
            slidesPerView: 1,
            spaceBetween: 0,
            effect: "coverflow",

            coverflowEffect: {
              rotate: 0,
              stretch: 20,
              depth: 120,
              modifier: 3,
              slideShadows: false,
            },
          },
        },
      });
    }
  }

  // Disable (for tablet)
  else if (tablet.matches) {
    swiperEl.classList.remove("swiper-wrapper");
    swiper.destroy();
    init = false;
  }

  // Disable (for desktop)
  else if (desktop.matches) {
    swiperEl.classList.remove("swiper-wrapper");
    swiper.destroy();
    init = false;
  }
}

/* On Load
 **************************************************************/
window.addEventListener("load", function () {
  swiperMode();
});

/* On Resize
 **************************************************************/
window.addEventListener("resize", function () {
  swiperMode();
});
