(() => {
  const themeButton = document.getElementById("theme-toggle");
  const themeColorMeta = document.getElementById("theme-color");
  const initialTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";

  const applyTheme = (theme, persist = true) => {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    themeButton?.setAttribute("aria-pressed", String(isDark));
    if (themeColorMeta) themeColorMeta.content = "#040b14";

    if (persist) {
      try {
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
      } catch {}
    }
  };

  applyTheme(initialTheme, false);
  themeButton?.addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });

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

  if (navigation && "IntersectionObserver" in window) {
    const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
    const sectionObserver = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];
      if (!current) return;

      sectionLinks.forEach((link) => {
        const isCurrent = link.hash === "#" + current.target.id;
        link.classList.toggle("is-active", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-25% 0px -65% 0px", threshold: 0 });

    sectionLinks.forEach((link) => {
      const section = document.querySelector(link.hash);
      if (section) sectionObserver.observe(section);
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const serviceSelect = document.getElementById("contact-service");
  const projectField = document.getElementById("contact-project");

  document.querySelectorAll("[data-inquiry-service]").forEach((link) => {
    link.addEventListener("click", () => {
      if (serviceSelect) serviceSelect.value = link.dataset.inquiryService || "";
      if (projectField) projectField.value = link.dataset.inquiryProject || "";
    });
  });

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const values = new FormData(contactForm);
      const name = String(values.get("name") || "").trim();
      const email = String(values.get("email") || "").trim();
      const service = serviceSelect?.value
        ? serviceSelect.selectedOptions[0].textContent.trim()
        : "Not specified";
      const project = String(values.get("project") || "").trim() || "Not specified";
      const budget = String(values.get("budget") || "").trim() || "Not specified";
      const timelineSelect = document.getElementById("contact-timeline");
      const timeline = timelineSelect?.value
        ? timelineSelect.selectedOptions[0].textContent.trim()
        : "Not specified";
      const targetDate = String(values.get("target_date") || "").trim() || "Not specified";
      const message = String(values.get("message") || "").trim();
      const subject = project === "Not specified"
        ? "Freelance project enquiry from " + name
        : "Project enquiry: " + project;
      const body = [
        "Name: " + name,
        "Email: " + email,
        "Project type: " + service,
        "Project reference: " + project,
        "Approximate budget: " + budget,
        "Target timing: " + timeline,
        "Target date: " + targetDate,
        "",
        "Project details:",
        message
      ].join("\r\n");

      formStatus.textContent = "Your email app should open with a draft. Review the details and send it when you’re ready.";
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
