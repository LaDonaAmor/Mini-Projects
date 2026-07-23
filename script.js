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
    desc: "Challenge the computer in a classic hand game of Rock, Paper, Scissors.",
    icon: "✊✋✌️",
    category: "games",
    url: "/rock-paper-scissors/index.html",
  },
];

const pageContent = {
  all: {
    heading: "A Fun Corner of the Web",
    desc: "Explore a growing collection of mini tools, games, and creative experiments I've built using just HTML, CSS, and JavaScript. Simple, fast, and interactive; just pick a project and start exploring.",
    requestHeading: "Suggest a Project",
    requestDesc:
      "Have an idea for a fun tool, game, or experiment? Send it my way. I’m always looking for new projects to build.",
  },

  utilities: {
    heading: "Utilities",
    desc: "Practical everyday helpers designed to save time and simplify routine tasks, from calculators and converters to clocks, timers, and more.",
    requestHeading: "Request a Utility",
    requestDesc:
      "Need an everyday helper? Tell me what utility you'd like me to build next.",
  },

  games: {
    heading: "Games",
    desc: "Lightweight browser games built for quick fun. Whether you're chasing a high score or solving a puzzle, there's always something to play.",
    requestHeading: "Request a Game",
    requestDesc:
      "Got a favorite classic or an original game idea? Share it with me, and it might become the next project in the collection.",
  },

  tools: {
    heading: "Tools",
    desc: "Focused productivity apps that help you stay organized, work smarter, and make everyday tasks a little more efficient.",
    requestHeading: "Request a Tool",
    requestDesc:
      "Looking for a tool to improve your workflow or solve a small problem? Let me know what you'd like to see built next.",
  },
};

// Helper to determine active filter directly from URL query
function getActiveFilter() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("filter") || "all";
}

// Dynamic rendering function with integrated live search filtering
function renderCards(searchQuery = "") {
  const headingEl = document.getElementById("page-heading");
  const descEl = document.getElementById("page-description");

  const requestHeadingEl = document.getElementById("request-heading");
  const requestDescEl = document.getElementById("request-description");

  const filterValue = getActiveFilter();

  const content = pageContent[filterValue] || pageContent.all;

  if (headingEl) headingEl.textContent = content.heading;
  if (descEl) descEl.textContent = content.desc;

  if (requestHeadingEl) requestHeadingEl.textContent = content.requestHeading;
  if (requestDescEl) requestDescEl.textContent = content.requestDesc;

  const gridContainer = document.getElementById("project-grid-container");
  if (!gridContainer) return;

  gridContainer.innerHTML = "";

  // Filter projects by both nav category AND live search input
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      filterValue === "all" || project.category === filterValue;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  updateProgress(filterValue);

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

  // Request form handling
  const form = document.getElementById("request-form");
  if (!form) return;

  const input = form.querySelector(".request-input");
  const submitBtn = form.querySelector('[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!input.value.trim()) {
      showToast("Please enter a request first.", "error");
      return;
    }

    const formData = new FormData(form);
    formData.append("_replyto", "your-email@example.com");
    formData.append("_subject", "New Mini Tool Request");

    submitBtn.disabled = true;

    try {
      const res = await fetch("https://formspree.io/f/xrenkjbz", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        showToast("Message sent! Thanks for the idea.");
        form.reset();
      } else {
        showToast("Something went wrong. Try again.", "error");
      }
    } catch {
      showToast("Something went wrong. Try again.", "error");
    } finally {
      submitBtn.disabled = false;
    }
  });
});

function showToast(message, type = "success") {
  // Remove existing toast if any
  const old = document.querySelector(".toast");
  if (old) old.remove();

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.innerHTML = `
    <span class="toast__icon">${type === "success" ? "✓" : "✗"}</span>
    ${message}
  `;
  document.body.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => toast.classList.add("visible"));

  // Auto-dismiss after 3s
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function updateProgress(filterValue) {
  const PROJECTS_GOAL = 50;

  const categoryProjects = projects.filter(
    (p) => filterValue === "all" || p.category === filterValue,
  );
  const progressCount = categoryProjects.length;
  const progressPct = Math.min((progressCount / PROJECTS_GOAL) * 100, 100);

  const counterEl = document.querySelector(".progress-counter");
  const fillEl = document.querySelector(".progress-bar-fill");
  const labelEl = document.querySelector(".progress-label");

  if (counterEl) counterEl.textContent = `${progressCount}/${PROJECTS_GOAL}`;
  if (fillEl) fillEl.style.width = `${progressPct}%`;
  if (labelEl) {
    const categoryLabel =
      filterValue === "all"
        ? "Projects"
        : filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
    labelEl.textContent = `${categoryLabel} Built So Far`;
  }
}
