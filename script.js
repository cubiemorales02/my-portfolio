// Portfolio interactions: nav active state, certificate carousel, back-to-top, and current year.
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // Smooth-scroll navigation and close the mobile menu after selecting a section.
  const navLinks = document.querySelectorAll('.navbar .nav-link[href^="#"]');
  const navCollapse = document.getElementById("portfolioNav");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.bootstrap && navCollapse && navCollapse.classList.contains("show")) {
        window.bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  // Highlight the section currently visible on screen.
  const sections = document.querySelectorAll("main section[id], section[id]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }

  // Horizontal certificate carousel controls.
  const track = document.getElementById("certificateTrack");
  const previous = document.getElementById("certPrev");
  const next = document.getElementById("certNext");
  const scrollCertificates = (direction) => {
    if (!track) return;
    const card = track.querySelector(".certificate-card");
    const distance = card ? card.getBoundingClientRect().width + 13 : 280;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  };
  if (previous) previous.addEventListener("click", () => scrollCertificates(-1));
  if (next) next.addEventListener("click", () => scrollCertificates(1));

  // Back-to-top button appears after scrolling.
  const backToTop = document.getElementById("backToTop");
  const toggleBackToTop = () => {
    if (backToTop) backToTop.classList.toggle("show", window.scrollY > 500);
  };
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();
  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Make placeholder project links harmless until real project URLs are added.
  document.querySelectorAll('.project-link[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Add your project URL or GitHub repository in index.html.");
    });
  });
});
