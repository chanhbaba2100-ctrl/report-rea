const slides = Array.from(document.querySelectorAll(".slide"));
const slideLinks = Array.from(document.querySelectorAll("[data-slide-link]"));
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const menuItems = Array.from(document.querySelectorAll(".menu-item"));
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const slideCounter = document.querySelector("#slideCounter");
const progressBar = document.querySelector("#progressBar");

let currentSlide = 0;

const opportunityData = {
  kit: {
    title: "Selected opportunity: Repair Kit Revenue",
    copy: "The MVP starts with a tangible kit because it is easy to buy, test, gift, refill, and demonstrate in a workshop setting.",
    image: "assets/generated-kit-studio.png",
    alt: "Studio product photo of modular repair kit"
  },
  workshop: {
    title: "Selected opportunity: Workshop Experiences",
    copy: "Workshops turn repair into a memorable brand moment, create first-time usage, and make customer feedback observable in real time.",
    image: "assets/generated-workshop-family.png",
    alt: "Family repairing clothing together in a workshop"
  },
  platform: {
    title: "Selected opportunity: Repair Impact Platform",
    copy: "The QR tutorial system can grow into an impact loop where people upload repaired items, track participation, and join city or school challenges.",
    image: "assets/generated-retail-display.png",
    alt: "Retail display with repair kit packaging and patch samples"
  }
};

const personaData = {
  family: {
    title: "Family Repair Beginner",
    copy: "Pain points: repair feels messy, time-consuming, and boring for children. Need: a guided activity that makes keeping old clothing feel proud and fun."
  },
  student: {
    title: "Student With Worn Gear",
    copy: "Pain points: limited budget, worn backpacks, and a desire for self-expression. Need: affordable personalization that also fixes damage."
  },
  outdoor: {
    title: "Casual Outdoor User",
    copy: "Pain points: damaged jackets and straps are annoying, but professional repair can feel slow or expensive. Need: durable DIY repair with credible outdoor utility."
  }
};

const experimentData = {
  pilot: {
    title: "Store + School Pilot",
    copy: "Launch 300 MVP kits through two outdoor stores and one school workshop. Observe completion rate, patch combinations, tutorial usage, and post-repair pride."
  },
  pricing: {
    title: "Willingness-To-Pay Test",
    copy: "Compare a starter kit, refill pack, and workshop bundle. Measure preorder conversion, refill interest, and which color packs feel most desirable."
  },
  impact: {
    title: "Impact Proof Loop",
    copy: "Ask users to scan the QR tutorial and upload one repaired item. Track whether the repair story creates pride, sharing, and repeat engagement."
  }
};

function setSlide(index) {
  currentSlide = Math.max(0, Math.min(slides.length - 1, index));

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === currentSlide);
  });

  slideLinks.forEach((link) => {
    const isActive = Number(link.dataset.slideLink) === currentSlide;
    link.classList.toggle("is-active", isActive);
    if (link.classList.contains("nav-link")) {
      const target = Number(link.dataset.slideLink);
      link.classList.toggle("is-active", target === currentSlide || (target < currentSlide && target >= currentSlide - 1));
    }
  });

  navLinks.forEach((link) => {
    const target = Number(link.dataset.slideLink);
    const groupMatch =
      (target === 0 && currentSlide === 0) ||
      (target === 1 && (currentSlide === 1 || currentSlide === 2)) ||
      (target === 3 && currentSlide === 3) ||
      (target === 4 && (currentSlide === 4 || currentSlide === 5)) ||
      (target === 6 && (currentSlide === 6 || currentSlide === 7));
    link.classList.toggle("is-active", groupMatch);
  });

  menuItems.forEach((item) => {
    item.classList.toggle("is-active", Number(item.dataset.slideLink) === currentSlide);
  });

  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;
  slideCounter.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  progressBar.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
}

slideLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setSlide(Number(link.dataset.slideLink));
  });
});

prevBtn.addEventListener("click", () => setSlide(currentSlide - 1));
nextBtn.addEventListener("click", () => setSlide(currentSlide + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown") {
    setSlide(currentSlide + 1);
  }
  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    setSlide(currentSlide - 1);
  }
});

document.querySelectorAll(".opportunity-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".opportunity-card").forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
    const data = opportunityData[card.dataset.opportunity];
    const detail = document.querySelector("#opportunityDetail");
    detail.querySelector("img").src = data.image;
    detail.querySelector("img").alt = data.alt;
    detail.querySelector("h3").textContent = data.title;
    detail.querySelector("p").textContent = data.copy;
  });
});

document.querySelectorAll(".persona-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".persona-tab").forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    const data = personaData[tab.dataset.persona];
    document.querySelector("#personaPanel h3").textContent = data.title;
    document.querySelector("#personaPanel p").textContent = data.copy;
  });
});

document.querySelectorAll(".experiment-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".experiment-tab").forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    const data = experimentData[tab.dataset.experiment];
    document.querySelector("#experimentPanel h3").textContent = data.title;
    document.querySelector("#experimentPanel p").textContent = data.copy;
  });
});

document.querySelectorAll(".thumb").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    document.querySelectorAll(".thumb").forEach((item) => item.classList.remove("is-active"));
    thumb.classList.add("is-active");
    const galleryMain = document.querySelector("#galleryMain");
    galleryMain.src = thumb.dataset.image;
    galleryMain.alt = thumb.dataset.alt;
  });
});

document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".feature-card").forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
  });
});

setSlide(0);
