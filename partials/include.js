// partials/include.js

document.addEventListener("DOMContentLoaded", () => {
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

  fetch("/partials/footer.html")
    .then((res) => res.text())
    .then((footerHtml) => {
      const footerContainer = document.getElementById("footer-container"); // Fixed duplicate target ID
      if (footerContainer) {
        footerContainer.innerHTML = footerHtml;
      }
    })
    .catch((err) => console.error("Error loading footer:", err));
});

function setupHeaderLayout() {
  const projectName = document.body.dataset.projectName;
  const projectIcon = document.body.dataset.projectIcon;

  const hubTitle = document.getElementById("hub-title");
  const projectTitle = document.getElementById("project-title");
  const projectIconTarget = document.getElementById("project-icon-target");
  const projectNameTarget = document.getElementById("project-name-target");

  const hubNav = document.getElementById("hub-nav");
  const backButton = document.getElementById("back-button");

  if (projectName) {
    // We are inside a project page
    if (hubTitle) hubTitle.classList.add("hidden");
    if (hubNav) hubNav.classList.add("hidden");

    if (projectTitle) {
      projectTitle.classList.remove("hidden");
      if (projectIconTarget) projectIconTarget.textContent = projectIcon || "";
      if (projectNameTarget) projectNameTarget.textContent = projectName;
    }
    if (backButton) backButton.classList.remove("hidden");
  } else {
    // We are on the hub page
    if (hubTitle) hubTitle.classList.remove("hidden");
    if (hubNav) hubNav.classList.remove("hidden");
    if (projectTitle) projectTitle.classList.add("hidden");
    if (backButton) backButton.classList.add("hidden");

    // Read URL parameters to highlight the current active navigation item
    const urlParams = new URLSearchParams(window.location.search);
    const activeFilter = urlParams.get("filter") || "hub"; // Defaults to 'hub' (all)

    const activeLink = document.querySelector(
      `#hub-nav [data-nav="${activeFilter}"]`,
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }
}
