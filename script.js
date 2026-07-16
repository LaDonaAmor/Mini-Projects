const projects = [
  {
    title: "Calculator",
    desc: "Crunch numbers with ease!",
    icon: "🧮",
    category: "utilities",
    url: "/calculator/index.html",
  },
  {
    title: "Clock",
    desc: "Real-time hours, minutes, and seconds.",
    icon: "🕛",
    category: "utilities",
    url: "/clock/index.html",
  },
  {
    title: "Timer",
    desc: "Set countdowns for anything!",
    icon: "⏱️",
    category: "utilities",
    url: "/timer/index.html",
  },
  {
    title: "To-Do List",
    desc: "Organize your tasks playfully.",
    icon: "📝",
    category: "tools",
    url: "/todo-list/index.html",
  },
  {
    title: "Quote Gen",
    desc: "Get inspired with random quotes.",
    icon: "💭",
    category: "utilities",
    url: "/quote/index.html",
  },
  {
    title: "Weather App",
    desc: "Check the forecast in style.",
    icon: "🌤️",
    category: "utilities",
    url: "/weather/index.html",
  },
  {
    title: "Guess It",
    desc: "Think of a number between 1 and 100. Let's play.",
    icon: "❓",
    category: "games",
    url: "/guess-the-number/index.html",
  },
  {
    title: "R-P-S",
    desc: "Challenge the computer in a classic hand game.",
    icon: "✊✋✌️",
    category: "games",
    url: "/rock-paper-scissors/index.html",
  },
];

// Helper to determine active filter directly from URL query
function getActiveFilter() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("filter") || "all";
}

// Dynamic rendering function with integrated live search filtering
function renderCards(searchQuery = "") {
  const gridContainer = document.getElementById("project-grid-container");
  if (!gridContainer) return;

  gridContainer.innerHTML = "";
  const filterValue = getActiveFilter();

  // Filter projects by both nav category AND live search input
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      filterValue === "all" || project.category === filterValue;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredProjects.length === 0) {
    gridContainer.innerHTML = `<p class="no-results type-body-md">No matching tools found.</p>`;
    return;
  }

  filteredProjects.forEach((project) => {
    // Normalize category string for chip classes
    const categoryLabels = {
      utilities: "utility",
      tools: "tool",
      games: "game",
    };
    const displayCategory =
      categoryLabels[project.category] || project.category;

    const cardHTML = `
      <article class="project-card">
        <div class="project-icon-wrapper">
          <div class="project-icon">${project.icon}</div>
        </div>
        <span class="category-chip category-${displayCategory}">${displayCategory.toUpperCase()}</span>
        <h3 class="card-title">${project.title}</h3> <!-- Fixed class collision bug -->
        <p class="project-desc">${project.desc}</p>
        <a href="${project.url}" class="btn btn-launch btn-launch-${displayCategory}">
          LAUNCH <span class="btn-emoji">🚀</span>
        </a>
      </article>
    `;
    gridContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}

// Initialize the page listeners
document.addEventListener("DOMContentLoaded", () => {
  renderCards();

  // Set up live search input listening
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderCards(e.target.value);
    });
  }
});
