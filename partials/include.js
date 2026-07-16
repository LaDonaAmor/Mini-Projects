document.addEventListener("DOMContentLoaded", () => {
  // Fetch and inject the header
  fetch("/partials/header.html")
    .then((res) => res.text())
    .then((headerHtml) => {
      const headerContainer = document.getElementById("site-header");
      if (headerContainer) {
        headerContainer.innerHTML = headerHtml;
        setupHeaderLayout();
      }
    })
    .catch((err) => console.error("Error loading header:", err));

  // Fetch and inject the footer
  fetch("/partials/footer.html")
    .then((res) => res.text())
    .then((footerHtml) => {
      const footerContainer = document.getElementById("footer-container");
      if (footerContainer) {
        footerContainer.innerHTML = footerHtml;
      }
    })
    .catch((err) => console.error("Error loading footer:", err));
});

function setupHeaderLayout() {
  const nav = document.body.dataset.nav;
  const projectName = document.body.dataset.projectName;
  const projectIcon = document.body.dataset.projectIcon;

  // Get elements from injected header HTML
  const hubTitle = document.getElementById("hub-title");
  const projectTitle = document.getElementById("project-title");
  const projectIconTarget = document.getElementById("project-icon-target");
  const projectNameTarget = document.getElementById("project-name-target");

  const hubNav = document.getElementById("hub-nav");
  const backButton = document.getElementById("back-button");

  if (projectName) {
    // --- PROJECT PAGE ---

    // Hide Hub Header Elements
    if (hubTitle) hubTitle.classList.add("hidden");
    if (hubNav) hubNav.classList.add("hidden");

    // Show and Populate Project Header Elements
    if (projectTitle) {
      projectTitle.classList.remove("hidden");
      if (projectIconTarget) projectIconTarget.textContent = projectIcon || "";
      if (projectNameTarget) projectNameTarget.textContent = projectName;
    }
    if (backButton) {
      backButton.classList.remove("hidden");
    }
  } else {
    // --- MAIN HUB ---

    // Show Hub Header Elements
    if (hubTitle) hubTitle.classList.remove("hidden");
    if (hubNav) hubNav.classList.remove("hidden");

    // Hide Project Header Elements
    if (projectTitle) projectTitle.classList.add("hidden");
    if (backButton) {
      backButton.classList.add("hidden");
    }

    // Highlight the active navigation link
    if (nav) {
      const activeLink = document.querySelector(`#hub-nav [data-nav="${nav}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  }
}
