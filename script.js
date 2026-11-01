(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");

  if (menuButton && navigation) {
    const setMenuOpen = (isOpen) => {
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      navigation.classList.toggle("is-open", isOpen);
    };

    menuButton.addEventListener("click", () => {
      setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuButton.focus();
      }
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const values = new FormData(contactForm);
      const name = String(values.get("name") || "").trim();
      const email = String(values.get("email") || "").trim();
      const service = String(values.get("service") || "").trim() || "Not specified";
      const message = String(values.get("message") || "").trim();
      const subject = "Project enquiry from " + name;
      const body = [
        "Name: " + name,
        "Email: " + email,
        "Project type: " + service,
        "",
        "Project details:",
        message
      ].join("\r\n");

      formStatus.textContent = "Your email app should open with a draft. Review it and send when you’re ready.";
      window.location.href = "mailto:tukaramkangude24@gmail.com?subject="
        + encodeURIComponent(subject)
        + "&body="
        + encodeURIComponent(body);
    });
  }

  const revealTargets = document.querySelectorAll(
    ".service-card, .project-card, .experience-card, .process-list, .skills-panel, .contact-form"
  );

  if ("IntersectionObserver" in window) {
    revealTargets.forEach((element) => element.classList.add("reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealTargets.forEach((element) => observer.observe(element));
  }
})();
