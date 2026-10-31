
// ROBOFEST website interactions

const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");
const navLinks = document.querySelectorAll(".nav-link");
const videoButton = document.querySelector("#videoButton");
const modal = document.querySelector("#infoModal");
const modalClose = document.querySelector("#modalClose");
const modalOkay = document.querySelector("#modalOkay");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Active navigation section
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

// Scroll reveal animations
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// Information modal
function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  videoButton.focus();
}

videoButton.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
modalOkay.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});
