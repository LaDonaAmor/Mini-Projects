(function initConstructionOverlay() {
  const status = document.body.dataset.status;
  if (status !== "construction") return;

  const progress = Math.min(
    Math.max(parseInt(document.body.dataset.progress, 10) || 0, 0),
    100,
  );

  const cssHref = "/partials/construction.css";
  if (!document.querySelector(`link[href="${cssHref}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssHref;
    document.head.appendChild(link);
  }

  document.body.classList.add("construction-active");

  const overlay = document.createElement("div");
  overlay.className = "construction-overlay";
  overlay.innerHTML = `
    <div class="construction-icon-card">
      <div class="construction-icons">
      <!-- Gear Icon -->
      <svg class="icon-gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
      
      <!-- Wrench Icon -->
      <svg class="icon-wrench" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    </div>
      <div class="construction-badges">
        <span class="construction-badge construction-badge--dark">Under Dev</span>
        <span class="construction-badge construction-badge--light">v2.0 Prep</span>
      </div>
    </div>

    <h2 class="construction-heading type-headline-lg">
        This project is currently
    </h2>
    <span class="construction-highlight">Under Active Development</span>

    <p class="construction-desc type-body-md">
  I'm currently refining the underlying architecture and polishing
  the interface. New features are in progress, with a focus on
  performance and long-term stability. Thank you for your patience,
  check back soon for an improved experience.
    </p>

    <div class="construction-actions">
      <a href="/index.html" class="construction-btn construction-btn--primary">
        ← Back to Hub
      </a>
      <button type="button" id="construction-reload" class="construction-btn construction-btn--secondary">
        ⟳ Reload Status
      </button>
    </div>

    <div class="construction-progress">
      <div class="construction-progress-labels type-label-sm">
        <span>Refining Gears</span>
        <span>${progress}% Complete</span>
      </div>
      <div class="construction-progress-track">
        <div class="construction-progress-fill" style="width: ${progress}%"></div>
      </div>
    </div>
  `;

  const main =
    document.querySelector("main") ||
    document.querySelector(".container") ||
    document.querySelector(".clock-app");
  if (main) {
    main.replaceWith(overlay);
  } else {
    document.body.appendChild(overlay);
  }

  const reloadBtn = document.getElementById("construction-reload");
  if (reloadBtn) {
    reloadBtn.addEventListener("click", () => window.location.reload());
  }
})();
