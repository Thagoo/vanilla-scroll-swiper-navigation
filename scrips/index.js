document.addEventListener("DOMContentLoaded", (event) => {
  gsap.to(".dotsfill1", { fill: "#000", opacity: 0 });

  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section, index) => {});
});

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  function animateImages(section) {
    const imagesContainer = section.querySelector(".images-container");
    gsap.to(imagesContainer, {
      yPercent: -100 * (imagesContainer.children.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () =>
          `+=${section.offsetHeight * (imagesContainer.children.length - 1)}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });
  }

  const sections = gsap.utils.toArray(".content-section");
  let currentSectionIndex = 0;

  sections.forEach((section, index) => {
    if (index > 0) {
      // Skip the first section as it's already visible
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        onEnter: () => {
          // Show this section
          section.style.display = "flex";
          // Animate the images in column 2
          // animateImages(section);
          // Hide previous section
          if (currentSectionIndex !== index) {
            sections[currentSectionIndex].style.display = "none";
            currentSectionIndex = index;
          }
        },
        onLeaveBack: () => {
          // animateImages(section);
          // Hide this section when scrolling back
          section.style.display = "none";
          // Show the previous section
          if (index > 0) {
            sections[index - 1].style.display = "flex";
            currentSectionIndex = index - 1;
          }
        },
      });
    }
  });

  // Function to display the current section and hide others
  function goToSection(index) {
    sections.forEach((section, i) => {
      section.style.display = i === index ? "flex" : "none";
    });
  }

  // Initial call for the first section
  goToSection(currentSectionIndex);

  // Add listeners for mouse wheel events
  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    if (direction === 1 && currentSectionIndex < sections.length - 1) {
      // Scrolling down
      currentSectionIndex++;
      goToSection(currentSectionIndex);
    } else if (direction === -1 && currentSectionIndex > 0) {
      // Scrolling up
      currentSectionIndex--;
      goToSection(currentSectionIndex);
    }
  });
});
