(() => {
  "use strict";

  const body = document.body;

  // =========================================================
  // PROJECT DATA
  // =========================================================

  const projects = {
    platescope: {
      code: "PS-01",
      title: "PlateScope",
      domain: "COMPUTER VISION / FULL-STACK",
      lead:
        "AI-powered Automatic Number Plate Recognition system for extracting unique vehicle registration numbers from traffic video.",
      problem:
        "Direct browser OCR was unreliable on moving traffic footage because plates can be small, blurred, angled and visible across many repeated frames.",
      architecture: ["Video", "Frame Sampling", "YOLO", "Plate Crop", "PaddleOCR", "Normalization", "Multi-frame Voting", "React Dashboard"],
      decisions: [
        ["WHY YOLO?", "Plate localization is separated from OCR so recognition works on focused plate crops rather than whole frames."],
        ["WHY MULTI-FRAME VOTING?", "A single OCR read can be unstable. Repeated observations provide stronger evidence for the final registration."],
        ["WHY FASTAPI?", "The computer-vision pipeline is Python-native, so FastAPI keeps the API layer close to inference code."],
        ["WHY REACT + TYPESCRIPT?", "The frontend needs an interactive upload, analysis and results workflow with clear state handling."]
      ],
      contribution: [
        "Designed the ANPR processing workflow.",
        "Integrated YOLO plate detection and PaddleOCR recognition.",
        "Built text normalization and repeated-observation aggregation.",
        "Connected the pipeline to a FastAPI backend.",
        "Integrated the analysis workflow with a React/TypeScript frontend."
      ],
      limitations: [
        "CPU inference is slower for long or high-resolution videos.",
        "Very small, heavily blurred or occluded plates can reduce recognition quality.",
        "The current version focuses primarily on common Indian registration patterns.",
        "Live CCTV / RTSP processing is not yet implemented."
      ],
      stack: ["Python", "YOLO", "PaddleOCR", "OpenCV", "PyTorch", "FastAPI", "React", "TypeScript"],
      repo: "https://github.com/svasanth2508/PlateScope",
      live: null
    },

    astraguard: {
      code: "AG-02",
      title: "AstraGuard",
      domain: "INTELLIGENT OPERATIONS",
      lead:
        "Autonomous incident-resolution platform for detecting anomalies, reasoning about dependencies, evaluating remediation risk and verifying recovery.",
      problem:
        "Operational incidents often require humans to connect telemetry symptoms, probable root causes and remediation actions under time pressure.",
      architecture: ["Telemetry", "Anomaly Detection", "Dependency Reasoning", "Risk Evaluation", "Approval Gate", "Remediation", "Recovery Verification"],
      decisions: [
        ["WHY RISK-BASED APPROVAL?", "Low-risk actions can be automated while higher-risk remediation remains under human approval."],
        ["WHY DEPENDENCY REASONING?", "A visible failure can originate upstream, so service relationships matter during root-cause analysis."],
        ["WHY RECOVERY VERIFICATION?", "Executing an action is not enough; the system should verify whether the incident actually improved."]
      ],
      contribution: [
        "Designed the incident-analysis workflow.",
        "Built backend reasoning and risk evaluation logic.",
        "Implemented approval-oriented remediation flow.",
        "Connected the backend to a web dashboard.",
        "Deployed the application using cloud hosting."
      ],
      limitations: [
        "The platform uses simulated / project telemetry rather than production enterprise infrastructure.",
        "Autonomous actions must be carefully scoped before real-world production use.",
        "Model quality depends on representative operational data."
      ],
      stack: ["Python", "FastAPI", "React", "TypeScript", "NetworkX", "River", "Vercel", "Render"],
      repo: "https://github.com/svasanth2508/AstraGuard",
      live: "https://astraguard-eight.vercel.app"
    },

    resilient: {
      code: "RA-03",
      title: "RESILIENT_AI_SIH",
      domain: "EDGE AI / EMBEDDED IoT",
      lead:
        "ESP32 multi-node monitoring prototype combining environmental sensing, edge risk processing, ESP-NOW communication and cloud visualization.",
      problem:
        "Safety monitoring needs to continue close to the sensors instead of depending entirely on a cloud connection.",
      architecture: ["Sensors", "ESP32 Edge Node", "Risk Processing", "ESP-NOW", "Gateway ESP32", "Cloud API", "Dashboard"],
      decisions: [
        ["WHY EDGE PROCESSING?", "Immediate local risk scoring reduces dependence on network round trips."],
        ["WHY ESP-NOW?", "It enables direct ESP32-to-ESP32 communication for the prototype without relying on the internet between nodes."],
        ["WHY A GATEWAY?", "Separating sensor nodes from cloud forwarding makes the architecture easier to extend into multiple edge nodes."]
      ],
      contribution: [
        "Integrated environmental sensors with ESP32 nodes.",
        "Implemented risk processing at the edge.",
        "Configured ESP-NOW node communication.",
        "Built gateway-to-cloud telemetry forwarding.",
        "Connected telemetry to a monitoring dashboard."
      ],
      limitations: [
        "Prototype sensor calibration is not equivalent to certified industrial instrumentation.",
        "ESP-NOW prototype range and reliability depend on environment and hardware placement.",
        "Cloud connectivity is still required for remote dashboard access."
      ],
      stack: ["ESP32", "ESP-NOW", "C++", "Sensors", "Edge Processing", "Vercel", "Telemetry"],
      repo: "https://github.com/svasanth2508/RESILIENT_AI_SIH",
      live: "https://resilient-ai-sih.vercel.app"
    },

    secapms: {
      code: "SC-04",
      title: "SECAPMS",
      domain: "SMART INFRASTRUCTURE / IoT",
      lead:
        "Smart Emergency Corridor and Ambulance Priority Management concept connecting emergency vehicle information with embedded traffic-priority control.",
      problem:
        "Emergency vehicles can lose critical time at congested traffic junctions when signal priority is not coordinated.",
      architecture: ["Emergency Vehicle", "Priority / Location", "Coordination Layer", "Traffic Junction", "ESP32 Controller", "Signal Priority"],
      decisions: [
        ["WHY EMBEDDED CONTROL?", "Traffic-junction actuation belongs close to the physical infrastructure."],
        ["WHY A COORDINATION LAYER?", "Priority decisions need route and junction context rather than isolated signal control."],
        ["WHY A WEB DASHBOARD?", "Operators need visibility into vehicle movement, junction state and priority events."]
      ],
      contribution: [
        "Designed the system-level emergency priority concept.",
        "Explored ESP32-based junction control.",
        "Connected embedded control ideas with a monitoring interface.",
        "Developed the project as a smart-infrastructure prototype."
      ],
      limitations: [
        "The project is a prototype / concept and not a certified traffic-control system.",
        "Real deployment would require traffic authority integration, fail-safe design and field validation.",
        "Performance claims should be validated through measured deployment data."
      ],
      stack: ["ESP32", "IoT", "JavaScript", "Web Dashboard", "Real-Time Monitoring"],
      repo: "https://github.com/svasanth2508/secapms-project",
      live: "https://secapms-project.vercel.app"
    }
  };

  // =========================================================
  // REVEAL
  // =========================================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  // =========================================================
  // THEME
  // =========================================================

  const themeToggle = document.getElementById("themeToggle");

  function setTheme(theme) {
    body.classList.toggle("light", theme === "light");
    localStorage.setItem("portfolio-theme", theme);
  }

  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme) {
    setTheme(savedTheme);
  }

  themeToggle?.addEventListener("click", () => {
    setTheme(body.classList.contains("light") ? "dark" : "light");
  });

  // =========================================================
  // MOBILE NAV
  // =========================================================

  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileNav = document.getElementById("mobileNav");

  function closeMobileNav() {
    mobileNav?.classList.remove("open");
    body.classList.remove("mobile-open");
    mobileMenuButton?.setAttribute("aria-expanded", "false");
  }

  mobileMenuButton?.addEventListener("click", () => {
    const open = !mobileNav?.classList.contains("open");
    mobileNav?.classList.toggle("open", open);
    body.classList.toggle("mobile-open", open);
    mobileMenuButton.setAttribute("aria-expanded", String(open));
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  // =========================================================
  // PROJECT DRAWER
  // =========================================================

  const drawer = document.getElementById("projectDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const drawerClose = document.getElementById("drawerClose");

  const drawerCode = document.getElementById("drawerCode");
  const drawerDomain = document.getElementById("drawerDomain");
  const drawerTitle = document.getElementById("drawerTitle");
  const drawerLead = document.getElementById("drawerLead");
  const drawerProblem = document.getElementById("drawerProblem");
  const drawerArchitecture = document.getElementById("drawerArchitecture");
  const drawerDecisions = document.getElementById("drawerDecisions");
  const drawerContribution = document.getElementById("drawerContribution");
  const drawerLimitations = document.getElementById("drawerLimitations");
  const drawerStack = document.getElementById("drawerStack");
  const drawerActions = document.getElementById("drawerActions");

  function architectureHTML(items) {
    return items
      .map((item, index) => {
        const node = `<span class="arch-pill">${item}</span>`;
        const arrow = index < items.length - 1 ? `<span class="arch-arrow">→</span>` : "";
        return node + arrow;
      })
      .join("");
  }

  function listHTML(items) {
    return items.map((item) => `<li>${item}</li>`).join("");
  }

  function decisionsHTML(items) {
    return items
      .map(
        ([title, body]) => `
          <div class="decision">
            <strong>${title}</strong>
            <p>${body}</p>
          </div>
        `
      )
      .join("");
  }

  function openProject(projectKey) {
    const project = projects[projectKey];
    if (!project || !drawer) return;

    drawerCode.textContent = project.code;
    drawerDomain.textContent = project.domain;
    drawerTitle.textContent = project.title;
    drawerLead.textContent = project.lead;
    drawerProblem.textContent = project.problem;
    drawerArchitecture.innerHTML = architectureHTML(project.architecture);
    drawerDecisions.innerHTML = decisionsHTML(project.decisions);
    drawerContribution.innerHTML = listHTML(project.contribution);
    drawerLimitations.innerHTML = listHTML(project.limitations);
    drawerStack.innerHTML = project.stack.map((item) => `<span>${item}</span>`).join("");

    const actions = [
      `<a class="button primary" href="${project.repo}" target="_blank" rel="noopener noreferrer">Repository ↗</a>`
    ];

    if (project.live) {
      actions.push(
        `<a class="button secondary" href="${project.live}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>`
      );
    }

    drawerActions.innerHTML = actions.join("");

    drawer.classList.add("open");
    drawerBackdrop?.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    drawerBackdrop?.setAttribute("aria-hidden", "false");
    body.classList.add("drawer-open");

    requestAnimationFrame(() => drawerClose?.focus());
  }

  function closeProject() {
    drawer?.classList.remove("open");
    drawerBackdrop?.classList.remove("open");
    drawer?.setAttribute("aria-hidden", "true");
    drawerBackdrop?.setAttribute("aria-hidden", "true");
    body.classList.remove("drawer-open");
  }

  document.querySelectorAll("[data-project]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (element.tagName === "A") return;
      event.preventDefault();
      openProject(element.dataset.project);
    });
  });

  drawerClose?.addEventListener("click", closeProject);
  drawerBackdrop?.addEventListener("click", closeProject);

  // =========================================================
  // COMMAND PALETTE
  // =========================================================

  const commandOverlay = document.getElementById("commandOverlay");
  const commandInput = document.getElementById("commandInput");
  const commandButton = document.getElementById("commandButton");
  const hudCommand = document.getElementById("hudCommand");
  const commandList = document.getElementById("commandList");

  let commandSelection = 0;

  function visibleCommands() {
    return Array.from(
      commandList?.querySelectorAll("button:not([hidden]), a:not([hidden])") || []
    );
  }

  function refreshCommandSelection() {
    const items = visibleCommands();
    items.forEach((item, index) => {
      item.classList.toggle("selected", index === commandSelection);
    });
  }

  function filterCommands() {
    const query = (commandInput?.value || "").trim().toLowerCase();
    const items = Array.from(commandList?.querySelectorAll("button, a") || []);

    items.forEach((item) => {
      item.hidden = query && !item.textContent.toLowerCase().includes(query);
    });

    commandSelection = 0;
    refreshCommandSelection();
  }

  function openCommand() {
    closeMobileNav();
    commandOverlay?.classList.add("open");
    commandOverlay?.setAttribute("aria-hidden", "false");
    body.classList.add("command-open");
    commandSelection = 0;

    if (commandInput) {
      commandInput.value = "";
      filterCommands();
      requestAnimationFrame(() => commandInput.focus());
    }
  }

  function closeCommand() {
    commandOverlay?.classList.remove("open");
    commandOverlay?.setAttribute("aria-hidden", "true");
    body.classList.remove("command-open");
  }

  function runCommand(item) {
    if (!item) return;

    if (item.tagName === "A") {
      item.click();
      closeCommand();
      return;
    }

    const command = item.dataset.command;

    if (command === "goto") {
      document.querySelector(item.dataset.target)?.scrollIntoView({ behavior: "smooth" });
      closeCommand();
    }

    if (command === "project") {
      closeCommand();
      openProject(item.dataset.project);
    }
  }

  commandButton?.addEventListener("click", openCommand);
  hudCommand?.addEventListener("click", openCommand);
  commandInput?.addEventListener("input", filterCommands);

  commandList?.addEventListener("click", (event) => {
    const item = event.target.closest("button, a");
    if (item) runCommand(item);
  });

  commandOverlay?.addEventListener("click", (event) => {
    if (event.target === commandOverlay) closeCommand();
  });

  // =========================================================
  // KEYBOARD NAVIGATION
  // =========================================================

  document.addEventListener("keydown", (event) => {
    const metaK = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";

    if (metaK) {
      event.preventDefault();
      commandOverlay?.classList.contains("open") ? closeCommand() : openCommand();
      return;
    }

    if (event.key === "Escape") {
      closeCommand();
      closeProject();
      closeMobileNav();
      return;
    }

    if (commandOverlay?.classList.contains("open")) {
      const items = visibleCommands();

      if (event.key === "ArrowDown") {
        event.preventDefault();
        commandSelection = Math.min(commandSelection + 1, Math.max(0, items.length - 1));
        refreshCommandSelection();
        items[commandSelection]?.scrollIntoView({ block: "nearest" });
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        commandSelection = Math.max(commandSelection - 1, 0);
        refreshCommandSelection();
        items[commandSelection]?.scrollIntoView({ block: "nearest" });
      }

      if (event.key === "Enter") {
        event.preventDefault();
        runCommand(items[commandSelection]);
      }

      return;
    }

    const activeTag = document.activeElement?.tagName;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(activeTag)) return;

    const shortcut = event.key.toLowerCase();

    const shortcuts = {
      p: "#work",
      s: "#system-map",
      l: "#build-log",
      c: "#contact"
    };

    if (shortcuts[shortcut]) {
      document.querySelector(shortcuts[shortcut])?.scrollIntoView({ behavior: "smooth" });
    }
  });

  // =========================================================
  // SCROLL SPY + HUD
  // =========================================================

  const hudSection = document.getElementById("hudSection");
  const hudProject = document.getElementById("hudProject");
  const hudStack = document.getElementById("hudStack");
  const navLinks = document.querySelectorAll(".desktop-nav a");
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!active) return;

        const id = active.target.id;
        const label = active.target.dataset.sectionName || id.toUpperCase();

        if (hudSection) hudSection.textContent = label;

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.05, 0.15, 0.4]
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const projectContexts = document.querySelectorAll("[data-project-context]");

  const hudProjectData = {
    platescope: ["PLATESCOPE", "PYTHON / YOLO"],
    astraguard: ["ASTRAGUARD", "FASTAPI / ML"],
    resilient: ["RESILIENT_AI", "ESP32 / EDGE"],
    secapms: ["SECAPMS", "ESP32 / IoT"]
  };

  if ("IntersectionObserver" in window) {
    const projectObserver = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!active) return;

        const key = active.target.dataset.projectContext;
        const values = hudProjectData[key];

        if (values) {
          if (hudProject) hudProject.textContent = values[0];
          if (hudStack) hudStack.textContent = values[1];
        }
      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.05, 0.2, 0.45]
      }
    );

    projectContexts.forEach((card) => projectObserver.observe(card));
  }

  // =========================================================
  // MOUSE GLOW
  // =========================================================

  const mouseGlow = document.getElementById("mouseGlow");

  if (mouseGlow && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    window.addEventListener(
      "mousemove",
      (event) => {
        mouseGlow.style.left = `${event.clientX}px`;
        mouseGlow.style.top = `${event.clientY}px`;
        mouseGlow.style.opacity = "1";
      },
      { passive: true }
    );

    document.addEventListener("mouseleave", () => {
      mouseGlow.style.opacity = "0";
    });
  }

  // =========================================================
  // SUBTLE AMBIENT CANVAS
  // =========================================================

  const canvas = document.getElementById("ambientCanvas");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dots = [];

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 760 ? 16 : 30;

      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1 + 0.45
      }));
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      const light = body.classList.contains("light");
      ctx.fillStyle = light ? "rgba(0, 90, 125, .17)" : "rgba(92, 219, 255, .14)";
      ctx.strokeStyle = light ? "rgba(0, 90, 125, .05)" : "rgba(92, 219, 255, .045)";

      dots.forEach((dot, i) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < -10) dot.x = width + 10;
        if (dot.x > width + 10) dot.x = -10;
        if (dot.y < -10) dot.y = height + 10;
        if (dot.y > height + 10) dot.y = -10;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {
          const other = dots[j];
          const dx = dot.x - other.x;
          const dy = dot.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 125) {
            ctx.globalAlpha = 1 - distance / 125;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();
    animate();
  }
})();
