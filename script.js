// Slowly increasing numbers on home page
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");
  const duration = 2000;
  let started = false;

  function startCounting() {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / (duration / 10);

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = formatNumber(target);
        }
      };
      updateCount();
    });
  }

  function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + "B+";
    if (num >= 1000000) return (num / 1000000).toFixed(2) + "M+";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K+";
    return num;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        startCounting();
        started = true;
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-container');
  if (statsSection) observer.observe(statsSection);
});

document.addEventListener("DOMContentLoaded", function () {
  const positions = [
    document.getElementById("pos1"),
    document.getElementById("pos2"),
    document.getElementById("pos3"),
    document.getElementById("pos4"),
    document.getElementById("pos5"),
    document.getElementById("pos6"),
    document.getElementById("pos7")
  ];

  let currentIndex = 2; // Start at pos3 (checked)
  let autoplayInterval = null;

  // Function to go to the next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % positions.length;
    positions[currentIndex].checked = true;
  }

  // Start autoplay
  function startAutoplay() {
    if (!autoplayInterval) {
      autoplayInterval = setInterval(nextSlide, 5000);
    }
  }

  // Stop autoplay
  function stopAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }

  // Manual navigation
  function moveSlide(direction) {
    currentIndex = (currentIndex + direction + positions.length) % positions.length;
    positions[currentIndex].checked = true;
    stopAutoplay();
    startAutoplay();
  }

  // Add button event listeners
  document.getElementById("prev").addEventListener("click", () => moveSlide(-1));
  document.getElementById("next").addEventListener("click", () => moveSlide(1));

  // IntersectionObserver to trigger fade-in + autoplay
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        startAutoplay(); // 🚀 Start autoplay only when in view
        observer.unobserve(entry.target); // Optional: only trigger once
      }
    });
  }, { threshold: 0.1 });

  const target = document.querySelector("#creators-review");
  if (target) observer.observe(target);
});
