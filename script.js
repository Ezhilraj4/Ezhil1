const progress = document.getElementById("scrollProgress");
const nav = document.getElementById("navigation");
const menuToggle = document.getElementById("menuToggle");
const navLinks = [...document.querySelectorAll(".navigation a[href^='#']")];
const sections = [...document.querySelectorAll("main section[id]")];

function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;

  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
window.addEventListener("resize", updateScrollUI);
updateScrollUI();

// Reveal elements only as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Mobile navigation.
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks.forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Close the menu with Escape and update the footer year.
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
document.getElementById("year").textContent = new Date().getFullYear();
