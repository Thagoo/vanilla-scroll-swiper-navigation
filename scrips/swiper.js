const swiperEl = document.getElementById("swiper-wrapper");

if (window.innerWidth >= 768) {
  swiperEl.classList.remove("swiper-wrapper");
}
var swiper = new Swiper(".swiper-container", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
