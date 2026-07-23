(function () {
  var KEY = "theme-preference";

  function current() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  function set(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem(KEY, t);
    updateIcon(t);
  }

  function updateIcon(t) {
    var icon = document.getElementById("theme-icon");
    if (icon) icon.textContent = t === "dark" ? "☀️" : "🌙";
  }

  window.toggleTheme = function () {
    set(current() === "dark" ? "light" : "dark");
  };
  window.updateThemeIcon = function () {
    updateIcon(current());
  };

  // Update icon once DOM is ready (header may load async)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      updateIcon(current());
    });
  } else {
    updateIcon(current());
  }
})();
