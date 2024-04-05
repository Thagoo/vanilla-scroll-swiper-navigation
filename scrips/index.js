gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".content-section");
let currentSectionIndex = 0;

// Function to activate and deactivate path slider points
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

function resetPathSliderPoints() {
  sections.forEach((_, index) => {
    gsap.to(`.dotsfill${index + 1}`, {
      opacity: 0,
    });
  });
}
function updatePathSlider(index) {
  pathSlider.className = pathSlider.className.replace(
    currentBgColor,
    bgColors[index]
  );

  resetPathSliderPoints();
  for (let i = 1; i <= index + 1; i++) {
    gsap.to(`.dotsfill${i}`, {
      opacity: 1,
    });
  }
}

// Function to display the current section and hide others
function goToSection(index) {
  currentSectionIndex = index;
  updatePathSlider(currentSectionIndex);
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
    updatePathSlider(currentSectionIndex);
  } else if (direction === -1 && currentSectionIndex > 0) {
    // Scrolling up
    currentSectionIndex--;
    goToSection(currentSectionIndex);
    updatePathSlider(currentSectionIndex);
  }
});
