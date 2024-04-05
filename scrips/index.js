document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

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

  // Path slider updates
  const bgColors = [
    "bg-purple-900",
    "bg-indigo-700",
    "bg-indigo-950",
    "bg-sky-950",
    "bg-sky-700",
    "bg-blue-900",
    "bg-emerald-700",
  ];
  const pathSlider = document.getElementById("path-slider");
  const currentBgColor = /\bbg-.*?0\b/g;

  function upgradePathSlider(index) {
    pathSlider.className = pathSlider.className.replace(
      currentBgColor,
      bgColors[index]
    );
    gsap.to(`.dotsfill${index + 1}`, {
      fill: "rgb(0, 146, 255)",
      opacity: 1,
    });
  }
  function downgradePathSlider(index) {
    pathSlider.className = pathSlider.className.replace(
      currentBgColor,
      bgColors[index]
    );
    gsap.to(`.dotsfill${index + 2}`, {
      fill: "rgb(0, 146, 255)",
      opacity: 0,
    });
  }

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
      upgradePathSlider(currentSectionIndex);
    } else if (direction === -1 && currentSectionIndex > 0) {
      // Scrolling up
      currentSectionIndex--;
      goToSection(currentSectionIndex);
      downgradePathSlider(currentSectionIndex);
    }
  });
});
