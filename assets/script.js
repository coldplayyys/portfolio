(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (menuButton && nav) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    };

    menuButton.addEventListener("click", () => {
      const nextExpanded = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(nextExpanded));
      nav.classList.toggle("is-open", nextExpanded);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  const filters = [...document.querySelectorAll(".filter-button")];
  const cards = [...document.querySelectorAll(".project-card")];

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;

      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      cards.forEach((card) => {
        const visible = category === "all" || card.dataset.category === category;
        card.classList.toggle("is-hidden", !visible);
      });
    });
  });

  const revealItems = [...document.querySelectorAll(".reveal")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -7% 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const caseToc = document.querySelector(".case-aside ol");
  if (caseToc) {
    const headings = [...document.querySelectorAll(".case-content section[id]")];
    headings.forEach((heading) => {
      const id = heading.id;
      const title = heading.querySelector("h2")?.textContent?.trim();
      if (!id || !title) return;

      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${id}`;
      link.textContent = title;
      item.append(link);
      caseToc.append(item);
    });
  }
})();
